import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

async function fetchHoraires() {
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

function grouperHoraires(horaires) {
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

export default async function page() {
	const horaires = await fetchHoraires();
	const groupes = grouperHoraires(horaires);

	return (
		<main className="flex max-lg:flex-col w-full h-full">
			<section className="relative w-1/2 max-lg:w-full h-full section-box-shadowr">
				<Image
					src="/plat-ceviche-thon.jpg"
					alt="Plat Ceviche Thon"
					sizes="(max-width: 500px) 100vw, (max-width: 800px) 100vw, (max-width: 1080px) 100vw, 100vw"
					fill={true}
					priority={true}
					className="object-cover"
				/>
			</section>
			<section className="relative flex flex-col items-center bg-primary w-1/2 max-lg:w-full h-full overflow-scroll text-secondary cursor-default scrollbar-hide">
				<div className="my-auto py-4 animate-fade-in-left">
					<h2 className="mb-10 max-lg:mb-4 w-full font-black max-lg:text-2xl text-4xl tracking-wide">
						INFORMATIONS
					</h2>
					<div className="mb-8 max-lg:mb-4 w-full text-[clamp(14px,1.4vw,16px)] max-lg:text-xs">
						Vous pouvez réserver en ligne{" "}
						<Link
							href="/reservation"
							className="hover:text-secondary/80 underline"
						>
							ici
						</Link>
						.<br />
						Pour les demandes de groupes, séminaire <br className="lg:hidden" />
						et privatisation <br className="max-lg:hidden" />
						merci de nous contacter <br className="lg:hidden" />
						par mail.
					</div>
					<div className="mb-8 max-lg:mb-4 w-full text-[clamp(14px,1.4vw,16px)] max-lg:text-xs">
						<h3 className="mb-1 font-bold max-lg:text-sm text-lg">
							HORAIRES D&apos;OUVERTURES
						</h3>
						{groupes.length > 0 ? (
							groupes.map((groupe) => (
								<div key={groupe.jours.join(",")}>
									<span>{groupe.jours.join(", ")}</span>
									{groupe.plage === "Fermé" ? (
										<span> – Fermé</span>
									) : (
										<span> {groupe.plage}</span>
									)}
								</div>
							))
						) : (
							<>
								<div>Dimanche, Lundi, Mardi 09h00 - 00h00</div>
								<div>Mercredi, Jeudi, Vendredi, Samedi 09h00 - 02h00</div>
							</>
						)}
					</div>
					<div className="group mb-8 max-lg:mb-4 w-full text-[clamp(14px,1.4vw,16px)] max-lg:text-xs">
						<h3 className="font-bold max-lg:text-sm text-lg">TÉLÉPHONE</h3>
						<a href="tel:+33240829171" className="group-hover:underline">
							02 40 82 91 71
						</a>
					</div>
					<div className="group w-full text-[clamp(14px,1.4vw,16px)] max-lg:text-xs">
						<h3 className="font-bold max-lg:text-sm text-lg">ADRESSE E-MAIL</h3>
						<a
							href="mailto:lecafeduchateau44@gmail.com"
							className="group-hover:underline"
						>
							lecafeduchateau44@gmail.com
						</a>
					</div>
				</div>
				<div className="right-15 max-lg:right-5 bottom-15 max-lg:bottom-5 fixed flex gap-1">
					<a
						href="https://www.facebook.com/profile.php?id=61578382830492"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Facebook"
						className="flex justify-center items-center hover:scale-110 transition duration-300"
					>
						<FaFacebookF className="w-9 h-9" />
					</a>
					<a
						href="https://www.instagram.com/cafeduchateaupnc"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						className="flex justify-center items-center hover:scale-110 transition duration-300"
					>
						<FaInstagram className="w-10 h-10" />
					</a>
				</div>
			</section>
		</main>
	);
}
