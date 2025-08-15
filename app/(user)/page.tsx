import Image from "next/image";
import HeroBanner from '@/components/HeroBanner';
import InformationPanel from '@/components/InformationPanel';
export default function Home() {
  return (
    <div >
      {/* Hero Banner */}
      <HeroBanner/>
      {/* Information Panel */}
      <InformationPanel/>
      {/* Post */}
     
    </div>
  );
}
