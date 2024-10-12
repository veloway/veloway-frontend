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
      <main className="max-w-screen-lg flex items-center mt-[80px] xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto px-10 min-h-[calc(100vh-80px)] ">
        {children}
      </main>
    </div>
  );
}
