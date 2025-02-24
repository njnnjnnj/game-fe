import React from "react";

import { GetStaticProps } from "next";

import { BattlePass } from "@/components/pages";

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      messages: (await import(`../../public/messages/${locale}.json`)).default,
    },
  };
};

const BattlePassPage = () => <BattlePass />;

export default BattlePassPage;
