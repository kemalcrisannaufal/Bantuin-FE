import Head from "next/head";

interface Proptypes {
  title: string;
}

const PageHead = (props: Proptypes) => {
  const { title } = props;
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default PageHead;
