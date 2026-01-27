export * from "./date-picker";
export * from "./calendar";
export * from "./time-picker";

import * as React from "react";
import { CalendarType } from "antd/es/calendar";
import { DatePickerType } from "antd/es/date-picker";
import "dayjs";
import { TimePickerProps, TimeRangePickerProps } from "antd";

// Dayjs Jalali support
declare module "dayjs" {
  interface ConfigTypeMap {
    jalali?: boolean;
  }
}

// TypeScript definitions for antd-persian-date
declare module "antd-persian-date" {
  export const DatePicker: React.FC<DatePickerType>;
  export const Calendar: React.FC<CalendarType>;
  export const TimePicker: React.FC<TimePickerProps | TimeRangePickerProps>;
}
