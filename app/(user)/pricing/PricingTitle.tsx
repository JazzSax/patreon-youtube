'use client'
import { Heart } from 'lucide-react';
import useMembershipTier from '@/hooks/useMembershipTier';

function PricingTitle() {
    const membershipTier = useMembershipTier();
    const isPremium = membershipTier && membershipTier > 1;

  return (
   <div className="text-center mb-12">
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl flex items-center justify-center gap-4">
        {isPremium ? 'Thank you for supporting!' : 'Support my work'}
        <Heart className="w-8 h-8 fill-red-500 text-red-500"/>
       
    </h1>
    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        {isPremium ? 'Your support helps me create more content and improve the platform.' : 'By becoming a supporter, you gain access to exclusive content and features.'}
    </p>
   </div>
  )
}

export default PricingTitle