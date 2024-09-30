import Link from "next/link";
import "./NavBar.css";
import Image from "next/image";
import Logo from "../logo/Logo";

const NavBar = () => {
	const user = {
		name: "jf_arce",
		role: "Admin",
		image: "https://th.bing.com/th/id/OIP.Z8J_Ho1F_9qacAbb9ZwInQHaJQ?w=800&h=1000&rs=1&pid=ImgDetMain",
	};
	
	return (
		<header className="fixed top-0 w-full shadow-lg shadow-gray-400/30 h-[90px] m-auto">
			<div className='flex h-full justify-between items-center max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto px-10'>
				<div className='flex gap-[100px] py-[15px]'>
					<Logo/>
					<nav className='flex align-center'>
						<ul className='flex justify-center items-center gap-[45px] font-medium'>
							<li>
								<Link href='/'>Inicio</Link>
							</li>
							<li>
								<Link href='#'>Realizar Envio</Link>
							</li>
							<li>
								<Link href='#'>Conductores</Link>
							</li>
							<li>
								<Link href='#'>Api</Link>
							</li>
						</ul>
					</nav>
				</div>
				<div className="flex gap-3 items-center">
					<picture >
						<Image src={user.image} width={50} height={50} alt="" className="rounded-full w-[50px] h-[50px] object-cover"/>
					</picture>
					<div>
						<p className="font-medium">{user.name}</p>
						<p className="font-light text-xs hover:underline cursor-pointer">Mi cuenta</p>
					</div>
				</div>
			</div>
		</header>
	);
};

export default NavBar;
