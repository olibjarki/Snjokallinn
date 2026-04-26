import { createClient } from "@/prismicio";
import Image from "next/image";
import Link from "next/link";
import NavToggle from "./navToggle";

export default async function Nav() {
    const client = createClient();
    const nav= await client.getSingle("nav");

    const bgUrl = nav.data.menu_background?.url;

    return(
        <>
        {bgUrl && <link rel="preload" as="image" href={bgUrl} />}
        <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-5 pt-10 z-50">
            <Link href="/" className="relative z-50 lg:pl-10">
                <Image
                    src="/Icons/SnjokallinnLogo.png"
                    alt="Snjokallinn"
                    width={200} height={71.25} />
            </Link>
            <NavToggle links={nav.data.navlinks} background={nav.data.menu_background} />
        </nav>
        </>
    );
}
