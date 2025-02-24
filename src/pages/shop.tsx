import React from "react";

import { GetStaticProps } from "next";

import { Shop } from "@/components/pages";

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      messages: (await import(`../../public/messages/${locale}.json`)).default,
    },
  };
};

const ShopPage = () => <Shop />;

export default ShopPage;
