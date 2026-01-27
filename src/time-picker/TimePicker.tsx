import { Dayjs } from "dayjs";
import { TimePicker as AntdTimePicker } from "antd/lib";
import generatePicker from "antd/es/date-picker/generatePicker";
import type { PickerProps } from "antd/es/date-picker/generatePicker";

export interface TimePickerProps extends Omit<PickerProps<Dayjs>, "picker"> {}

export const TimePicker = generatePicker<TimePickerProps>(AntdTimePicker);

TimePicker.displayName = "TimePicker";
