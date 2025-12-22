export const config = {
  runtime: 'edge',
};

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USER = process.env.LASTFM_USER;

export default async function handler(_: Request) {
  if (!LASTFM_API_KEY || !LASTFM_USER) {
    return new Response(JSON.stringify({ error: 'Missing Last.fm credentials' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = new URL('https://ws.audioscrobbler.com/2.0/');
    url.searchParams.set('method', 'user.getrecenttracks');
    url.searchParams.set('user', LASTFM_USER);
    url.searchParams.set('api_key', LASTFM_API_KEY);
    url.searchParams.set('format', 'json');
    url.searchParams.set('limit', '1');

    const response = await fetch(url.toString());
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch Last.fm' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    const track = data?.recenttracks?.track?.[0];

    if (!track) {
      return new Response(JSON.stringify({ playing: false, track: null }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const isNowPlaying = track['@attr']?.nowplaying === 'true';

    return new Response(
      JSON.stringify({
        playing: isNowPlaying,
        track: isNowPlaying
          ? {
            name: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            url: track.url,
            image: track.image?.find((img: any) => img.size === 'large')?.['#text'] ?? null
          }
          : null
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
