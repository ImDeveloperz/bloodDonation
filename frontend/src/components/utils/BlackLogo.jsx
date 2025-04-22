"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

const BlackLogo = () => {
    const router = useRouter();
    return (
        <div className="flex items-center cursor-pointer" onClick={()=>{
            router.push("/")
        }}>
            <img
                src="/logo.png"
                alt="LifeLinkAi Logo"
                className="h-12 sm:h-14 md:h-16 w-auto ml-0 sm:ml-4 md:ml-16 transition-transform duration-300 hover:scale-105"
            />
        </div>
    )
}

export default BlackLogo