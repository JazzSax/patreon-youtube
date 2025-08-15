import React from 'react'
import { getSiteSettings } from '@/sanity/lib/siteSettings/getSiteSettings'
import Image from "next/image";
import { urlFor } from '@/sanity/lib/image';
import { getSocialIcon, SocialPlatform } from '@/lib/socialToIcon';

async function InformationPanel() {
    const siteSettings = await getSiteSettings();
    console.log(siteSettings.socialMediaLinks );
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
       <div className="flex items-center justfy-center space-x-4">
            <div className="text-center">
                <p className="text-2xl font-bold">{0}</p>
                <p className="text-gray-600">Posts</p>
            </div>

       </div>

       {/* Social Links */}
       <div className="flex items-center justify-center space-x-4">
        {siteSettings?.socialMediaLinks?.map((social) => {
           
            const Icon = getSocialIcon(social.platform as SocialPlatform);
            return(
                <a href={social.url} key={social.platform}>
                    <Icon/>
                </a>
            )
        }
        )}
       </div>
    </div>
  )
}

export default InformationPanel