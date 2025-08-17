import React from 'react'
import { GetPostsQueryResult } from '@/sanity.types';
import { getSiteSettings } from '@/sanity/lib/siteSettings/getSiteSettings';
import { ClerkLoaded } from '@clerk/nextjs';
import FilterByTierSelect from './FilterByTierSelect';

import PostsWithClerk from './PostClerk';

async function PostList({ posts }: { posts: GetPostsQueryResult }) {
    const siteSettings = await getSiteSettings();

  return (
    <section className="my-8 px-4">
        <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Recent Posts by {siteSettings?.siteTitle}
            </h2>

        </div>

        <div className="flex justify-center items-center mb-4">
            <FilterByTierSelect/>
        </div>

        <div className="grid grid-cols-1 gap-6">
             <PostsWithClerk posts={posts} />
        </div>
    </section>
 
  )
}

export default PostList;



