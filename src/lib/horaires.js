export async function fetchHoraires() {
	try {
		const res = await fetch(process.env.GOOGLE_SHEET_SCHEDULES_URL, {
			next: { revalidate: 600 },
		});
		const text = await res.text();
		const lines = text.trim().split("\n").slice(1);

		return lines.map((line) => {
			const [jour, ouverture, fermeture, ferme] = line.split(",");
			return {
				jour: jour?.trim() ?? "",
				ouverture: ouverture?.trim() ?? "",
				fermeture: fermeture?.trim() ?? "",
				ferme: ferme?.trim() ?? "",
			};
		});
	} catch {
		return [];
	}
}

function formatPlage(ouverture, fermeture) {
	if (!ouverture || !fermeture) return null;
	const fmt = (h) => h.split(":").slice(0, 2).join("h");
	return `${fmt(ouverture)} – ${fmt(fermeture)}`;
}

export function grouperHoraires(horaires) {
	const map = new Map();

	for (const h of horaires) {
		const ferme = h.ferme?.toUpperCase() === "TRUE";
		const plage = ferme
			? "Fermé"
			: (formatPlage(h.ouverture, h.fermeture) ?? "Fermé");

		if (!map.has(plage)) {
			map.set(plage, []);
		}
		map.get(plage).push(h.jour);
	}

	return Array.from(map.entries()).map(([plage, jours]) => ({ plage, jours }));
}
