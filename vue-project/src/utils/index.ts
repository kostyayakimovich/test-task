import type { Post } from "@/models";

export const filterPosts = (posts:Post[]):Post[]=> posts.map((item)=>{
  item.title = `${item.id} - ${item.title}`
  return item
})