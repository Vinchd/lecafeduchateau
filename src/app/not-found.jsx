"use client";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="relative flex flex-col justify-center items-center gap-10 h-[100dvh] min-h-screen text-2xl">
			<Image
				src="/logo-sirene.svg"
				alt="Logo le Café du Château"
				sizes="(max-width: 500px) 100vw, (max-width: 800px) 100vw, (max-width: 1080px) 100vw, 100vw"
				width={300}
				height={424}
			/>
			<div>Page non trouvée</div>
			<Link
				href="/"
				className="hover:bg-secondary px-12 py-4 border-3 rounded-3xl w-fit font-semibold text-secondary hover:text-primary tracking-wider"
			>
				Retour à l'accueil
			</Link>
		</div>
	);
}
