import { parseDate } from "./parsedate";

export type PostModule = {
  metadata: {
    title: string;
    date: string;
    desc: string;
    tags?: string[];
    banner: boolean;
  };
  slug: string;
};

function getTime(date:string) {
  let time = parseDate(date).getTime();
  if(isNaN(time))
    return 0;
  return time;
}

export async function GetPosts() {
  const postFiles = import.meta.glob<PostModule>('/src/routes/blog/*/+page.{svx,md}');
  const iterablePostFiles = Object.entries(postFiles);

  const posts: PostModule[] = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const slugMatch = path.match(/\/blog\/(.*?)\/\+page\.(svx|md)$/);
      const slug = slugMatch ? slugMatch[1] : '';

      return { metadata, slug };
    })
  );

  posts.sort((a, b) => getTime(b.metadata.date) - getTime(a.metadata.date));

  return posts;
}
