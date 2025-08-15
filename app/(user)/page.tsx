import Image from "next/image";
import HeroBanner from '@/components/HeroBanner';
import InformationPanel from '@/components/InformationPanel';
import { getPosts } from "@/sanity/lib/post/getPosts";
import PostList from '@/components/PostList';
export default async function Home({searchParams,}:{searchParams: Promise<{ tier:string }>}) {
  const { tier } = await searchParams;
  const posts = await getPosts(tier);
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
