"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const images = [
	"/plat-terrine.jpg",
	"/plat-straciatella.jpg",
	"/plat-ceviche-thon.jpg",
	"/plat-poisson.jpg",
	"/plat-onglet-boeuf.jpg",
];

export default function Home() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, 6000);
		return () => clearInterval(interval);
	}, []);

	return (
		<main className="relative h-[100dvh] min-h-screen">
			{images.map((src, index) => (
				<Image
					key={src}
					src={src}
					alt={`Background ${index}`}
					sizes="(max-width: 500px) 100vw, (max-width: 800px) 100vw, (max-width: 1080px) 100vw, 100vw"
					fill={true}
					priority={index === 0}
					className={`absolute object-cover top-0 left-0 w-full h-full transition-opacity duration-3000 ease-in ${
						index === current ? "opacity-100 z-10" : "opacity-0 z-0"
					}`}
				/>
			))}
			<div className="z-20 absolute inset-0 bg-black/30 pointer-events-none" />
			<div className="z-30 absolute inset-0 flex flex-col justify-center items-center text-primary text-center">
				<h1 className="font-bold text-[clamp(2rem,5vw,3rem)] uppercase leading-snug tracking-wider cursor-default">
					Le Café du
					<br />
					Chateau
				</h1>
			</div>
			<div className="bottom-0 z-30 absolute flex flex-col items-center gap-6 mb-8 w-full text-primary text-center">
				<a
					href="https://maps.app.goo.gl/9B39j1e3WBVcqeet5"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[clamp(1rem,5vw,1.3rem)] hover:text-secondary leading-7 hover:scale-104 transition duration-300"
				>
					Plage du Château
					<br />
					44210 Pornic
				</a>
				<div className="flex gap-1">
					<a
						href="https://www.facebook.com/profile.php?id=61578382830492"
						target="_blank"
						rel="noopener noreferrer"
						className="flex justify-center items-center hover:text-secondary hover:scale-110 transition duration-300"
					>
						<FaFacebookF className="w-9 h-9" />
					</a>
					<a
						href="https://www.instagram.com/cafeduchateaupnc"
						target="_blank"
						rel="noopener noreferrer"
						className="flex justify-center items-center hover:text-secondary hover:scale-110 transition duration-300"
					>
						<FaInstagram className="w-10 h-10" />
					</a>
				</div>
			</div>
		</main>
	);
}
