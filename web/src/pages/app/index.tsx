import React from "react";
import {
  Claims,
  getSession,
  useUser,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import Link from "next/link";
import { withApollo } from "../../lib/withApollo";
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from "../../graphql/generated/page";
import { useMeQuery } from "../../graphql/generated/graphql";

function Home({ data }) {
  const { user } = useUser();
  const { data: me } = useMeQuery();

  return (
    <div className="text-violet-500">
      <h1>Home</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // return getServerPageGetProducts({}, ctx);
    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
