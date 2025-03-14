import { GetServerSideProps } from "next";

import { parse } from "cookie";

export const getServerSidePropsWithLocale: GetServerSideProps = async (
  context,
) => {
  const { locale, req } = context;

  // Parse cookies
  const cookies = parse(req.headers.cookie || "");

  // Get locale from cookies (fallback to Next.js locale)
  const cookieLocale = cookies["NEXT_LOCALE"] ?? locale;

  // Load messages for the selected locale
  const messages = (await import(`../../public/messages/${cookieLocale}.json`))
    .default;

  return {
    props: {
      messages,
      locale: cookieLocale,
    },
  };
};
