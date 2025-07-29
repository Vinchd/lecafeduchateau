import Link from "next/link";

export default function NotFound() {
	return (
		<div className="relative flex flex-col justify-center items-center gap-10 bg-primary h-[100dvh] min-h-screen text-2xl">
			<div>Page non trouvée</div>
			<Link
				href="/"
				className="bg-gray-300 hover:bg-gray-400 px-12 py-4 rounded-3xl w-fit font-semibold text-secondary tracking-wider"
			>
				Retour à l'accueil
			</Link>
		</div>
	);
}
