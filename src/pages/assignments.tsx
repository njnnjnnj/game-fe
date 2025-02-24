import { GetStaticProps } from "next";

import { Assignments } from "@/components/pages";

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      messages: (await import(`../../public/messages/${locale}.json`)).default,
    },
  };
};

export const assignments = () => <Assignments />;

export default assignments;
