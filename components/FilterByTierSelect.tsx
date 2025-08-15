"use client"
import { useRouter } from "next/navigation";
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tierMap,membershipMap } from "@/types/types";

function FilterByTierSelect() {
    const router = useRouter();
    const handleValueChange = (value: string ) =>{
        if(value==="all"){
            router.push("/");
        }else{
            router.push(`/?tier=${value}`)
        }
    } 
  return (
    <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter posts by tier" />

        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {Object.entries(tierMap).map(([tier,level]) => (
                <SelectItem key={tier} value={tier}>
                    {membershipMap[level]}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default FilterByTierSelect