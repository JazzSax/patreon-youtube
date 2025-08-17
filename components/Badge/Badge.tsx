import { TierAccess, membershipMap, tierMap } from "@/types/types";
import { getBadgeColor, getBadgeIcon } from "./lib/utils";
import { Link } from "lucide-react";
interface BadgeProps{
    variant?: "simple" | "interactive";
    tier: TierAccess;
    className?: string;
    link?: string;
}
function Badge({ variant = "simple", tier,link, className  }: BadgeProps) {
    const baseStyles = "px-3 py-1 rounded-full text-sm font-medium";
    const level = tierMap[tier];
    const label = membershipMap[level];
    const badgeColor = getBadgeColor(level);
    
    if(variant === "interactive" ) {
      console.log("Interactive Badge Rendered", { tier, level, label, badgeColor });
        return(
          <div>
              
          <a href={ link || "" } className={`flex items-center gap-2 ${baseStyles} ${badgeColor} shadow-sm transition-all duration-200 hover-shadow-md hover:scale-105 ${className}`}>
            {getBadgeIcon(level)}
            <span>{label} </span>
            </a>
          </div>
        
        );
        
      }
  return (
   <p className={`${baseStyles} ${badgeColor} ${className}`}>
    {label}
   </p>
  )
}

export default Badge;