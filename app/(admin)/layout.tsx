import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Patreon Youtube build Clerk",
  description: "Patreon Youtube Build Clerk - Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
       <html lang="en">
        
      <body >
       {children}
      </body>
    </html>
  
   
  );
}
