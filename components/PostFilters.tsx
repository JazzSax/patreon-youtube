"use client";

import { useQueryState } from "nuqs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { tierMap, membershipMap } from "@/types/types";

type Props = {
  refetchPosts: () => Promise<void>;// server action
};

export default function PostFilters({ refetchPosts }: Props) {
  // Use client-side serializer for typed defaults
  const [tier, setTier] = useQueryState("tier", {defaultValue: "all"});
  const [search, setSearch] = useQueryState("search", {defaultValue: ""});
  const handleSearch = (value:string) => {
    setSearch(value);
    setTimeout(() => {
       refetchPosts()
    },300);
   
  };
  const handleTier = (value:string) => {
    setTier(value);

    setTimeout(() => {
       refetchPosts()
    },300);
  }
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
      {/* Search bar */}
      <Input
        type="text"
        placeholder="Search posts..."
        className="w-[250px]"
       value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Tier filter */}
      <Select
      value={tier}
        onValueChange={(value) => handleTier(value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter posts by tier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {Object.entries(tierMap).map(([tierKey, level]) => (
            <SelectItem key={tierKey} value={tierKey}>
              {membershipMap[level]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
