import Link from "next/link";
import "./NavBar.css";

const NavBar = () => {
	return (
		<div className=''>
			<div className='flex gap-[100px] py-[15px]'>
				<p className='text-2xl'>Veloway</p>
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
			<div></div>
		</div>
	);
};

export default NavBar;
