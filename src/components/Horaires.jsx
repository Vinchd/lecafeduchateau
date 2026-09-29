import { fetchHoraires, grouperHoraires } from "@/lib/horaires";

export default async function Horaires() {
	const horaires = await fetchHoraires();
	const groupes = grouperHoraires(horaires);

	return (
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
	);
}
