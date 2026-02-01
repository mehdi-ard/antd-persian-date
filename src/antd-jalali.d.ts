export * from "./calendar";
export * from "./date-picker";
export * from "./time-picker";

import { TimePickerProps, TimeRangePickerProps } from "antd";
import { CalendarType } from "antd/es/calendar";
import { DatePickerType } from "antd/es/date-picker";
import "dayjs";
import { PluginFunc } from "dayjs";
import * as React from "react";

// TypeScript definitions for antd-persian-date
declare module "antd-persian-date" {
  export const DatePicker: React.FC<DatePickerType>;
  export const Calendar: React.FC<CalendarType>;
  export const TimePicker: React.FC<TimePickerProps | TimeRangePickerProps>;
}

declare const plugin: PluginFunc;
export = plugin;

type CalendarType = "jalali" | "gregory";

declare module "dayjs" {
  export function calendar(calendarType: CalendarType): Dayjs;

  export function isJalali(): boolean;

  export interface FormatObject {
    jalali?: boolean;
  }

  interface Dayjs {
    calendar(calendarType: CalendarType): Dayjs;
  }
}
