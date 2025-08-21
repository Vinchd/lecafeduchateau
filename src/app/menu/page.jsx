import Papa from "papaparse";

async function getMenu() {
	const res = await fetch(
		process.env.GOOGLE_SHEET_URL,
		// { next: { revalidate: 10 } }, // ⏱️ revalidation toutes les heures
		{ cache: "no-store" },
	);
	const csv = await res.text();
	const parsed = Papa.parse(csv, { header: true }).data;

	const menu = parsed.reduce(
		(acc, { Id, Catégorie, Nom, Description, Prix }) => {
			if (!Catégorie || !Nom) return acc;
			if (!acc[Catégorie]) acc[Catégorie] = [];
			acc[Catégorie].push({
				id: Id,
				nom: Nom,
				description: Description,
				prix: Prix?.replace(/,00$/, ""),
			});
			return acc;
		},
		{},
	);

	return menu;
}

export default async function page() {
	const menu = await getMenu();

	return (
		<main className="relative flex flex-col bg-primary pt-12 pb-12 h-full text-secondary">
			<section className="flex-grow mx-auto max-w-3xl overflow-y-auto scrollbar-hide">
				<h1 className="mb-10 font-sharpie text-5xl text-center">Menu</h1>
				{Object.entries(menu).map(([category, items], idx, arr) => (
					<div key={category} className="mb-6 font-gambetta uppercase">
						<ul className="flex flex-col items-center gap-6">
							{items.map((item) => (
								<li
									key={item.id}
									className="flex flex-col items-center w-full leading-[1.15]"
								>
									<p className="font-semibold text-[17px] max-sm:text-[clamp(12px,3vw,16px)] text-center">
										{item.nom} – {item.prix} €
									</p>
									{item.description && (
										<p className="w-1/2 max-sm:text-[clamp(11px,3vw,15px)] text-center">
											{item.description}
										</p>
									)}
								</li>
							))}

							{idx < arr.length - 1 && (
								<hr className="my-8 border-secondary border-t w-30" />
							)}
						</ul>
					</div>
				))}
			</section>
		</main>
	);
}
