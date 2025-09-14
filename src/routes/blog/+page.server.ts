import { GetPosts, type PostModule} from "$lib/post"

export async function load() {
  let posts:PostModule[] = await GetPosts();
  return { posts }
}
