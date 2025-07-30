"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

	return (
		<nav className="nav">
			<div className="navBar">
				{/* Nav toggle */}
				<button
					type="button"
					className={clsx("navToggle", { active: navMenuIsOpen })}
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
							<Link href="/" onClick={() => setNavMenuIsOpen(false)}>
								Accueil
							</Link>
						</li>
						<li className={clsx({ active: isActive("/informations") })}>
							<Link
								href="/informations"
								onClick={() => setNavMenuIsOpen(false)}
							>
								Informations
							</Link>
						</li>
						<li>
							<a
								href="https://www.instagram.com/stories/highlights/18281303998281206/"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setNavMenuIsOpen(false)}
							>
								Menu
							</a>
						</li>
						<li>
							<Link
								href="dimanches-du-chateau"
								onClick={() => setNavMenuIsOpen(false)}
							>
								Les dimanches du Château
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
