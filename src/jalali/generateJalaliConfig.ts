import dayjs, { Dayjs } from "dayjs";
import jalaliday from "jalaliday";
import { noteOnce } from "rc-util/lib/warning";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { default as faLocale } from "./locale";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(jalaliday);

dayjs.locale(faLocale, undefined, true);

dayjs.extend((o, c) => {
  // todo support Wo (ISO week)
  const proto = c.prototype;
  const oldFormat = proto.format;
  proto.format = function f(formatStr: string) {
    const str = (formatStr || "").replace("Wo", "wo");
    return oldFormat.bind(this)(str);
  };
});

type LocaleKey = "en_GB" | "en_US" | "zh_CN" | "zh_TW" | "fa_IR";
const localeMap: Record<LocaleKey, string> = {
  en_GB: "en-gb",
  en_US: "en",
  zh_CN: "zh-cn",
  zh_TW: "zh-tw",
  fa_IR: "fa",
};

const parseLocale = (locale: string): string => {
  const mapLocale = localeMap[locale];
  return mapLocale || locale.split("_")[0];
};

const parseNoMatchNotice = () => {
  /* istanbul ignore next */
  noteOnce(
    false,
    "Not match any format. Please help to fire a issue about this.",
  );
};

export const generateJalaliConfig = {
  // get
  getNow: () => dayjs(),
  getFixedDate: (string: string) => dayjs(string, "YYYY-MM-DD"),
  getEndDate: (date: Dayjs) => date.endOf("month"),
  getWeekDay: (date?: Dayjs) => {
    const safeDate = date ?? dayjs();
    const clone = safeDate.locale("en");
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  },

  getYear: (date: Dayjs) => date.year(),
  getMonth: (date: Dayjs) => date.month(),
  getDate: (date: Dayjs) => date.date(),
  getHour: (date: Dayjs) => date.hour(),
  getMinute: (date: Dayjs) => date.minute(),
  getSecond: (date: Dayjs) => date.second(),

  // set
  addYear: (date: Dayjs, diff: number) => date.add(diff, "year"),
  addMonth: (date: Dayjs, diff: number) => date.add(diff, "month"),
  addDate: (date: Dayjs, diff: number) => date.add(diff, "day"),
  setYear: (date: Dayjs, year: number) => date.year(year),
  setMonth: (date: Dayjs, month: number) => date.month(month),
  setDate: (date: Dayjs, num: number) => date.date(num),
  setHour: (date: Dayjs, hour: number) => date.hour(hour),
  setMinute: (date: Dayjs, minute: number) => date.minute(minute),
  setSecond: (date: Dayjs, second: number) => date.second(second),

  getMillisecond: (date: Dayjs) => date.millisecond(),
  setMillisecond: (date: Dayjs, second: number) => date.millisecond(second),

  // Compare
  isAfter: (date1: Dayjs, date2: Dayjs) => date1.isAfter(date2),
  isValidate: (date: Dayjs) => date.isValid(),
  locale: {
    getWeekFirstDate: (locale: string, date: Dayjs) =>
      date.locale(parseLocale(locale)).weekday(0),
    getWeekFirstDay: (locale: string) =>
      dayjs().locale(parseLocale(locale)).localeData().firstDayOfWeek(),
    getWeek: (locale: string, date: Dayjs) =>
      date.locale(parseLocale(locale)).week(),
    getShortWeekDays: (locale: string) =>
      dayjs().locale(parseLocale(locale)).localeData().weekdaysMin(),
    getShortMonths: (locale: string) =>
      dayjs().locale(parseLocale(locale)).localeData().monthsShort(),
    format: (locale: string, date: Dayjs, format: string) => {
      return date.locale(parseLocale(locale)).format(format);
    },
    parse: (locale: string, text: string, formats: string[]): Dayjs | null => {
      if (text.length !== 10) return null;

      const localeStr = parseLocale(locale);

      for (let i = 0; i < formats.length; i += 1) {
        const format = formats[i];

        if (format.includes("wo") || format.includes("Wo")) {
          const parts = text.split("-");
          if (parts.length !== 2) break;
          const [year, weekStr] = parts;
          const firstWeek = dayjs(year, "YYYY")
            .startOf("year")
            .locale(localeStr);

          for (let j = 0; j <= 52; j += 1) {
            const nextWeek = firstWeek.add(j, "week");
            if (nextWeek.format("Wo") === weekStr) {
              return nextWeek;
            }
          }

          parseNoMatchNotice();
          return null;
        }

        const date = dayjs(text, {
          format,
          locale: localeStr,
          jalali: true,
        });

        if (date.isValid()) {
          return date;
        }
      }

      parseNoMatchNotice();
      return null;
    },
  },
};
