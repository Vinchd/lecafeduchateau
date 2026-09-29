"use client";
import { useEffect } from "react";

export default function ReservationButton() {
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
		<button
			id="umai-reservation-button"
			type="button"
			onClick={openReservationWidget}
			className="self-center bg-secondary hover:bg-secondary/90 px-10 max-lg:px-8 py-4 max-lg:py-3 font-sharpie font-black text-primary max-lg:text-lg text-xl tracking-widest active:scale-95 transition-all duration-200 cursor-pointer"
		>
			RÉSERVER UNE TABLE
		</button>
	);
}
