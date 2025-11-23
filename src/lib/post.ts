import { parseDate } from "./parsedate";

export type PostData = {
  metadata: {
    title: string;
    date: string;
    desc: string;
    tags?: string[];
    banner: boolean;
  };
  slug: string;
};

export type MicroPostData = {
  metadata: {
    date: string;
    tags?: string[];
  };
  slug: string;
};

function getTime(date: string) {
  let time = parseDate(date).getTime();
  if (isNaN(time))
    return 0;
  return time;
}


export async function GetPosts() {
  const postFiles = import.meta.glob<PostData>('/src/routes/blog/*/+page.{svx,md}');
  const iterablePostFiles = Object.entries(postFiles);

  const posts: PostData[] = await Promise.all(
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

export async function GetMicroPosts() {
  const postFiles = import.meta.glob<MicroPostData>('/src/routes/microblog/posts/*.{svx,md}');
  const iterablePostFiles = Object.entries(postFiles);
  console.log(iterablePostFiles);

  const posts: MicroPostData[] = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const slugMatch = path.match(/\/microblog\/posts\/(.*?)\.(svx|md)$/);
      const slug = slugMatch ? slugMatch[1] : '';

      return { metadata, slug };
    })
  );

  posts.sort((a, b) => getTime(b.metadata.date) - getTime(a.metadata.date));

  return posts;
}
