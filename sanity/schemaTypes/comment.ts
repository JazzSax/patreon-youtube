import { MessageSquareIcon } from "lucide-react";
import { defineType, defineField } from "sanity";
import post from "./post";

export default defineType({
  name: "comment",
  title: "Comments",
  type: "document",
  icon: MessageSquareIcon,
  description: "User comments on posts",
  preview: {
    select: {
      name: "name",
      comment: "comment",
      post: "post.title",
    },
    prepare({ name, comment, post }) {
      return {
        title: post,
        subtitle: `${name}: ${comment}`,
      };
    },
  },
  fields: [
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      description: "Reference to the post this comment belongs to",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the user commenting",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      description: "The content of the comment",
      validation: (Rule) => Rule.required().min(1).max(500),
    }),
  ],
});
