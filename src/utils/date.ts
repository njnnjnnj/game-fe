export const getDaysAndHoursTillMonthAndDay = (month: number, day?: number) => {
  const now = new Date();
  const nowUtcTimestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
  );
  const thenUtcTimestamp = day
    ? Date.UTC(now.getUTCFullYear(), month, day)
    : Date.UTC(now.getUTCFullYear(), month);

  const diff = thenUtcTimestamp - nowUtcTimestamp;

  const daysLeft = Math.floor(diff / (1000 * 3600 * 24));
  const hoursLeft = Math.floor(diff / (1000 * 3600)) - daysLeft * 24;

  return { days: daysLeft, hours: hoursLeft };
};

export const getDaysAndHoursTillStartOfNextMonth = () =>
  getDaysAndHoursTillMonthAndDay(new Date().getUTCMonth() + 1);
