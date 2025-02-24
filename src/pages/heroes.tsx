import React from "react";

import { GetStaticProps } from "next";

import { Heroes } from "@/components/pages";

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      messages: (await import(`../../public/messages/${locale}.json`)).default,
    },
  };
};

const HeroesPage = () => <Heroes />;

export default HeroesPage;
