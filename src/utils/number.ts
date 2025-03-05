export const formatNumber = (num: number | string | undefined): string => {
  if (!num) return "";

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
