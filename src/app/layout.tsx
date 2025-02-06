import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google";
import { Footer } from "@/components/ui";
import localFont from "next/font/local";
import MuiProvider from "@/context/mui";
import { Slide, ToastContainer } from "react-toastify";
import { LoginVerification } from "@/components/auth/LoginVerification";

export const rubik = Rubik({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
	variable: "--font-rubik",
});

// Font personalizada
export const nicoMoji = localFont({
	src: "../../public/fonts/NicoMoji-Regular.ttf",
	variable: "--font-nico-moji",
});

export const metadata: Metadata = {
	title: "Veloway",
	description:
		"Plataforma para gestionar envíos de personas y negocios con seguimiento en tiempo real. Solicita envíos y consulta estados. Trabajá con nosotros como conductor. Integración con sistemas de seguros y alertas de emergencia. API disponible para automatizar solicitudes y seguimiento de envíos.",
	keywords:
		"envíos, seguimiento de envíos, plataforma de envíos, conductores registrados, integración con seguros, alertas de emergencia, API de envíos, gestión de envíos, envíos para negocios",
	authors: { name: "Veloway" },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<LoginVerification>
			<html lang='en'>
				<MuiProvider>
					<body className={`${rubik.className} ${nicoMoji.variable} antialiased`}>
						{children}
						<ToastContainer style={{zIndex: 999999999}} position="top-center" transition={Slide} autoClose={4000}/>
						<Footer />
					</body>
				</MuiProvider>
			</html>
		</LoginVerification>
	);
}
