export const formatNumber = (num?: number | string): string => {
  if (typeof num !== "number" && !num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function getRandomZeroOrOne() {
  return Math.floor(Math.random() * 2);
}
