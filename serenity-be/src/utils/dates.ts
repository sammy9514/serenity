const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const nightsBetween = (checkIn: Date, checkOut: Date): number =>
  Math.round((checkOut.getTime() - checkIn.getTime()) / MS_PER_DAY);

export const rangesOverlap = (
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
): boolean => {
  return aStart < bEnd && bStart < aEnd;
};
