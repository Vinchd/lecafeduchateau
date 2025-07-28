"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./NavBar.module.scss";

export default function NavBar() {
	const [navMenuIsOpen, setNavMenuIsOpen] = useState(false);
	const pathname = usePathname();

	const toggleNav = () => {
		setNavMenuIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const body = document.body;
		if (!body) return;

		body.classList.toggle(styles.navIsVisible, navMenuIsOpen);

		return () => {
			body.classList.remove(styles.navIsVisible);
		};
	}, [navMenuIsOpen]);

	const isActive = (path) => pathname === path;

	return (
		<nav className={styles.nav}>
			<div className={styles.navBar}>
				{/* Nav toggle */}
				<button
					type="button"
					className={clsx(styles.navToggle, { [styles.active]: navMenuIsOpen })}
					onClick={toggleNav}
					aria-label="Toggle navigation"
				>
					<span className={styles.navNavicon}>
						<span className={styles.navNaviconLine}></span>
						<span className={styles.navNaviconLine}></span>
						<span className={styles.navNaviconLine}></span>
					</span>
				</button>
			</div>

			{/* Menu background */}
			<div
				className={clsx(styles.navMenuBg, {
					[styles.active]: navMenuIsOpen,
				})}
			></div>

			{/* Menu */}
			<div
				className={clsx(styles.navMenu, {
					[styles.active]: navMenuIsOpen,
				})}
			>
				<div className={styles.navMenuContainer}>
					<ul>
						<li className={clsx({ [styles.active]: isActive("/") })}>
							<Link href="/" onClick={() => setNavMenuIsOpen(false)}>
								Accueil
							</Link>
						</li>
						<li
							className={clsx({ [styles.active]: isActive("/informations") })}
						>
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
							<a
								href="https://www.instagram.com/cafeduchateaupnc/p/DMQAJG3ymHU/"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setNavMenuIsOpen(false)}
							>
								Les dimanches du Château
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
