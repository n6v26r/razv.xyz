export const prerender = true;
export const trailingSlash = 'always';

export async function load({ url }) {
  let path = url.pathname;

  // if (!path.endsWith('/')) {
  //   path += '/';
  // }

  return {
    currentPath: path,
  };
}
