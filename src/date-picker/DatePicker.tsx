import { Dayjs } from "dayjs";
import { generateJalaliConfig } from "../jalali";
import generatePicker from "antd/es/date-picker/generatePicker";

export const DatePicker: any = generatePicker<Dayjs>(generateJalaliConfig);
