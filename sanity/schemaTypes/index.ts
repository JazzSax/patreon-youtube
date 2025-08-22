import { type SchemaTypeDefinition } from "sanity";
import siteSettings from "./siteSettings";
import post from "./post";
import comment from "./comment";
import message from "./message";
import tag from "./tag";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, tag, post, comment, message],
};
