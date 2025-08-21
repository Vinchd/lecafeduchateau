import Image from "next/image";
import Papa from "papaparse";

async function getMenu() {
	const res = await fetch(process.env.GOOGLE_SHEET_URL, {
		next: { revalidate: 10 },
	});
	const csv = await res.text();
	const parsed = Papa.parse(csv, { header: true }).data;

	const { menuPrincipal, menuDimanche } = parsed.reduce(
		(acc, { Id, Catégorie, Nom, Description, Prix }) => {
			if (!Catégorie || !Nom) return acc;

			// Préparer l'objet de base
			const item = {
				id: Id,
				nom: Nom,
				description: Description,
				prix: Prix?.replace(/,00$/, ""),
			};

			// Menu classique
			if (Catégorie === "Food" || Catégorie === "Dessert") {
				if (!acc.menuPrincipal[Catégorie]) acc.menuPrincipal[Catégorie] = [];
				acc.menuPrincipal[Catégorie].push(item);
			}

			// Menu du dimanche
			if (
				Catégorie === "Dimanche - Food" ||
				Catégorie === "Dimanche - Dessert"
			) {
				if (!acc.menuDimanche[Catégorie]) acc.menuDimanche[Catégorie] = [];
				acc.menuDimanche[Catégorie].push(item);
			}

			return acc;
		},
		{ menuPrincipal: {}, menuDimanche: {} },
	);

	return { menuPrincipal, menuDimanche };
}

export default async function page() {
	const { menuPrincipal, menuDimanche } = await getMenu();

	return (
		<main className="relative flex flex-col bg-primary pt-12 pb-12 h-full text-secondary">
			<section className="flex flex-col flex-grow items-center mx-auto max-w-3xl overflow-y-auto scrollbar-hide">
				<div className="mb-24">
					<h1 className="mb-10 font-sharpie text-5xl text-center">Menu</h1>
					{Object.entries(menuPrincipal).map(([category, items], idx, arr) => (
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
				</div>
				<div id="menu-du-dimanche" className="mb-12">
					<h2 className="mb-10 px-6 font-sharpie text-5xl text-center">
						Les dimanches du Château
					</h2>
					{Object.entries(menuDimanche).map(([category, items], idx, arr) => (
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
				</div>
				<Image
					src="/logo-sirene.svg"
					alt="Logo le Café du Château"
					width={200}
					height={300}
					className="object-contain"
				/>
			</section>
		</main>
	);
}
