"use server";

import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/schematic";
import { adminClient } from "@/sanity/lib/adminClient";

export async function sendMessage(message: string) {
  const user = await currentUser();
  if (!user) {
    return { success: false, error: "User not authenticated" };
  }
  try {
    const entitlements = await client.entitlements.getFeatureUsageByCompany({
      keys: {
        id: user.id,
      },
    });

    const feature = entitlements.data.features.find(
      (entitlement) => entitlement.feature?.eventSubtype === "send-dm",
    );
    const dmUsage = feature?.usage || 0;
    const dmAllocation = feature?.allocation || 0;
    if (dmUsage >= dmAllocation) {
      return { success: false, error: "Feature usage exceeded" };
    }
    if (!feature) {
      return { success: false, error: "Feature not found" };
    }

    const newMessage = await adminClient.create({
      _type: "message",
      senderName:
        user.fullName || user.emailAddresses[0]?.emailAddress || "Unknown",
      senderEmail: user.emailAddresses[0]?.emailAddress,
      messageBody: message,
    });

    await client.track({
      event: "send-dm",
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    const updatedDmUsage = dmUsage + 1;
    return {
      success: true,
      message: newMessage,
      usage: updatedDmUsage,
      allocation: dmAllocation,
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: "Failed to send message" };
  }
  return { success: true, message: "Message sent successfully" };
}
