import { HeaderHome } from "@/components/home/index";
import { FirstViewHome } from "@/components/home/index";
import { MiddleCards } from "@/components/home/index";
import { SecondViewHome } from "@/components/home/index";
import { ThirdViewHome } from "@/components/home/index";

export const metadata = { title: 'Home' };

export default function Home() {
  return (
    <>
      <HeaderHome/>

      <main>
      
        <FirstViewHome/>

        <MiddleCards/>

        <SecondViewHome/>

        <ThirdViewHome/>

      </main>
    </>
  );
}

