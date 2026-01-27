import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import jalaliday from "jalaliday";
import React, { useContext } from "react";

/**
 * Subscribes to the ConfigProvider locale changes and updates the dayjs calendar based on current locale.
 */

export const useJalaliLocaleListener = () => {
  const { locale } = useContext(ConfigProvider.ConfigContext);
  dayjs.extend(calendar);
  dayjs.extend(jalaliday);

  React.useEffect(() => {
    if (locale?.locale == "fa") {
      dayjs["calendar"]?.("jalali");
    } else {
      dayjs["calendar"]?.(undefined as any);
    }
  }, [locale]);
};
