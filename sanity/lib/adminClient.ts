import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Must be false for write operations
  token: process.env.SANITY_API_ADMIN_TOKEN, // Ensure you have a valid token for admin operations
});
