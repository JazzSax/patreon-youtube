"use server";
import { adminClient } from "@/sanity/lib/adminClient";
import { currentUser } from "@clerk/nextjs/server";

async function addComment(postId: string, comment: string) {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");
  try {
    await adminClient.create({
      _type: "comment",
      post: { _type: "reference", _ref: postId },
      name: user.firstName,
      userImageUrl: user.imageUrl,
      email: user.emailAddresses[0]?.emailAddress,
      comment,
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding comment:", error);

    return { success: false, error: "Failed to add comment" };
  }
}

export default addComment;
