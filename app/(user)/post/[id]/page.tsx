import React from "react";
import { notFound } from "next/navigation";
import { getPost } from "@/sanity/lib/post/getPost";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import Badge from "@/components/Badge/Badge";
import CreatedAt from "@/components/CreatedAt";
import { PortableText } from "@portabletext/react";
import Comments from "@/components/Comments";
import { getRelatedPosts } from "@/sanity/lib/post/getRelatedPosts";
import RelatedPostList from "@/components/RelatedPostList";

async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  const relatedPosts = await getRelatedPosts(id);
  if (!post) return notFound();
  return (
    <main className="min-h-screen bg-white">
      {/* Post Cover Image */}
      {post.coverImage?.asset && (
        <div className="relative h-[50vh] w-full bg-gray-100">
          {/* Blurred background */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={urlFor(post.coverImage).url()}
              alt={post.coverImage.alt || post.title || "Post cover Image"}
              fill
              className="object-contain blur-md scale-105 brightness-90"
              priority
            />
          </div>
          {/* Clear Centered Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-3xl h-full max-h-[400px] mx-4">
              <Image
                src={urlFor(post.coverImage).url()}
                alt={post.coverImage.alt || post.title || "Post cover Image"}
                fill
                className="object-contain "
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Post Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Back to posts link */}
        <Link
          href="/"
          className="text-sm text-gray-500 flex gap-2 items-center mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Return to posts
        </Link>
        {/* Post Header */}
        {post.tierAccess && (
          <div className="relative mb-6 p-4 flex justify-between items-center border border-gray-100 rounded-lg">
            <Badge tier={post.tierAccess} />
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <p className="font-medium">Posted: </p>
              <CreatedAt date={post._createdAt} />
            </div>
          </div>
        )}

        {/* Post Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
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

        {/* Post Title and Body */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {" "}
            {post.title}
          </h1>
          {post.body && (
            <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-600">
              <PortableText value={post.body} />
            </div>
          )}
        </div>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts?.length > 0 && (
          <RelatedPostList relatedPosts={relatedPosts} />
        )}

        <div className="max-w-3xl mx-auto px-4 py-12">
          <Comments post={post} />
        </div>
      </div>
    </main>
  );
}

export default PostPage;
