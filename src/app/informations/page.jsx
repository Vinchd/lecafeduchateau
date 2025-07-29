import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function page() {
	return (
		<main className="flex max-lg:flex-col w-full h-[100dvh] min-h-screen">
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
			<section className="relative flex flex-col items-center bg-primary w-1/2 max-lg:w-full h-full overflow-scroll text-secondary">
				<div className="my-auto py-4">
					<h2 className="mb-10 max-lg:mb-5 w-full font-black max-lg:text-2xl text-4xl">
						INFORMATIONS
					</h2>
					<div className="mb-8 max-lg:mb-4 w-full max-lg:text-xs">
						Pour les demandes de groupes, séminaire <br className="lg:hidden" />
						et privatisation <br className="max-lg:hidden" />
						merci de nous contacter <br className="lg:hidden" />
						par mail.
					</div>
					<div className="mb-8 max-lg:mb-4 w-full max-lg:text-xs">
						<h3 className="font-bold max-lg:text-sm text-lg">
							HORAIRES D'OUVERTURES
						</h3>
						<div>Mardi au Samedi 9h00-00h00</div>
						<div>Dimanche 9h00-19h00</div>
					</div>
					<div className="mb-8 max-lg:mb-4 w-full max-lg:text-xs">
						<h3 className="font-bold max-lg:text-sm text-lg">TÉLÉPHONE</h3>
						<div>01 23 45 67 89</div>
					</div>
					<div className="w-full max-lg:text-xs">
						<h3 className="font-bold max-lg:text-sm text-lg">ADRESSE E-MAIL</h3>
						<div>lecafeduchateau44@gmail.com</div>
					</div>
				</div>
				<div className="right-15 max-lg:right-5 bottom-15 max-lg:bottom-5 fixed flex gap-1">
					<a
						href="https://www.facebook.com/profile.php?id=61578382830492"
						target="_blank"
						rel="noopener noreferrer"
						className="flex justify-center items-center hover:scale-110 transition duration-300"
					>
						<FaFacebookF className="w-9 h-9" />
					</a>
					<a
						href="https://www.instagram.com/cafeduchateaupnc"
						target="_blank"
						rel="noopener noreferrer"
						className="flex justify-center items-center hover:scale-110 transition duration-300"
					>
						<FaInstagram className="w-10 h-10" />
					</a>
				</div>
			</section>
		</main>
	);
}
