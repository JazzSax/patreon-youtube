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
    defineField({
      name: "userImageUrl",
      title: "User Image URL",
      type: "url",
      description: "URL of the user's profile image",
      validation: (Rule) => Rule.uri({ allowRelative: true }),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Email of the user commenting",
      validation: (Rule) => Rule.required().email(),
    }),
  ],
});
