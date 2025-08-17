"use client";

import { MembershipLevel } from "@/types/types";
import { useSchematicFlag } from "@schematichq/schematic-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PlanChangeDetail {
  planId?: string;
  tier?: string;
  status?: string;
}

interface PlanChangedEvent extends CustomEvent {
  detail: PlanChangeDetail;
}

function useMembershipTier(): MembershipLevel | null {
  const router = useRouter();
  const hasBackstageContent = useSchematicFlag("backstage-content");
  const hasCrewContent = useSchematicFlag("crew-member-content");
  const hasVipContent = useSchematicFlag("vip-access");

  useEffect(() => {
    const handlePlanChanged = (event: PlanChangedEvent) => {
      // Handle the plan change event
      console.log("Plan changed:", event);

      // You can update UI, refresh data, or trigger other acitions
      // For example, you might want to refetch user entitlements
      router.refresh();
    };
    window.addEventListener("plan-changed", handlePlanChanged as EventListener);

    // Cleanup the event listener on component unmount
    // This prevents memory leaks and ensures the listener is removed when the component is unmounted
    return () => {
      window.removeEventListener(
        "plan-changed",
        handlePlanChanged as EventListener
      );
    };
  }, [router]);

  if (hasVipContent) return 3;
  if (hasCrewContent) return 2;
  if (hasBackstageContent) return 1;
  return null; // No membership tier available
}

export default useMembershipTier;
