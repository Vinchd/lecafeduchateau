import { Analytics } from "@vercel/analytics/next";
import { Lato } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const lato = Lato({
	variable: "--font-lato",
	subsets: ["latin"],
	weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
	title: "Le Café du Château",
	description:
		"Brasserie française & fruits de mer. Cuisine locale. 100% maison. Les pieds dans l’eau.\nMar–Sam 9h–00h • Dim 9h–19h Réservations par téléphone.\nPlage du Château, Pornic, Pays De La Loire, France 44210",
	creator: "Vincent Daviaud",
	publisher: "Vincent Daviaud",
	openGraph: {
		title: "Le Café du Château",
		description:
			"Brasserie française & fruits de mer. Cuisine locale. 100% maison. Les pieds dans l’eau.\nMar–Sam 9h–00h • Dim 9h–19h Réservations par téléphone.\nPlage du Château, Pornic, Pays De La Loire, France 44210",
		siteName: "Le Café du Château",
		locale: "fr_FR",
		images: [
			{
				url: "/lecafeduchateau-logo.jpg",
				width: 1242,
				height: 1755,
				alt: "Logo Le Café du Château",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="fr" className="h-dvh">
			<body className={`${lato.variable} ${lato.className} antialiased h-dvh`}>
				<NavBar />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
