import { defineType, defineField, defineArrayMember } from "sanity";
import { SettingsIcon } from "lucide-react";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description:
    "Global settings for the site, including branding and social media links.",
  icon: SettingsIcon,
  preview: {
    select: {
      title: "siteTitle",
    },
    prepare({ title }) {
      return {
        title,
        media: SettingsIcon,
      };
    },
  },
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      description:
        "The main title of your site, shown in the header and browser tab.",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "A short description of your site for SEO and social sharing.",
    }),
    defineField({
      name: "headerLogo",
      title: "Header Logo",
      type: "image",
      description: "Logo displayed in the site header.",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the main hero image.",
        },
      ],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "mainHeroImage",
      title: "Main Hero Image",
      type: "image",
      description: "The main image for your site's hero section.",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the main hero image.",
        },
      ],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "General logo used throughout the site.",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "socialMediaLinks",
      title: "Social Media Links",
      type: "array",
      description: "Links to your social media profiles.",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              description: "Select the social media platform.",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Facebook", value: "facebook" },
                  { title: "X (Twitter)", value: "x" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Pinterest", value: "pinterest" },
                  { title: "Github", value: "github" },
                  { title: "Discord", value: "discord" },
                  { title: "Twitch", value: "twitch" },
                  { title: "Other", value: "other" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "Full URL to your profile.",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "callToActionText",
      title: "Call To Action Text",
      type: "string",
      description: "Text for your site's main call-to-action button.",
    }),
  ],
});
