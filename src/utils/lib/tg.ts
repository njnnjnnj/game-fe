export const getLinkToApp = (referalCode: string): string =>
  `${process.env.NEXT_PUBLIC_BOT_USERNAME}?startapp=${referalCode} \n
🎁 500,000 free tokens are already waiting for you in Majestic!
⭐️ I invite you to the game`;
