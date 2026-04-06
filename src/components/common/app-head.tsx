import Head from 'next/head';

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>PeytOtoria</title>
      <meta name='og:title' content='PeytOtoria' />
      <link rel='icon' href='/logo-penguin.svg' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <meta name='twitter:site' content='@peytotoria' />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
}
