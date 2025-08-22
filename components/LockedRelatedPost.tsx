import React from 'react'
import { GetPostsQueryResult, GetRelatedPostsQueryResult } from '@/sanity.types';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, MessageCircleIcon } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import  TierBadge from "@/components/Badge/TierBadge";


function LockedRelatedPost({ post }: { post: GetRelatedPostsQueryResult[number] }) {

  return (
    <Link href="/pricing">
        <article className={`bg-white rounded-lg shadowm-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer relative`}>
        {post.coverImage?.asset && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg rel">
            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
            <Lock className="w-12 h-12 text-white"></Lock></div>
            <Image src={urlFor(post.coverImage).url()} alt={post.coverImage.alt || post.title || "Post cover Image"} fill className="object-contain blur-sm"/>
        </div>
    )}

    {post.tierAccess && (
        <div className="absolute top-4 right-4 z-20">
            <TierBadge tierAccess={post.tierAccess}/>
        </div>
    )}

    <div className="p-6 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 pb-6">
            {post.title}
        </h2>
        <div className="relative">
            <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-6 gap-4">
                    {Array(18).fill(0).map((_,i)=>(
                        <Lock key={i} className="w-4 h-4 text-gray-400"/>
                    ))}
                </div>
            </div>
            <div className="absolute inset-0 bg-gradiet-to-b from-transparent to-white z-10"/>
                
                <div className="absolute inset-0 flex items-center justify-center z-30">
                    <div className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg gap-2">
                        <Lock className="w-4 h-4"/>
                        Unlock Premium Content
                    </div>
                </div>
            </div>
        
        
    </div>
    </article>
    </Link>
  )
}

export default LockedRelatedPost