import React from "react";

import { Shop } from "@/components/pages";
import { getServerSidePropsWithLocale } from "@/utils/lib/translations";

export const getServerSideProps = getServerSidePropsWithLocale;

const ShopPage = () => <Shop />;

export default ShopPage;
