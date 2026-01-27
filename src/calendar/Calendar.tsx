import { Dayjs } from "dayjs";
import { generateJalaliConfig } from "../jalali";
import generateCalendar from "antd/es/calendar/generateCalendar";

export const Calendar = generateCalendar<Dayjs>(generateJalaliConfig);
