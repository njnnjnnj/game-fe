import { GetServerSideProps } from "next";

import { parse } from "cookie";

import { TopPlayers } from "@/components/pages";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale, req } = context;

  const cookies = parse(req.headers.cookie || "");

  const cookieLocale = cookies["NEXT_LOCALE"];

  return {
    props: {
      messages: (
        await import(`../../public/messages/${cookieLocale ?? locale}.json`)
      ).default,
    },
  };
};

export const TopPlayersPage = () => <TopPlayers />;

export default TopPlayersPage;
