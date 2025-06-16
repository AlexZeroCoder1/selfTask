'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "../hooks/globalHooks";

export default function Footer() {
    const pathname = usePathname()

    const navItems = [
        { href: '/home', icon: '/svg/home.svg' },
        { href: '/skills', icon: '/svg/stats.svg' },
        { href: '/pictures', icon: '/svg/images.svg' },
        { href: '/settings', icon: '/svg/profile.svg' },
    ];

    const isMobile = useIsMobile()

    if (!isMobile) {
        return null
    }
    
    return (
        <>
            <div className="w-full h-17"></div>
            <footer className="fixed bottom-0 w-full h-15 grey-interface flex justify-between px-5 py-1 z-50">
                {navItems.map(({ href, icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link key={href} href={href}>
                            <div className={`transition-colors h-[40px] w-[40px] flex items-center justify-center rounded-full ${isActive ? 'bg-[#505050]' : ''}`}>
                                <img className="invert brightness-0 h-[24px] w-[24px]" src={icon} alt="" />
                            </div>
                        </Link>
                    );
                })}
            </footer>
        </>
    )
}