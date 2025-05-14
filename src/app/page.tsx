import Image from "next/image";
import Link from "next/link";


export default function home() {

    return (
        <div>
        <Link href={'./blog'}>Blog</Link>
        <Link href={'./blog'}>About</Link>
        </div>
    )
 
}
