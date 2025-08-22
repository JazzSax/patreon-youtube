import { defineField, defineType } from "sanity";
import { FileTextIcon } from "lucide-react";

export default defineType({
  name: "post",
  title: "Posts",
  type: "document",
  icon: FileTextIcon,
  description: "Content posts that can be restricted by tier access levels",
  preview: {
    select: {
      title: "title",
      tierAccess: "tierAccess",
      media: "coverImage",
    },
    prepare({ title, tierAccess, media }) {
      return {
        title,
        subtitle: `Access: ${tierAccess || "None"}`,
        media,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      description: "Posts that share one or more tags with this post.",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description:
        "Main content of your post with rich text formatting options",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tierAccess",
      title: "Tier Access",
      type: "string",
      description: "Select the membership tier required to access this post",
      options: {
        list: [
          { title: "Backstage Pass", value: "backstage" },
          { title: "Crew Member", value: "crew" },
          { title: "VIP Access", value: "vip" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Optional cover image for the post",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the cover image.",
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "Add one or more tags to categorize this post.",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
      options: {
        layout: "tags", // shows them as little pills
      },
    }),
  ],
});
