import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GetPostQueryResult, GetRelatedPostsQueryResult } from "@/sanity.types";
import useMembershipTier from "@/hooks/useMembershipTier";
import { useUser } from "@clerk/nextjs";
import { tierMap, TierAccess } from "@/types/types";
import RelatedPost from "./RelatedPost";


function RelatedPostsList({ relatedPosts }: { relatedPosts :  GetRelatedPostsQueryResult }) {

  if (!relatedPosts|| relatedPosts.length === 0) {
    return null; // or some fallback UI
  }
 
  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {relatedPosts.map((relatedPost) => (
          
          <RelatedPost post={relatedPost} key={relatedPost._id} />
         
        ))}
      </div>
    </section>
  );
}
export default RelatedPostsList;
