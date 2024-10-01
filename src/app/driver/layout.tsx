import { Navbar } from "@/components/ui";

export default function DriverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const links = [
    {
      name: "Inicio",
      href: "/"
    },
    {
      name: "Vehiculo",
      href: "/vehiculo"
    },
    {
      name: "Cliente",
      href: "#"
    },
    {
      name: "API",
      href: "#"
    }
  ];

  return (
    <div>
      <Navbar links= {links}/>
      <main>
          {children}
      </main>
    </div>
  );
}
