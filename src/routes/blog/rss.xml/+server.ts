import { GetPosts, type PostModule } from "$lib/post";
import {parseDate} from "$lib/parsedate"
export const prerender = true;

export async function GET() {
  let posts: PostModule[] = await GetPosts();
  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Razv's blog</title>
  <link>https://razv.xyz/blog</link>
  <description>Just my thoughts</description>
  ${posts.map(post => `
    <item>
      <title>${post.metadata.title}</title>
      <link>https://razv.xyz/blog/${post.slug}</link>
      <pubDate>${parseDate(post.metadata.date).toDateString()}</pubDate>
      <description>${post.metadata.desc}</description>
      ${post.metadata.tags?.map((tag: string) => `<category>${tag}</category>`).join('')}    </item>`).join('')}
</channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

