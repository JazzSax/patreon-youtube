'use client'
import React from 'react'
import { GetPostsQueryResult } from "@/sanity.types";
import { useUser } from "@clerk/nextjs"
import useMembershipTier from '@/hooks/useMembershipTier';
import { tierMap, TierAccess } from '@/types/types';
import Link from 'next/link';
import LockedPost from './LockedPost';
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";
import Badge from './Badge/Badge';
import { PortableText } from '@portabletext/react';
import { MessageCircleIcon } from 'lucide-react';
import CreatedAt from './CreatedAt';

function Post({ post }:{ post: GetPostsQueryResult[number] }) {
    const membershipTier = useMembershipTier();
    const { user } = useUser();
    const postMembershipLevel = tierMap[post.tierAccess as TierAccess];
    const isLocked = membershipTier && membershipTier < postMembershipLevel;

    if(!membershipTier){
        return(
            <div className="bg-white rounded-lg shadow-sm relative animate-pulse">
                {post.coverImage && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-gray-200">
                        
                    </div>
                )}
                <div className="p-6">
                    <div className="flex item-center justfy-between mb-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </div>

                {!user && (
                    <div className="space-y-2 text-center my-8">
                        <p className="text-gray-500"> Sign in to view this post.</p>
                    </div>
                )}

                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                     <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
            </div>
        )
    }

    if(isLocked){
        
         return <LockedPost post={post}/>

    } 
  
  return (
    <Link href={`/post/${post._id}`}>
        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer relative">
            {post.coverImage?.asset && (
                <div className="relative aspect-[16/9] w=full overflow-hidden rounded-t-lg">
                      <Image src={urlFor(post.coverImage).url()} alt={post.coverImage.alt || post.title || "Post cover Image"} fill className="object-cover group-hover:scale-105 transition-all duration-300"/>
                </div>
            )}

            {post.tierAccess && (
                <div className="absolute top-4 right-4">
                    <Badge tier={post.tierAccess}/>
                </div>
            )}

          
            <div className="p-6">
                  {post.body && (
                <div className="text-gray-600 prose">
                    <PortableText value={post.body}/>
                </div>
            )}
            {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                    <span
                        key={tag._id}
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                    >
                        {tag.title}
                    </span>
                    ))}
                </div>
                )}


          
                <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500 text-right border border-gray-200 rounded-full px-4 py-1 flex items-center gap-2">
                    <MessageCircleIcon className="w-4 h-4"/>
                    {post.comments?.length} comments
                </div>
                <div className="text-sm text-gray-500 text-right">
                    <CreatedAt date={post._createdAt}/>
                </div>
            </div>
            </div>
             
           
        </article>
    </Link>
  )
}

export default Post