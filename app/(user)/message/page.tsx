"use client";

import { useSchematicIsPending } from "@schematichq/schematic-react";
import { useTransition } from "react";
import useMembershipTier from "@/hooks/useMembershipTier";
import { useUser } from "@clerk/nextjs";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { useState } from "react";
import { getTierFromLevel } from "@/types/types";
import { Loader2,LockIcon,SendIcon,MessageCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sendMessage } from "@/action/sendMessage";
import { Textarea } from "@/components/ui/textarea";


function MessagePage() {
    const { user, isLoaded } = useUser();
    const membershipTier = useMembershipTier();
    const[ message,setMessage ] = useState("");
    const [ isSending, startTransition ] = useTransition();
    const schematicIsPending = useSchematicIsPending();
    const { featureUsageExceeded } = useSchematicEntitlement("send-message");

    const tier = membershipTier ? getTierFromLevel(membershipTier) : null;
    const isVip = tier === "vip";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
            try {
                const toastId= toast.loading("Sending message...");
                const result = await sendMessage(message);
                if(result.success) {
                    setMessage("");
                    const { usage, allocation } = result;
                    
                    toast.success(`Message sent successfully! ${usage} ${allocation}`, { id: toastId });
                   
                } else {
                    toast.error("Failed to send message. Please try again.", { id: toastId });
                }
            } catch (error) {
                console.error("Error sending message:", error);
                
            }}
    )}

    if(!isLoaded || !membershipTier) {
        return <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-t from-gray-50 to-white flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin"/>
           
           </div>;
    }

    if(!user){
        return (
            <div className="min-h-[calc(100vh-4rem)] bg-gradient from-gray-50 to-white flex items-center justify-center">
                <div className="text-center px-4">
                    <h1 className="text-2xl font-bold mb-2">Please Sign in</h1>
                    <p className="text-gray-600 mb-4"> You need to be signed in to access this feature</p>
                </div>
            </div>
        )
    }

    if(!isVip ) {
        return (
            <div className="min-h-[calc(100vh-4rem)] bg-gradient from-gray-50 to-white flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <LockIcon className="w-8 h-8 text-gray-500" />

                    </div>
                    <h1 className="text-2xl font-bold mb-2"> VIP access required</h1>
                    <p className="text-gray-600 mb-6">
                        Direct messaging to the creator is a premium feature available exclusively to VIP members
                    </p>
                    <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                        <Link href="/pricing" > Upgrade to VIP</Link>
                    </Button>
                </div>
            </div>
        );

    }
  return (
     <div className="min-h-[calc(100vh-4rem)] bg-gradient from-gray-50 to-white ">
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-500 to-purple-600">
                    <div className="flex items-center gap-3 text-white mb-2">
                        <MessageCircleIcon className="w-6 h-6"/>
                        <h1 className="text-2xl font-bold">Direct Message to Creator</h1>
                    </div>
                    <p className="text-indigo-100">
                        As a VIP member, you can send direct messages to the creator. Please be respectful and concise in your messages.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                        <Textarea
                            id="message"
                            value={message}
                            disabled={isSending || featureUsageExceeded}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey && e.ctrlKey && e.altKey && e.metaKey) {
                                    if(featureUsageExceeded) {
                                        toast.error("Feature usage exceeded. Please try again later.");
                                        e.preventDefault();
                                        return;
                                    }
                                    e.preventDefault();
                                    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                                }
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Type your message here..."
                            required
                        />
                    </div>
                    <div className="pt-4">
                        <Button type="submit" disabled={isSending || schematicIsPending || featureUsageExceeded} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                          {isSending ? (
                            <>Sending...</>
                            ) : (
                                featureUsageExceeded ? (
                                    <>Feature usage exceeded</>
                                ) : (
                                    <>Send Message
                                     <SendIcon className="ms-2 w-4 h-4" />
                                     </>
                                   
                                )
                          )}
                        </Button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default MessagePage