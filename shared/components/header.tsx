'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useIsMobile } from "../hooks/globalHooks"

export default function Header() {
    const pathname = usePathname()
    const isMobile = useIsMobile()

    if (isMobile) return null

    return (
        <header className="max-w-[704px] w-full mx-auto px-4 py-2 flex justify-between h-[40px]">
            <nav>
                <ul className="flex gap-6 items-center">
                    <li>
                        <Link className={pathname === "/home" ? "text-3xl" : ""} href="/home">Home</Link>
                    </li>
                    <li>
                        <Link className={pathname === "/pictures" ? "text-3xl" : ""} href="/pictures">Pictures</Link>
                    </li>
                </ul>
            </nav>
            <Link href="/settings">
                {
                    pathname == "/settings" ?
                        <div className='transition-colors h-[26px] w-[26px] flex items-center justify-center rounded-full bg-[#505050] scale-130'>
                            <img className="h-full scale-70 invert brightness-0" src="/svg/profile.svg" alt="profile icon" />
                        </div>
                        :
                        <img className="h-[26px] w-[26px] invert brightness-0" src="/svg/profile.svg" alt="profile icon" />
                }
            </Link>
        </header>
    )
}