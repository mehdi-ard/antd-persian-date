import generateCalendar from "antd/es/calendar/generateCalendar";
import { Dayjs } from "dayjs";
import { generateJalaliConfig } from "../jalali";

export const Calendar = generateCalendar<Dayjs>(generateJalaliConfig);
