export const getLinkToApp = (referalCode: string): string =>
  `${process.env.NEXT_PUBLIC_BOT_USERNAME}?startapp=${referalCode}`;
