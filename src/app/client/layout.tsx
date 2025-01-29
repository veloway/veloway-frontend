import { Navbar } from "@/components/ui";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    {
      name: "Inicio",
      href: "/client/dashboard"
    },
    {
      name: "Realizar Envio",
      href: "#"
    },
    {
      name: "Conductores",
      href: "#"
    },
    {
      name: "Api",
      href: "#"
    }
  ]
  return (
    <div>
      <Navbar 
        links= {links}
      />
      <main className="flex mt-[80px] m-auto min-h-[calc(100vh-80px)] ">
        {children}
      </main>
    </div>
  );
}
