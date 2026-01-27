[![npm (scoped with tag)](https://img.shields.io/npm/v/antd-persian-date/latest.svg?style=flat-square)](https://npmjs.com/package/antd-persian-date)
[![npm](https://img.shields.io/npm/dt/antd-persian-date.svg?style=flat-square)](https://npmjs.com/package/antd-persian-date)

# Ant-Design Jalali DatePicker

A wrapper for ant-design date picker and calendar to support Jalali calendar type with [Day.js](https://github.com/iamkun/dayjs) and [jalaliday](https://github.com/sssajjad007/jalali-plugin-dayjs)

## Installation

```
npm i antd-persian-date
```

## Usage

```ts
import React from "react";
import ReactDOM from "react-dom";
import { DatePicker, ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, Calendar, JalaliLocaleListener } from "antd-persian-date";
import fa_IR from "antd/lib/locale/fa_IR";
import en_US from "antd/lib/locale/en_US";
import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
  <div className="App">
    Gregorian: <DatePicker />
    <br />
    <br />
    <ConfigProvider locale={fa_IR} direction="rtl">
      <JalaliLocaleListener />
      Jalali: <DatePickerJalali />
      Jalali RangePicker: <DatePickerJalali.RangePicker />
      <br />
      <br />
      <Calendar />
    </ConfigProvider>
  </div>,
  document.getElementById("root")
);
```

### How to set value

You should pass dayjs object with [jalali calendar](https://github.com/sssajjad007/jalali-plugin-dayjs)

```jsx
import dayjs from 'dayjs'
import { DatePicker as DatePickerJalali, Calendar as CalendarJalali, useJalaliLocaleListener } from "antd-persian-date";

// You should call this hook in child component of <ConfigProvider>
// You can also use component helper for this hook <JalaliLocaleListener>
useJalaliLocaleListener();

// If you want to all new instanses of dayjs use jalali calendar (no matter what is the locale),
// you can set default calendar for dayjs and remove useJalaliLocaleListener hook.
dayjs.calendar('jalali');

const date = dayjs("1403-01-01", {jalali:true});

<DatePickerJalali defaultValue={date}/>
<CalendarJalali  value={date}/>
```

also you can create a jalali date without changing default calendar

```js
const date = dayjs();
const jalaliDate = date.calendar("jalali");
```

You can read more information about daysjs jalali on [jalaliday repo](https://github.com/sssajjad007/jalali-plugin-dayjs).
