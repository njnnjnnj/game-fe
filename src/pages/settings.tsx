import { GetServerSideProps } from "next";

import { parse } from "cookie";

import { Settings } from "@/components/pages";

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

const settings = () => <Settings />;

export default settings;
