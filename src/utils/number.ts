export const formatNumber = (num: number | string | undefined): string => {
  if (!num) return "";

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function getRandomZeroOrOne() {
  return Math.floor(Math.random() * 2); // Generates either 0 or 1
}
