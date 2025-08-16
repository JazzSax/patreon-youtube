'use client';

import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import useMembershipTier from '@/hooks/useMembershipTier';
import { getTierFromLevel } from '@/types/types';
import { Button } from './ui/button';
import Link from 'next/link';
import { MessageCircleIcon,LockIcon } from 'lucide-react';
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from './ui/tooltip';



function DMButton() {
    const { user } = useUser();
    const membershiTier = useMembershipTier();
    const pathname = usePathname();
    if(pathname.includes("/message")) return null;

    if(!user || !membershiTier) return null;

    const tier = getTierFromLevel(membershiTier);
    if(tier === 'vip'){
        return (
            <Button className="flex items-center gap-2 transition-all hover:bg-primary/90" asChild>
                <Link href="/message">
                    <MessageCircleIcon className="w-4 h-4"/>
                    <span > Send Message to creator</span>
                
                </Link>
            </Button>
        )
    }
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <div className="flex bg-gray-100 px-4 py-2 rounded-md items-center gap-2 border-dashed cursor-not-allowed opacity-70">
                    <LockIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Send Message to Creator</span>
                </div>
            </TooltipTrigger>
            <TooltipContent className="p-4">
                <p className="text-sm mb-2"> Upgrade to VIP to message the creator </p>
                <Button size="sm" className="w-full text-xs" variant="secondary" asChild>
                    <Link href="/pricing">Upgrade Now</Link>
                </Button>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default DMButton