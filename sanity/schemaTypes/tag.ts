import { defineType, defineField } from "sanity";
import { TagIcon } from "lucide-react";

export default defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: TagIcon,
  description: "Reusable tags for categorizing posts and other content.",
  fields: [
    defineField({
      name: "title",
      title: "Tag Title",
      type: "string",
      description: "The name of the tag.",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "Optional description for the tag.",
    }),
  ],
});
