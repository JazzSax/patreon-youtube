"use server";

import { currentUser } from "@clerk/nextjs/server";
import { SchematicClient } from "@schematichq/schematic-typescript-node";

const client = new SchematicClient({
  apiKey: process.env.SCHEMATIC_API_KEY!,
});

export async function getTemporaryAccessToken() {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const response = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company", // <- depends on types!
    lookup: { id: user.id },
  } as any); // temporary type assertion if needed

  return response.data.token;
}
