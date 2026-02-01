import "dayjs";
import type dayjsType from "dayjs";

// ============================================
// Type Definitions
// ============================================

export type CalendarType = "gregory" | "jalali";
export type DayjsInstance = JalaliDayjs;
export type DayjsStatic = typeof dayjsType;

export interface JalaliDayjs {
  // ---- internal fields ----
  $C: CalendarType;
  $y: number;
  $M: number;
  $D: number;
  $W: number;
  $d: Date;
  $H: number;
  $m: number;
  $s: number;
  $ms: number;

  // ---- jalali fields ----
  $jy: number;
  $jM: number;
  $jD: number;

  // ---- internal flags ----
  $L?: string; // locale
  $u?: boolean; // UTC flag

  prototype: DayjsProto;

  fdow: number;
  calendar(calendar: CalendarType): JalaliDayjs;
  clone(): JalaliDayjs;
  toDate(): Date;
  isJalali(): boolean;
  InitJalali(): void;
  endOf(unit: string): JalaliDayjs;
  startOf(unit: string, startOf?: boolean): JalaliDayjs;
  add(value: number, unit?: string): JalaliDayjs;
  subtract(value: number, unit?: string): JalaliDayjs;
  set(unit: string, value: number): JalaliDayjs;
  $set(unit: string, value: number): JalaliDayjs;
  $g(input: any, get: string, set: string): any;
  daysInMonth(): number;
  format(format?: string, locale?: any): string;
  diff(input: any, unit?: string, float?: boolean): number;
  parse(cfg: any): JalaliDayjs;
  init(cfg?: any): void;
  calendar(calendar: CalendarType): JalaliDayjs;
  toArray?(): number[];
  year(input?: number): number | JalaliDayjs;
  month(input?: number): number | JalaliDayjs;
  date(input?: number): number | JalaliDayjs;
}

export type DayjsProto = {
  $utils(): {
    prettyUnit?: (u: string) => string;
    p?: (u: string) => string;
    isUndefined?: (v: any) => boolean;
    u?: (v: any) => boolean;
    padStart?: (s: string, n: number, c?: string) => string;
    s?: (s: string, n: number, c?: string) => string;
    monthDiff?: (a: any, b: any) => number;
    m?: (a: any, b: any) => number;
    absFloor?: (n: number) => number;
    a?: (n: number) => number;
  };
};
