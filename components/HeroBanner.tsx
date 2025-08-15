import { urlFor } from '@/sanity/lib/image';
import { getSiteSettings } from '@/sanity/lib/siteSettings/getSiteSettings'
import React from 'react'
import Image from "next/image";

async function HeroBanner() {
    const siteSettings = await getSiteSettings();

  return (
    <div className="relative w-full h-[30vh] xl:h-[40vh]">
        {siteSettings?.mainHeroImage && (
            <>
                <Image
                    src={urlFor(siteSettings?.mainHeroImage).url()}
                    alt="Hero Banner"
                    fill
                    className="object-cover w-full"
                    priority/>
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparant to-black/50 pointer-events-none">
                
                </div>
                
               
            </>
        )}
    </div>
  )
}

export default HeroBanner