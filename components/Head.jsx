import Head from "next/head";
import Script from "next/script";

export function PageHead({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Freelance creative web developer working with NextJS, React and dabbling lately in GSAP."
        />
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-E630JKBSCM" />
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-E630JKBSCM');`}
      </Script>
    </>
  );
}
