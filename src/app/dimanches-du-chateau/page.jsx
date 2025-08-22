import Image from "next/image";
import Link from "next/link";
export default function page() {
	return (
		<main className="flex max-lg:flex-col w-full h-full">
			<section className="relative flex flex-col items-center bg-primary w-1/2 max-lg:w-full h-full overflow-scroll text-secondary cursor-default scrollbar-hide">
				<div className="my-auto py-4 w-[51%] max-sm:w-[60%] text-[clamp(14px,1.4vw,16px)] animate-fade-in-right">
					<h2 className="mb-10 max-lg:mb-4 w-full font-black max-lg:text-2xl text-4xl tracking-wide">
						LES DIMANCHES DU CHÂTEAU
					</h2>
					<div className="mb-8 max-lg:mb-4 max-lg:text-xs text-justify tracking-wider">
						Chaque dimanche, le Café du Château vous accueille autour d’un menu
						unique convivial et gourmand pour savourer la fin de semaine en
						toute simplicité. Une carte courte et généreuse où se rencontrent
						classiques, produits frais et plaisirs sucrés.
					</div>
					<div className="w-full max-lg:text-xs">
						Menu dimanche{" "}
						<Link
							href="/menu#menu-du-dimanche"
							className="inline-block font-semibold underline underline-offset-1 hover:underline-offset-2 hover:scale-104 transition duration-300"
						>
							ici
						</Link>
					</div>
				</div>
			</section>
			<section className="relative section-box-shadowl w-1/2 max-lg:w-full h-full">
				<Image
					src="/plat-terrine.jpg"
					alt="Plat Ceviche Thon"
					sizes="(max-width: 500px) 100vw, (max-width: 800px) 100vw, (max-width: 1080px) 100vw, 100vw"
					fill={true}
					priority={true}
					className="object-cover"
				/>
			</section>
		</main>
	);
}
