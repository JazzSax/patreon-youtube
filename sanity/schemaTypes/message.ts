import { defineType, defineField } from "sanity";
import { Mail, MailPlus } from "lucide-react";

export default defineType({
  name: "message",
  title: "VIP Messages",
  type: "document",
  icon: MailPlus,
  description: "User messages for communication within the platform",
  preview: {
    select: {
      message: "messageBody",
      sender: "senderName",
      date: "_createdAt",
    },
    prepare({ message, sender, date }) {
      return {
        title: message,
        subtitle: `From: ${sender || "Unknown"} - ${date ? new Date(date).toLocaleDateString() : "Unknown date"}`,
      };
    },
  },
  fields: [
    defineField({
      name: "senderName",
      title: "Sender Name",
      type: "string",

      description: "User who sent the message",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "senderEmail",
      title: "sender Email",
      type: "string",
      description: "Email address of the sender",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "messageBody",
      title: "Message Body",
      type: "text",
      description: "The content of the message",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isRead",
      title: "Read",
      type: "boolean",
      description: "Indicates if the message is read",
      initialValue: false,
    }),
  ],
});
