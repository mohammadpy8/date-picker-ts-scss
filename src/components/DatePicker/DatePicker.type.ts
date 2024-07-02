import type { Dispatch, SetStateAction } from "react";

type TYearsData = {
  id: number;
  year: string;
}[];

type TMonthsData = {
  value: number;
  label: string;
}[];

type TDayData = {
  id: number;
  day: string;
}[];

type TDatePickerProps = {
  setGetDate: Dispatch<SetStateAction<string>>;
  setTime: Dispatch<SetStateAction<string>>;
};

export type { TYearsData, TMonthsData, TDayData, TDatePickerProps };
