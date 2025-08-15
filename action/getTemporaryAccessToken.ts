"use server";

import { currentUser } from "@clerk/nextjs/server";
import { SchematicClient } from "@schematichq/schematic-typescript-node";

const apiKey = process.env.SCHEMATIC_API_KEY;
const client = new SchematicClient({ apiKey });

// Get temporary access token for a user
export async function getTemporaryAccessToken() {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const response = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: { id: user.id },
  });
  console.log(
    "Token response received:",
    response.data ? "TOken received" : "No token received"
  );

  return response.data.token;
}
