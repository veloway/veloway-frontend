"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../logo/Logo";
import ContainerFlex from "../container-flex/ContainerFlex";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { useRegistroStoreDto } from "@/stores/userRegisterStore";
import { useAuthStore } from "@/stores/authStore";

type LinkType = {
	name: string;
	href: string;
};

interface NavbarProps {
	links: LinkType[];
}

const NavBar = ({ links }: NavbarProps) => {
	const [clickMenu, setClickMenu] = useState<boolean>(false);
	const userPayload = useAuthStore((state) => state.userPayload);

	const handleClick = (): void => {
		setClickMenu(!clickMenu);
	};

	return (
		<header className='fixed top-0 z-[9999999] w-full shadow-lg shadow-gray-400/30 h-[80px] m-auto bg-tertiary text-white'>
			<div className='flex bg-tertiary relative z-[9999999] h-full justify-between items-center max-w-screen-lg lg:max-w-screen-xl 2xl:max-w-screen-2xl m-auto px-4 md:px-10'>
				<div className='flex gap-[80px] py-[15px]'>
					<Logo />
					<nav className='hidden lg:flex align-center'>
						<ul className='flex justify-center items-center gap-[45px] font-medium'>
							{links.map((link) => (
								<li key={link.name}>
									<Link href={link.href} className={`${styles.underline}`}>{link.name}</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<IoMenu className='text-3xl cursor-pointer lg:hidden' onClick={handleClick} />
				<ContainerFlex className='gap-3 hidden lg:flex'>
					{/* <picture>
						<Image
							src={user.image}
							width={50}
							height={50}
							alt=''
							className='rounded-full w-[50px] h-[50px] object-cover'
						/>
					</picture> */}
					<div>
						<p className='font-medium text-base'>{userPayload.nombre} {userPayload.apellido} </p>
						<p className='font-light text-sm hover:underline cursor-pointer'>Mi cuenta</p>
					</div>
				</ContainerFlex>
			</div>
			<ContainerFlex
				className={`${clickMenu ? "flex flex-col" : "-translate-y-full relative -top-[90px] z-[99999]"} transition-transform lg:hidden bg-tertiary text-secondary shadow-lg shadow-gray-400/30 !justify-start !items-start py-6`}>
				<ul className={`flex flex-col gap-[30px] font-medium w-full m-auto px-[40px] max-w-5xl`}>
					{links.map((link) => (
						<li key={link.name}>
							<Link href={link.href} className={`${styles.underline}`}>{link.name}</Link>
						</li>
					))}
					<ContainerFlex className='gap-3 xl:flex !justify-start'>
						{/* <picture>
							<Image
								src={user.image}
								width={50}
								height={50}
								alt=''
								className='rounded-full w-[50px] h-[50px] object-cover'
							/>
						</picture> */}
						<div>
							<p className='font-medium text-base'>{userPayload.nombre}</p>
							<p className='font-light text-sm hover:underline cursor-pointer'>Mi cuenta</p>
						</div>
					</ContainerFlex>
				</ul>
			</ContainerFlex>
		</header>
	);
};

export default NavBar;
