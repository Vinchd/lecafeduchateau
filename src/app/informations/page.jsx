import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function page() {
	return (
		<main className="flex w-full h-[100dvh] min-h-screen">
			<section className="relative w-1/2">
				<Image
					src="/plat-ceviche-thon.jpg"
					alt="Plat Ceviche Thon"
					sizes="(max-width: 500px) 100vw, (max-width: 800px) 100vw, (max-width: 1080px) 100vw, 100vw"
					fill={true}
					className="object-cover"
				/>
			</section>
			<section className="relative flex flex-col justify-center items-center bg-primary w-1/2 text-secondary">
				<div>
					<h2 className="mb-8 w-full font-black text-4xl">INFORMATIONS</h2>
					<div className="mb-10 w-full">
						Pour les demandes de groupes, séminaire et privatisation
						<br />
						merci de nous contacter par mail.
					</div>
					<div className="mb-10 w-full">
						<h3 className="font-bold text-lg">HORAIRES D'OUVERTURES</h3>
						<div>Mardi au Samedi 9h00-00h00</div>
						<div>Dimanche 9h00-19h00</div>
					</div>
					<div className="mb-10 w-full">
						<h3 className="font-bold text-lg">TÉLÉPHONE</h3>
						<div>01 23 45 67 89</div>
					</div>
					<div className="w-full">
						<h3 className="font-bold text-lg">ADRESSE E-MAIL</h3>
						<div>lecafeduchateau44@gmail.com</div>
					</div>
				</div>
				<div className="right-15 bottom-15 absolute flex gap-1">
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
