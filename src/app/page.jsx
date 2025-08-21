import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import FullScreenImageFader from "@/components/FullScreenImageFader";

export default function Home() {
	return (
		<main className="relative h-full overflow-hidden">
			<FullScreenImageFader />
			<div className="z-20 absolute inset-0 bg-black/30 pointer-events-none" />
			<div className="z-30 absolute inset-0 flex flex-col justify-center items-center text-primary text-center animate-fade-in-up">
				<div className="relative w-1/7 max-md:w-1/3 max-xl:w-1/5 h-full">
					<Image
						src="/logo.svg"
						alt="Logo le Café du Château"
						fill
						priority
						className="object-contain"
					/>
				</div>
			</div>
			<div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
				className="bottom-0 z-30 absolute flex flex-col items-center gap-6 mb-8 w-full text-primary text-center animate-fade-in-up-slow"
			>
				<a
					href="https://maps.app.goo.gl/XpSggq4R7tRGVo2TA?g_st=ipc"
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
						aria-label="Facebook"
						className="flex justify-center items-center hover:text-secondary hover:scale-110 transition duration-300"
					>
						<FaFacebookF className="w-9 h-9" />
					</a>
					<a
						href="https://www.instagram.com/cafeduchateaupnc"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						className="flex justify-center items-center hover:text-secondary hover:scale-110 transition duration-300"
					>
						<FaInstagram className="w-10 h-10" />
					</a>
				</div>
			</div>
		</main>
	);
}
