import Image from "next/image";
import Link from "next/link";
import Papa from "papaparse";
import { config } from "@/lib/config";

export const metadata = {
	title: "Menu - Le Café du Château",
	description:
		"Découvrez le menu du Café du Château : Cuisine locale, 100% maison.",
	openGraph: {
		title: "Menu - Le Café du Château",
		description:
			"Parcourez le menu du Café du Château : Cuisine locale, 100% maison.",
		url: "https://www.lecafeduchateau.fr/menu",
		siteName: "Le Café du Château",
		images: [
			{
				url: "/logo-opengraph.png",
				width: 1242,
				height: 1755,
				alt: "Logo Le Café du Château",
			},
		],
		locale: "fr_FR",
		type: "website",
	},
};

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

	const jsonLD = {
		"@context": "https://schema.org",
		"@type": "Restaurant",
		name: "Le Café du Château",
		url: "https://www.lecafeduchateau.fr/menu",
		hasMenu: {
			"@type": "Menu",
			name: "Menu principal",
			hasMenuSection: [
				...Object.entries(menuPrincipal).map(([category, items]) => ({
					"@type": "MenuSection",
					name: category,
					hasMenuItem: items.map((item) => ({
						"@type": "MenuItem",
						name: item.nom,
						description: item.description || undefined,
						offers: {
							"@type": "Offer",
							price: item.prix,
							priceCurrency: "EUR",
						},
					})),
				})),
				...(config.showDimancheMenu
					? Object.entries(menuDimanche).map(([category, items]) => ({
							"@type": "MenuSection",
							name: category,
							hasMenuItem: items.map((item) => ({
								"@type": "MenuItem",
								name: item.nom,
								description: item.description || undefined,
								offers: {
									"@type": "Offer",
									price: item.prix,
									priceCurrency: "EUR",
								},
							})),
						}))
					: []),
			],
		},
	};

	return (
		<main className="relative flex flex-col bg-primary pt-20 max-sm:pt-18 pb-12 h-full text-secondary">
			<section className="overflow-y-auto cursor-default scrollbar-hide">
				<div className="flex flex-col items-center mx-auto max-w-3xl">
					<div className="mb-24">
						<h1 className="mb-10 px-14 font-sharpie max-sm:text-[clamp(32px,6vw,38px)] text-5xl text-center">
							Menu
						</h1>
						{Object.entries(menuPrincipal).map(
							([category, items], idx, arr) => (
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
							),
						)}
					</div>
					{config.showDimancheMenu && (
						<div id="menu-du-dimanche" className="mb-12">
							<h2 className="mb-10 px-14 font-sharpie max-sm:text-[clamp(32px,6vw,38px)] text-5xl text-center">
								Les dimanches du Château
							</h2>
							{Object.entries(menuDimanche).map(
								([category, items], idx, arr) => (
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
								),
							)}
						</div>
					)}

					<Link href="/">
						<Image
							src="/logo-sirene.svg"
							alt="Logo le Café du Château"
							width={200}
							height={300}
						/>
					</Link>
				</div>
			</section>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
			/>
		</main>
	);
}
