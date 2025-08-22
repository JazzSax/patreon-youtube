import Image from "next/image";
import HeroBanner from '@/components/HeroBanner';
import InformationPanel from '@/components/InformationPanel';
import { getPosts } from "@/sanity/lib/post/getPosts";
import PostList from '@/components/PostList';
import { GetPostsQueryResult } from "@/sanity.types";

export default async function Home({searchParams,}:{searchParams: Promise<{ tier:string }>}) {
  const { tier } = await searchParams;
  console.log("Tier from search params:", tier);
  const posts = await getPosts(tier) as GetPostsQueryResult;
  return (
    <div >
      {/* Hero Banner */}
      <HeroBanner/>
      {/* Information Panel */}
      <div className="-mt-20 border-b border-gray-200">
              <InformationPanel/>
      </div>

      {/* Post */}

     <PostList posts={posts}/>
    </div>
  );
}
