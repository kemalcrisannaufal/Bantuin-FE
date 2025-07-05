import Head from "next/head";

interface Proptypes {
  title: string;
}

const PageHead = (props: Proptypes) => {
  const { title } = props;
  return (
    <Head>
      <link rel="icon" href="/images/general/logo.png" />
      <title>{title}</title>
    </Head>
  );
};

export default PageHead;
