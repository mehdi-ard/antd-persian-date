import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { useContext, useMemo } from "react";
import calendarJalali from "../libs/jalali";

// Extend once at module level
dayjs.extend(calendarJalali);
/**
 * Subscribes to the ConfigProvider locale changes and updates the dayjs calendar based on current locale.
 */

export const useJalaliLocaleListener = () => {
  const { locale } = useContext(ConfigProvider.ConfigContext);
  useMemo(() => {
    const isJalali = locale?.locale === "fa";
    dayjs.calendar(isJalali ? "jalali" : "gregory");
    dayjs.locale(isJalali ? "fa" : "en");
  }, [locale?.locale]);
};
