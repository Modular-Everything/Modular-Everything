import Head from "next/head";

export function PageHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
