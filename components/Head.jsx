import Head from "next/head";

export function PageHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Freelance creative web developer working with NextJS, React and dabbling lately in GSAP."
      />
    </Head>
  );
}
