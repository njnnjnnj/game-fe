import { GetStaticProps } from "next";

import { TopPlayers } from "@/components/pages";

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      messages: (await import(`../../public/messages/${locale}.json`)).default,
    },
  };
};

export const TopPlayersPage = () => <TopPlayers />;

export default TopPlayersPage;
