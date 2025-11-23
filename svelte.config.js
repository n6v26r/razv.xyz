import { join, dirname } from "path"
import { fileURLToPath } from "url";
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
// import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import remarkFootnotes from 'remark-footnotes';
import remarkMath from 'remark-math';
import rehypeKatexSvelte from 'rehype-katex-svelte';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({
		layout: {
			blog: join(__dirname, "src/routes/blog/BlogLayout.svelte")
		},
		extensions: ['.svx', '.md'],
		remarkPlugins: [remarkMath, remarkFootnotes],
		rehypePlugins: [rehypeKatexSvelte],
	})],
	kit: { // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
		}),
	},
	extensions: ['.svelte', '.svx', '.md'],
	compilerOptions: {
		warningFilter: (warning) =>
			warning.code !== "script_context_deprecated",
	}
};

export default config;
