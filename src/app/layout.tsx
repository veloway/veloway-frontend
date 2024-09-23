import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google"
import { Footer } from "@/components/ui";

export const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],	
})

export const metadata: Metadata = {
  title: "Veloway",
  description: "Plataforma para gestionar envíos de personas y negocios con seguimiento en tiempo real. Solicita envíos y consulta estados. Trabajá con nosotros como conductor. Integración con sistemas de seguros y alertas de emergencia. API disponible para automatizar solicitudes y seguimiento de envíos.",
  keywords: "envíos, seguimiento de envíos, plataforma de envíos, conductores registrados, integración con seguros, alertas de emergencia, API de envíos, gestión de envíos, envíos para negocios",
  authors: {name: "Veloway"},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} antialiased`}
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}
