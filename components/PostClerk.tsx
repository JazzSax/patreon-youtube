"use client";

import { ClerkLoaded } from "@clerk/nextjs";
import Post from './Post';
import { GetPostsQueryResult } from '@/sanity.types';

function PostsWithClerk({ posts }: { posts: GetPostsQueryResult }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <ClerkLoaded>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </ClerkLoaded>
    </div>
  );
}

export default PostsWithClerk;