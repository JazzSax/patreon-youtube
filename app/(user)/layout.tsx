import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import SchematicProvider from "@/components/Schematic/SchematicProvider";
import { Toaster } from "@/components/ui/sonner";
import DMButton from "@/components/DMButton";
import { NuqsAdapter } from 'nuqs/adapters/next/app'


export const metadata: Metadata = {
  title: "Patreon Youtube build Clerk",
  description: "Patreon Youtube Build Clerk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
       
       <html lang="en">
      <SchematicProvider>
         
         <body >
                   <NuqsAdapter>
          <Header/>
 
             {children} 
       
         
          <div className="fixed bottom-4 right-4">
            <DMButton />
          </div>
          <Toaster position="bottom-center"/>
             </NuqsAdapter>
        </body>
        <SanityLive/>
      </SchematicProvider>
     
    </html>
    </ClerkProvider>
   
  );
}
