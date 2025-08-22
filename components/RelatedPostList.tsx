import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GetPostQueryResult, GetRelatedPostsQueryResult } from "@/sanity.types";
import useMembershipTier from "@/hooks/useMembershipTier";
import { useUser } from "@clerk/nextjs";
import { tierMap, TierAccess } from "@/types/types";
import RelatedPost from "./RelatedPost";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function RelatedPostsList({ relatedPosts }: { relatedPosts :  GetRelatedPostsQueryResult }) {

  if (!relatedPosts|| relatedPosts.length === 0) {
    return null; // or some fallback UI
  }
 
  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
       <Carousel
      opts={{
        align: "start",
        loop:true,
      }}
      className="w-full "
    >
      <CarouselContent>
          
            {relatedPosts.map((relatedPost, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
                <RelatedPost post={relatedPost} key={relatedPost._id} />
            </CarouselItem>
          
          ))}

        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      
   
    
    </section>
  );
}
export default RelatedPostsList;
