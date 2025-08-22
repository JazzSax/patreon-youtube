"use client";

import useMembershipTier from '@/hooks/useMembershipTier';
import { useUser } from '@clerk/nextjs';
import { tierMap, TierAccess } from '@/types/types';
import { GetRelatedPostsQueryResult } from '@/sanity.types';
import LockedRelatedPost from './LockedRelatedPost';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import TierBadge from './Badge/TierBadge';


function RelatedPost({ post }: { post: GetRelatedPostsQueryResult[number] }) {
    const membershipTier = useMembershipTier();
    const { user } = useUser();
    const postMembershipLevel = tierMap[post.tierAccess as TierAccess];
    const isLocked = membershipTier && membershipTier < postMembershipLevel;
    if(isLocked){
      return <LockedRelatedPost post={post}/>
    }
    return (
        <Link href={`/post/${post._id}`}>
           
            <article className={`bg-white rounded-lg shadowm-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer relative`}>
                {post.coverImage?.asset && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg rel">
                
                    <Image src={urlFor(post.coverImage).url()} alt={post.coverImage.alt || post.title || "Post cover Image"} fill className="object-contain"/>
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
                </div>
            </article>
        </Link>
    )
}

export default RelatedPost