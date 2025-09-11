import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";

const lato = Lato({
	variable: "--font-lato",
	subsets: ["latin"],
	weight: ["100", "300", "400", "700", "900"],
});

const sharpie = localFont({
	variable: "--font-sharpie",
	src: [
		{
			path: "./fonts/sharpie/Sharpie-Light.woff2",
			weight: "300",
		},
		{
			path: "./fonts/sharpie/Sharpie-Regular.woff2",
			weight: "400",
		},

		{
			path: "./fonts/sharpie/Sharpie-Bold.woff2",
			weight: "700",
		},
		{
			path: "./fonts/sharpie/Sharpie-Extrabold.woff2",
			weight: "800",
		},
		{
			path: "./fonts/sharpie/Sharpie-Black.woff2",
			weight: "900",
		},
	],
	subsets: ["latin"],
});

const gambetta = localFont({
	variable: "--font-gambetta",
	src: [
		{
			path: "./fonts/gambetta/Gambetta-Light.woff2",
			weight: "300",
		},
		{
			path: "./fonts/gambetta/Gambetta-LightItalic.woff2",
			weight: "300",
			style: "italic",
		},
		{
			path: "./fonts/gambetta/Gambetta-Regular.woff2",
			weight: "400",
		},
		{
			path: "./fonts/gambetta/Gambetta-Italic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "./fonts/gambetta/Gambetta-Medium.woff2",
			weight: "500",
		},
		{
			path: "./fonts/gambetta/Gambetta-MediumItalic.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "./fonts/gambetta/Gambetta-Semibold.woff2",
			weight: "600",
		},
		{
			path: "./fonts/gambetta/Gambetta-SemiboldItalic.woff2",
			weight: "600",
			style: "italic",
		},
		{
			path: "./fonts/gambetta/Gambetta-Bold.woff2",
			weight: "700",
		},
		{
			path: "./fonts/gambetta/Gambetta-BoldItalic.woff2",
			weight: "700",
			style: "italic",
		},
	],
	subsets: ["latin"],
});

export const metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
	title: "Le Café du Château",
	description:
		"Brasserie française & fruits de mer. Cuisine locale, 100% maison. Les pieds dans l’eau.\nRéservations par téléphone. Plage du Château, 44210 Pornic, Pays De La Loire, France",
	keywords: [
		"restaurant",
		"café",
		"pornic",
		"chateau",
		"cuisine locale",
		"fait maison",
		"restau",
	],
	creator: "Vincent Daviaud",
	publisher: "Vincent Daviaud",
	openGraph: {
		title: "Le Café du Château",
		description:
			"Brasserie française & fruits de mer. Cuisine locale, 100% maison. Les pieds dans l’eau.\nRéservations par téléphone.",
		url: new URL(process.env.NEXT_PUBLIC_SITE_URL),
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
		twitter: {
			card: "summary_large_image",
			title: "Le Café du Château",
			description: "Restaurant, brasserie et fruits de mer à Pornic.",
			images: ["/logo-opengraph.png"],
		},
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="fr" className="h-dvh">
			<body
				className={`${lato.variable} ${lato.className} ${sharpie.variable} ${gambetta.variable} antialiased h-dvh`}
			>
				<NavBar />
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
