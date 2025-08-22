import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const getRelatedPostsQuery = defineQuery(`
    *[_type == "post" && _id != $id 
    && count(tags[@._ref in *[_type == "post" && _id == $id][0].tags[]._ref]) > 0
    ] {
    ...,
    tags[]->{
        _id,
        title
    }
    }

`);

export async function getRelatedPosts(id: string) {
  const { data } = await sanityFetch({
    query: getRelatedPostsQuery,
    params: { id },
  });
  return data;
}
