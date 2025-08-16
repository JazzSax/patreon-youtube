'use client'

import { GetPostQueryResult } from '@/sanity.types';
import { useState } from"react";
import { useTransition } from 'react';
import useMembershipTier from '@/hooks/useMembershipTier';
import { useUser } from "@clerk/nextjs";
import { tierMap } from '@/types/types';
import { Avatar,AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import addComment from '@/action/addComment';
import { urlFor } from '@/sanity/lib/image';
import TimeAgo from 'react-timeago';

function Comments({ post }: { post: GetPostQueryResult }) {
    const [comment, setComment] = useState("");
    const membershipTier = useMembershipTier();
    const { user } = useUser();
    const[isCommenting, startTransition] = useTransition();
    const hasCommentFeature = membershipTier && membershipTier >= tierMap.crew;
    console.log("Post comments:", post.comments);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!post || !hasCommentFeature) return;
        startTransition(async() => {
            const id=post._id;
            const text = comment;
            try{
                setComment("");
                await addComment(id,text);

            } catch (error) {
                console.error("Error adding comment:", error);
                setComment(text);
            }
        })}
  return (
    <div className="space-y-6">
        {/* Comment Input Box */}
        <form onSubmit={handleSubmit}>
            <div className="flex items-start gap-4 bg-white rounded-lg p-2 md:p-6">
                <Avatar>
                    <AvatarImage src={user?.imageUrl || ""} />
                    <AvatarFallback>
                        {user?.firstName?.charAt(0) }
                        {user?.lastName?.charAt(0) }
                    </AvatarFallback>
                </Avatar>
                  <div className="flex-1">
                    <Textarea disabled={!user || !hasCommentFeature || isCommenting} 
                        placeholder={isCommenting? "Adding comment..." : hasCommentFeature ? "Write a comment..." : "Upgrade membership to comment"} 
                        value={comment} 
                        onKeyDown={
                        (e) => {
                            if(e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
                                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>); // Ensure correct type
                            }
                        }
                    } onChange={(e) => setComment(e.target.value)
                    } className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"></Textarea>

                    <div className="flex justify-end mt-2">
                        <Button type="submit" disabled={!user || !hasCommentFeature || isCommenting } className="ml-auto">
                            {isCommenting ? (
                                <Loader2 className="h-5 w-5 animate-spin"/>
                            ) : (
                                <Send className="h-5 w-5" />
                            )}
                            
                        </Button>
                    </div>
                  </div>

            </div>
          
        </form>
        {/* Comment */}
        <div className="space-y-4">
            {post?.comments.length === 0 && (
                <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
            )}
            {post?.comments.map((comment) => (
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm" key={comment._id}>
                    <Avatar>
                        <AvatarImage src={comment.userImageUrl} />
                        <AvatarFallback>
                            {comment.name?.charAt(0) }
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                            <h4 className="font-medium text-gray-900"> { comment.name } </h4>
                            {comment._createdAt && (
                                <span className="text-sm text-gray-500"> 
                                <TimeAgo date={comment._createdAt} />
                                </span> )}
                        </div>
                       <p className="text-gray-700 mt-1"> {comment.comment}</p>
                    </div>
                </div>

            ))}
                
        </div>
    </div>
  )
}

export default Comments; 