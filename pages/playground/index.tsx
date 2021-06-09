import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

const PlaygroundHome: React.FC = () => {
  return (
    <div className="container">
      <Head>
        <title>Playground</title>
        <meta name="Playground" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>This page is currently not available .</h2>
      <Link href="/">
        <a>Go Back</a>
      </Link>
    </div>
  );
};

export default PlaygroundHome;
