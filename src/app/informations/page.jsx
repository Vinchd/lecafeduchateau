import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function page() {
	return (
		<main className="flex max-lg:flex-col w-full h-full">
			<section className="relative section-box-shadowr w-1/2 max-lg:w-full h-full">
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
						Pour les demandes de groupes, séminaire <br className="lg:hidden" />
						et privatisation <br className="max-lg:hidden" />
						merci de nous contacter <br className="lg:hidden" />
						par mail.
					</div>
					<div className="mb-8 max-lg:mb-4 w-full text-[clamp(14px,1.4vw,16px)] max-lg:text-xs">
						<h3 className="font-bold max-lg:text-sm text-lg">
							HORAIRES D'OUVERTURES
						</h3>
						<div>Mercredi au Dimanche 9h00-00h00</div>
						<div>Lundi Mardi fermé</div>
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
