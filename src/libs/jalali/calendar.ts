const JULIAN_EPOCH_OFFSET = 4716;
const DAYS_PER_YEAR = 365.25;
const AVERAGE_MONTH_LENGTH = 30.6001;
const JULIAN_BASE_CORRECTION = 1524.5;
const GREGORIAN_DAYS_IN_MONTH = [
  31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
] as const;
const JALALI_DAYS_IN_MONTH = [
  31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29,
] as const;

const div = (a: number, b: number): number => Math.floor(a / b);

const isGregorianLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

function gregorianToJulian(year: number, month: number, day: number) {
  if (month < 1 || month > 12) {
    throw new RangeError(`Invalid month: ${month}. Must be between 1-12`);
  }

  if (day < 1 || day > 31) {
    throw new RangeError(`Invalid day: ${day}`);
  }

  if (year < -4712) {
    throw new RangeError(`Year ${year} is before Julian calendar epoch`);
  }

  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);

  const JD =
    Math.floor(DAYS_PER_YEAR * (year + JULIAN_EPOCH_OFFSET)) +
    Math.floor(AVERAGE_MONTH_LENGTH * (month + 1)) +
    day +
    B -
    JULIAN_BASE_CORRECTION;
  return JD;
}

function julianToGregorianInternal(jd: number): [number, number, number] {
  const adjustedJD = jd + 0.5;
  const Z = Math.floor(adjustedJD);
  const F = adjustedJD - Z;

  let A = Z;
  if (Z >= 2299161) {
    const alpha = Math.floor((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - Math.floor(alpha / 4);
  }

  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);

  const day = B - D - Math.floor(30.6001 * E) + F;
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;

  return [Math.floor(year), Math.floor(month), Math.floor(day)];
}

function julianToPersian(jd: number): [number, number, number] {
  const [year, month, day] = julianToGregorianInternal(jd);
  return gregorianToJalali(year, month, day);
}

function julianToGregorian(jd: number): [number, number, number] {
  return julianToGregorianInternal(jd);
}

function persianToJulian(jy: number, jm: number, jd: number) {
  const adjustedJY = jy - 979;
  let j_day_no =
    365 * adjustedJY + div(adjustedJY, 33) * 8 + div((adjustedJY % 33) + 3, 4);
  for (var i = 0; i < jm - 1; ++i) {
    j_day_no += JALALI_DAYS_IN_MONTH[i];
  }
  j_day_no += jd - 1;

  let g_day_no = j_day_no + 79;

  let gy = 1600 + 400 * div(g_day_no, 146097);
  g_day_no = g_day_no % 146097;

  let leap = true;
  if (g_day_no >= 36525) {
    g_day_no--;
    gy += 100 * div(g_day_no, 36524);
    g_day_no = g_day_no % 36524;

    if (g_day_no >= 365) {
      g_day_no++;
    } else {
      leap = false;
    }
  }

  gy += 4 * div(g_day_no, 1461);
  g_day_no %= 1461;

  if (g_day_no >= 366) {
    leap = false;
    g_day_no--;
    gy += div(g_day_no, 365);
    g_day_no = g_day_no % 365;
  }

  let gm = 0;
  for (let i = 0; i < 12; i++) {
    const leapDayAdjustment = i === 1 && leap ? 1 : 0;
    if (g_day_no >= GREGORIAN_DAYS_IN_MONTH[i] + leapDayAdjustment) {
      g_day_no -= GREGORIAN_DAYS_IN_MONTH[i] + leapDayAdjustment;
      gm++;
    } else {
      break;
    }
  }

  const gd = g_day_no + 1;
  return gregorianToJulian(gy, gm + 1, gd);
}

function gregorianToJalali(
  gYear: number,
  gMonth: number,
  gDay: number,
): [number, number, number] {
  let gy = gYear - 1600;
  let gm = gMonth - 1;
  let gd = gDay - 1;

  let g_day_no =
    365 * gy + div(gy + 3, 4) - div(gy + 99, 100) + div(gy + 399, 400);
  for (let i = 0; i < gm; ++i) g_day_no += GREGORIAN_DAYS_IN_MONTH[i];
  if (gm > 1 && isGregorianLeapYear(gYear)) {
    g_day_no++;
  }
  g_day_no += gd;

  let j_day_no = g_day_no - 79;

  let j_np = div(j_day_no, 12053);
  j_day_no %= 12053;

  let jy = 979 + 33 * j_np + 4 * div(j_day_no, 1461);
  j_day_no %= 1461;

  if (j_day_no >= 366) {
    jy += div(j_day_no - 1, 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  for (var j = 0; j < 11 && j_day_no >= JALALI_DAYS_IN_MONTH[j]; ++j)
    j_day_no -= JALALI_DAYS_IN_MONTH[j];
  let jm = j + 1;
  let jd = j_day_no + 1;
  return [jy, jm, jd];
}

export const jalali = {
  toJalali: (y: number, m: number, d: number): [number, number, number] =>
    julianToPersian(gregorianToJulian(y, m, d)),
  toGregorian: (y: number, m: number, d: number): [number, number, number] =>
    julianToGregorian(persianToJulian(y, m, d)),

  // Aliases for backward compatibility
  J: (y: number, m: number, d: number) =>
    julianToPersian(gregorianToJulian(y, m, d)),
  G: (y: number, m: number, d: number) =>
    julianToGregorian(persianToJulian(y, m, d)),
};
export default jalali;
