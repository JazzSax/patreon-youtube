import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const getPostQuery = defineQuery(`*[_type == "post" && _id == $id][0] {
    ...,
    "relatedPosts": relatedPosts[]->{
      _id,
      title,
      coverImage,
      tierAccess,
      tags[]->{
        _id,
        title
      }
    },
    "comments" : *[_type == "comment" && post._ref == ^._id] | order(createdAt desc),
    tags[]->{
        _id,
        title
    }
}`);

export async function getPost(id: string) {
  const { data } = await sanityFetch({
    query: getPostQuery,
    params: { id },
  });
  return data;
}
