import React from 'react'
import { getSiteSettings } from '@/sanity/lib/siteSettings/getSiteSettings'
import Image from "next/image";
import { urlFor } from '@/sanity/lib/image';

async function InformationPanel() {
    const siteSettings = await getSiteSettings();
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto py-8 px-4 space-y-4">

        {/* {Logo} */}
        {siteSettings?.logo && (
         
            <Image
                src={urlFor(siteSettings?.logo).url()}
                alt="Logo"
                width={200}
                height={200}
                className="rounded-lg z-50"
            />
          
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mt-4" > 
            {siteSettings?.siteTitle}
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center">
            {siteSettings?.description}
        </p>
       
       {/* Stats */}
    </div>
  )
}

export default InformationPanel