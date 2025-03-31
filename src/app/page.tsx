import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "./favicon.ico";

export default function Home() {
  return (
    <div>
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-start gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
          <Image
            className="sm:-ml-14"
            src={Logo}
            alt="logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            CS Handbook
          </h1>
          <p className="text-muted-foreground text-xl">
            The ultimate community-driven handbook for all things related to CS
          </p>
          <div className="flex gap-8">
            <Link href="/introduction">
              <Button className="rounded-full">Get started</Button>
            </Link>
            <Link
              href="https://github.com/MuffinTheDragon/cs-handbook"
              target="_blank"
            >
              <Button variant="ghost" className="rounded-full">
                View code
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
