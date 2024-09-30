import { Navbar } from "@/components/ui";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className="max-w-screen-lg mt-[90px] xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto px-10">
        {children}
      </main>
    </div>
  );
}
