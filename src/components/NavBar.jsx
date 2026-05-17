"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { config } from "@/lib/config";

export default function NavBar() {
	const [navMenuIsOpen, setNavMenuIsOpen] = useState(false);
	const pathname = usePathname();

	const toggleNav = () => {
		setNavMenuIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const body = document.body;
		if (!body) return;

		body.classList.toggle("navIsVisible", navMenuIsOpen);

		return () => {
			body.classList.remove("navIsVisible");
		};
	}, [navMenuIsOpen]);

	const isActive = (path) => pathname === path;
	const whiteBurger = pathname === "/" || pathname === "/informations";

	const CustomLink = ({ href, children }) => {
		const handleClick = () => {
			setNavMenuIsOpen(false);
		};

		if (pathname === "/reservation") {
			return (
				<a href={href} onClick={handleClick}>
					{children}
				</a>
			);
		}

		return (
			<Link href={href} onClick={handleClick}>
				{children}
			</Link>
		);
	};

	return (
		<nav className="nav">
			<div className="navBar">
				{/* Nav toggle */}
				<button
					type="button"
					className={clsx("navToggle", {
						active: navMenuIsOpen,
						"text-primary": whiteBurger,
						"text-secondary": !whiteBurger,
					})}
					onClick={toggleNav}
					aria-label="Toggle navigation"
				>
					<span className="navNavicon">
						<span className="navNaviconLine first"></span>
						<span className="navNaviconLine second"></span>
						<span className="navNaviconLine third"></span>
					</span>
				</button>
			</div>

			{/* Menu background */}
			<div
				className={clsx("navMenuBg", {
					active: navMenuIsOpen,
				})}
			></div>

			{/* Menu */}
			<div
				className={clsx("navMenu", {
					active: navMenuIsOpen,
				})}
			>
				<div className="navMenuContainer">
					<ul>
						<li className={clsx({ active: isActive("/") })}>
							<CustomLink href="/">Accueil</CustomLink>
						</li>

						<li className={clsx({ active: isActive("/informations") })}>
							<CustomLink href="/informations">Informations</CustomLink>
						</li>

						<li className={clsx({ active: isActive("/menu") })}>
							<CustomLink href="/menu">Menu</CustomLink>
						</li>

						<li className={clsx({ active: isActive("/reservation") })}>
							<CustomLink href="/reservation">Réservation</CustomLink>
						</li>

						{config.showDimancheMenu && (
							<li
								className={clsx({
									active: isActive("/dimanches-du-chateau"),
								})}
							>
								<CustomLink href="/dimanches-du-chateau">
									Les dimanches du Château
								</CustomLink>
							</li>
						)}
					</ul>
				</div>

				<p className="right-0 bottom-0 absolute opacity-80 mr-6 font-light text-[8px] text-secondary delay-700">
					&copy; 2025 Le Café du Château
				</p>
			</div>
		</nav>
	);
}
