import React from 'react'
import { GetPostsQueryResult } from '@/sanity.types';
import { getSiteSettings } from '@/sanity/lib/siteSettings/getSiteSettings';
import { ClerkLoaded } from '@clerk/nextjs';
import FilterByTierSelect from './FilterByTierSelect';
import PostFilters from './PostFilters';
import PostsWithClerk from './PostClerk';


interface PostListProps {
  posts: GetPostsQueryResult;
  refetchPosts: () => Promise<void>; // server action type
}
async function PostList({ posts,refetchPosts }: PostListProps) {
    const siteSettings = await getSiteSettings();

  return (
    <section className="my-8 px-4">
        <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Recent Posts by {siteSettings?.siteTitle}
            </h2>

        </div>

        <div className="flex justify-center items-center mb-4">
           
          <PostFilters refetchPosts={refetchPosts}/>
        </div>

        <div className="grid grid-cols-1 gap-6">
             <PostsWithClerk posts={posts} />
        </div>
    </section>
 
  )
}

export default PostList;



