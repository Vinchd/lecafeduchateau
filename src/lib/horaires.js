export async function fetchHoraires() {
	try {
		const res = await fetch(process.env.GOOGLE_SHEET_SCHEDULES_URL, {
			next: { revalidate: 600 },
		});
		const text = await res.text();
		const lines = text.trim().split("\n").slice(1);

		return lines.map((line) => {
			const [jour, ouvMidi, fermMidi, ouvSoir, fermSoir, ferme] = line
				.split(",")
				.map((cell) => cell.trim().replace(/^"|"$/g, ""));

			return {
				jour: jour ?? "",
				ouvMidi: ouvMidi ?? "",
				fermMidi: fermMidi ?? "",
				ouvSoir: ouvSoir ?? "",
				fermSoir: fermSoir ?? "",
				ferme: ferme ?? "",
			};
		});
	} catch {
		return [];
	}
}

function formatHeure(valeur, zeroValide = false) {
	const [h, m = "00"] = (valeur ?? "").trim().split(":");
	if (!h) return "";
	if (!zeroValide && Number(h) === 0 && Number(m) === 0) return "";
	return `${h}h${m.padStart(2, "0")}`;
}

function formatPlage({ ouvMidi, fermMidi, ouvSoir, fermSoir }) {
	const a = formatHeure(ouvMidi);
	const b = formatHeure(fermMidi);
	const c = formatHeure(ouvSoir);
	const d = formatHeure(fermSoir, true);

	// Midi et soir séparés : "09h00 – 14h00 / 19h00 – 23h00"
	if (a && b && c && d) return `${a} – ${b} / ${c} – ${d}`;
	// Service continu : "09h00 – 23h00"
	if (a && !b && d) return `${a} – ${d}`;
	// Midi uniquement : "09h00 – 14h00"
	if (a && b && !c) return `${a} – ${b}`;
	// Soir uniquement : "19h00 – 23h00"
	if (!a && !b && c && d) return `${c} – ${d}`;

	return null;
}

export function grouperHoraires(horaires) {
	const map = new Map();

	for (const h of horaires) {
		const ferme = ["TRUE", "VRAI"].includes(h.ferme?.toUpperCase());
		const plage = ferme ? "Fermé" : (formatPlage(h) ?? "Fermé");

		if (!map.has(plage)) {
			map.set(plage, []);
		}
		map.get(plage).push(h.jour);
	}

	return Array.from(map.entries()).map(([plage, jours]) => ({ plage, jours }));
}
