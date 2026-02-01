import "dayjs";

declare module "dayjs" {
  interface ConfigType {}

  interface OptionType {
    /**
     * Use Jalali (Persian/Solar Hijri) calendar
     * @default false
     */
    jalali?: boolean;
  }

  interface Dayjs {
    /**
     * Get or set the calendar type
     * @param type - 'jalali' or 'gregory'
     */
    calendar(): string;
    calendar(type: "jalali" | "gregory"): Dayjs;

    /**
     * Clone the Dayjs object with the same calendar type
     */
    clone(): Dayjs;
  }

  export interface DayjsStatic {
    /**
     * Set default calendar type
     */
    calendar(type: "jalali" | "gregory"): void;
  }
}
