import React from 'react';
import {
  Claims,
  getSession,
  useUser,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import Link from 'next/link';

interface HomeProps {
  user: Claims;
  accessToken: string;
}

export default function Home({ user, accessToken }: HomeProps) {
  console.log(accessToken);
  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ctx => {
    const { accessToken, user } = getSession(ctx.req, ctx.res);
    return { props: { accessToken, user } };
  },
});
