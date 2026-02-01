import generatePicker from "antd/es/date-picker/generatePicker";
import { Dayjs } from "dayjs";
import { generateJalaliConfig } from "../jalali";

export const DatePicker = generatePicker<Dayjs>(generateJalaliConfig);
