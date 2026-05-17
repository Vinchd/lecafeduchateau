"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function ReservationPage() {
	useEffect(() => {
		const script = document.createElement("script");

		script.src = "https://widget.letsumai.com/dist/embed.min.js";
		script.async = true;

		document.body.appendChild(script);
	}, []);

	const openReservationWidget = () => {
		if (window.umaiWidget) {
			window.umaiWidget.config({
				apiKey: process.env.NEXT_PUBLIC_UMAI_API_KEY,
				widgetType: "reservation",
			});

			window.umaiWidget.openWidget();
		}
	};

	return (
		<main className="flex max-lg:flex-col w-full h-full">
			<section className="relative w-1/2 max-lg:w-full h-full section-box-shadowr">
				<Image
					src="/plat-plateau-de-fruitsmer.jpeg"
					alt="Réservation au Café du Château"
					sizes="(max-width: 1024px) 100vw, 50vw"
					fill={true}
					priority={true}
					className="object-cover"
				/>
			</section>

			<section className="relative flex flex-col items-center bg-primary w-1/2 max-lg:w-full h-full overflow-scroll text-secondary cursor-default scrollbar-hide">
				<div className="flex flex-col items-start my-auto px-8 py-8 animate-fade-in-left">
					<h2 className="mb-10 max-lg:mb-4 font-black max-lg:text-2xl text-4xl tracking-wide">
						RÉSERVATION
					</h2>

					<p className="mb-8 max-lg:mb-4 w-full text-[clamp(14px,1.4vw,16px)] max-lg:text-xs">
						Réservez votre table directement en ligne.
						<br />
						Pour les groupes, séminaires et privatisations,{" "}
						<br className="max-lg:hidden" />
						merci de nous contacter par mail.
					</p>

					<div className="mb-8 max-lg:mb-4 w-full text-[clamp(14px,1.4vw,16px)] max-lg:text-xs">
						<h3 className="mb-1 font-bold max-lg:text-sm text-lg">
							HORAIRES D'OUVERTURES
						</h3>
						<p>Dimanche, Lundi, Mardi 9h00-17h30</p>
						<p>Mercredi, Jeudi, Vendredi, Samedi 9h00-2h00</p>
					</div>

					<button
						id="umai-reservation-button"
						type="button"
						onClick={openReservationWidget}
						className="self-center bg-secondary hover:bg-secondary/90 px-10 max-lg:px-8 py-4 max-lg:py-3 font-sharpie font-black text-primary max-lg:text-lg text-xl tracking-widest active:scale-95 transition-all duration-200 cursor-pointer"
					>
						RÉSERVER UNE TABLE
					</button>

					<p className="opacity-60 mt-8 max-lg:mt-3 text-[clamp(12px,1.1vw,14px)] max-lg:text-[10px]">
						Vous pouvez également nous joindre au{" "}
						<a
							href="tel:+33240829171"
							className="hover:opacity-100 underline underline-offset-2 transition-opacity"
						>
							02 40 82 91 71
						</a>
					</p>
				</div>
			</section>
		</main>
	);
}
