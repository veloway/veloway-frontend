import { Navbar } from "@/components/ui";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto px-10">
      <Navbar />
      {children}
    </main>
  );
}
