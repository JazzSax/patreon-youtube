import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { unstable_cache } from "next/cache";

const getPostsQuery = defineQuery(`*[_type=="post"] | order(_createdAt desc) {
  ...,
  "comments": *[_type=="comment" && post._ref == ^._id] | order(createdAt desc),
  tags[]->{
    _id,
    title
  }
}`);

const getPostsQueryWithTierAndSearch = defineQuery(`
  *[_type == "post" 
    && (tierAccess == $tier || $tier == "all") 
    && title match $search
  ] | order(_createdAt desc) {
    ...,
    "comments": *[_type=="comment" && post._ref == ^._id] | order(createdAt desc),
    tags[]->{
      _id,
      title
    }
  }
`);

// Wrap the function with unstable_cache
export const getPosts = unstable_cache(
  async (tier?: string, search?: string) => {
    // Build search query
    const searchTerm = search && search.length > 0 ? `${search}*` : "";

    if ((tier && tier !== "all") || searchTerm) {
      const { data } = await sanityFetch({
        query: getPostsQueryWithTierAndSearch,
        params: { tier: tier || "all", search: searchTerm || "*" },
      });
      return data;
    }

    const { data } = await sanityFetch({
      query: getPostsQuery,
    });
    return data;
  },
  ["posts"],
  {
    tags: ["posts"], // lets you revalidateTag("posts")
  }
);
