import type { ChangeEvent, Dispatch, SetStateAction } from "react";

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
  datePickerStartYear?: number;
  lang?: "fa" | "en";
  setGetDate: Dispatch<SetStateAction<string>>;
  setTime: Dispatch<SetStateAction<string>>;
};

type TSwitchEvent = ChangeEvent<HTMLInputElement>;

export type { TYearsData, TMonthsData, TDayData, TDatePickerProps, TSwitchEvent };
