import { HeroSection } from '@/components/home';
import Image from 'next/image';

export const metadata = { title: 'Home' };

export default function Home() {
	return (
		<div>
			<h1>Home</h1>
			<HeroSection />
		</div>
	);
}
