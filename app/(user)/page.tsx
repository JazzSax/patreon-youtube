import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import InformationPanel from "@/components/InformationPanel";
import { getPosts } from "@/sanity/lib/post/getPosts";
import PostList from "@/components/PostList";
import { GetPostsQueryResult } from "@/sanity.types";
import { loadSearchParams } from "./searchParams";
import type { SearchParams } from "nuqs/server";
import { revalidateTag } from "next/cache";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const { tier, search } = await loadSearchParams(searchParams);
  const posts = (await getPosts(tier, search)) as GetPostsQueryResult;

  async function refetchPosts() {
    "use server";
    revalidateTag("posts");
  }
  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />
      {/* Information Panel */}
      <div className="-mt-20 border-b border-gray-200">
        <InformationPanel />
      </div>

      {/* Post */}

      <PostList posts={posts} refetchPosts={refetchPosts} />
    </div>
  );
}
