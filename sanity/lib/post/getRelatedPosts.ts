import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const getRelatedPostsQuery = defineQuery(`
  *[_type == "post" && _id == $id][0]{
    relatedPosts[]->{
      _id,
      title,
      coverImage,
      tierAccess,
      tags[]->{
        _id,
        title
      }
    }
  }.relatedPosts
`);

export async function getRelatedPosts(id: string) {
  const { data } = await sanityFetch({
    query: getRelatedPostsQuery,
    params: { id },
  });

  return data; // this will now be an array of related posts
}
