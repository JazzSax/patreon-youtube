import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";

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
       <Header/>
       <html lang="en">
       
      <body >
       {children}
      </body>
      <SanityLive/>
    </html>
    </ClerkProvider>
   
  );
}
