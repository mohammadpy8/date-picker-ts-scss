"use client";

import { useEffect, useRef, useState } from "react";
import { collectionDaysOfMonths, mounthListCollection } from "./DatePicker.constant";

import styles from "./DatePicker.module.scss";
import type { TDayData, TMonthsData, TYearsData, TDatePickerProps } from "./DatePicker.type";

import { useOutsideClickDatePicker } from "./DatePicker.hook";

function DatePicker({
  setGetDate = () => {},
  setTime = () => {},
  datePickerStartYear = 1340,
}: TDatePickerProps) {
  const [openListMonth, setOpenListMonth] = useState<boolean>(false);
  const [openListYear, setOpenListYear] = useState<boolean>(false);
  const [openListDay, setOpenListDay] = useState<boolean>(false);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [idMonth, setIdMonth] = useState<number>(0);
  const [idYear, setIdYear] = useState<number>(0);
  const [idDay, setIdDay] = useState<number>(0);
  const [days, setDays] = useState<TDayData>([]);
  const [months, setMonths] = useState<TMonthsData>([]);
  const [years, setYears] = useState<TYearsData>([]);

  const dayRef = useRef<HTMLUListElement | null>(null);
  const monthRef = useRef<HTMLUListElement | null>(null);
  const yearRef = useRef<HTMLUListElement | null>(null);
  const datePickerShowRef = useRef<HTMLDivElement | null>(null);

  const convertFaToEn = (s: any) => s.replace(/[۰-۹]/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const convertEnToFa = (s: any) => s.replace(/\d/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  const persianDate = () => {
    const date = new Date().toLocaleDateString("fa").split("/");
    const createCurrentMonth = convertFaToEn(String(date[1]));
    const findNameMonth = mounthListCollection.filter((item) => item.value === +createCurrentMonth);
    return [date[0], findNameMonth[0].label, date[2]];
  };

  const generateYear = (): TYearsData => {
    let years = [];
    let startYear = datePickerStartYear;
    let findYear = new Date().toLocaleDateString("fa").split("/")[0];
    const endYear = convertFaToEn(findYear);
    for (let i = startYear; i <= Number(endYear); i++) {
      if (i >= startYear) {
        years.push({
          id: i,
          year: convertEnToFa(String(i)),
        });
      }
    }
    return years;
  };

  const handleLeapYear = (valueDay: number, nameMonth: string): number => {
    if (years[0]?.id % 4 === 0 && nameMonth === "اسفند") return valueDay + 1;
    else return valueDay;
  };

  const generateDays = () => {
    let days = [];
    const getMonth = months[0]?.label;
    const filterDays = collectionDaysOfMonths.filter((itemDay) => itemDay.months.includes(getMonth));
    if (filterDays) {
      for (let i = 1; i <= handleLeapYear(filterDays[0]?.days, months[0]?.label); i++) {
        days.push({
          id: i,
          day: convertEnToFa(String(i)),
        });
      }
    }
    return days;
  };

  const yearsData = generateYear();
  const daysData = generateDays();
  const [date_year, date_month, date_day] = persianDate();

  const everyDayDate = () => {
    const date = new Date().toLocaleDateString("fa").split("/");
    const year = date[0];
    const changeMonth = convertFaToEn(date[1]);
    const handleMonth = +changeMonth < 10 ? "0" + String(changeMonth) : changeMonth;
    const month = convertEnToFa(handleMonth);
    const changeDay = convertFaToEn(date[2]);
    const handleDay = +changeDay < 10 ? "0" + String(changeDay) : changeDay;
    const day = convertEnToFa(handleDay);
    return year + "/" + month + "/" + day;
  };

  const getTodayDate = everyDayDate();

  useEffect(() => {
    setDays([{ id: +convertFaToEn(String(date_day)), day: date_day }]);
    setMonths([
      { value: mounthListCollection.filter((item) => item.label === date_month)[0].value, label: date_month },
    ]);
    setYears([{ id: +convertFaToEn(date_year), year: date_year }]);
    setIdMonth(mounthListCollection.filter((item) => item.label === date_month)[0].value);
    setIdYear(+convertFaToEn(date_year));
    setIdDay(+convertFaToEn(String(date_day)));
    setTime(getTodayDate);
  }, []);

  const becomeDate = () => {
    if (months.length > 0 && years.length > 0) {
      const year = years[0].year;
      const month = months[0].value;
      const day = days[0].day;
      const date = `${year}/${
        month < 10 ? convertEnToFa(String("0" + month)) : convertEnToFa(String(month))
      }/${convertFaToEn(day) < 10 ? convertEnToFa(String("0" + day)) : day}`;
      return date;
    }
    return "تاریخ امروز";
  };

  const handleDayShow = () => {
    const findDay = daysData.filter((dayCol) => dayCol?.day === days[0].day);
    if (findDay.length > 0) return days[0].day;
    else return "انتخاب";
  };

  const showDay = handleDayShow();
  const currentDate = becomeDate();

  useEffect(() => {
    setGetDate(currentDate);
  }, [days, months, years, date_day, date_month, date_year]);

  useOutsideClickDatePicker(dayRef, "day-layout", () => setOpenListDay(false));
  useOutsideClickDatePicker(monthRef, "month-layout", () => setOpenListMonth(false));
  useOutsideClickDatePicker(yearRef, "year-layout", () => setOpenListYear(false));
  useOutsideClickDatePicker(datePickerShowRef, "date-picker-layout", () => setOpenDatePicker(false));

  return (
    <div className={styles.datePicker}>
      <div className={styles.datePickerContainer}>
        <div className={styles.datePickerItems}>
          <div className={styles.datePickerBox} onClick={() => setOpenDatePicker(true)}>
            <div className={styles.datePickerItem}>
              <span>{`ماه/${months[0]?.label}`}</span>
            </div>
            <div className={styles.datePickerItem}>
              <span>{`سال/${years[0]?.year}`}</span>
            </div>
            <div className={styles.datePickerItem}>
              <span>{`روز/${showDay}`}</span>
            </div>
          </div>
          <div className={styles.infoDatePicker}>
            <div>
              <span>تاریخ انتخاب شده :{currentDate}</span>
            </div>
            <div>
              <span>تاریخ امروز:{getTodayDate}</span>
            </div>
          </div>
        </div>
      </div>
      {openDatePicker && (
        <div className={styles.dateBoxItems} ref={datePickerShowRef} id="date-picker-layout">
          <div>
            <ul className={styles.dateShowBox} ref={monthRef} id="month-layout">
              {mounthListCollection.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={idMonth === item.value ? styles.activeMonth : ""}
                    onClick={() => {
                      setIdMonth(item.value);
                      setMonths(mounthListCollection.filter((monthCol) => monthCol.value === item.value));
                    }}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <ul className={styles.dateShowBox} ref={yearRef} id="year-layout">
              {yearsData.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={idYear === item.id ? styles.activeMonth : ""}
                    onClick={() => {
                      setIdYear(item.id);
                      setYears(yearsData.filter((yearCol) => yearCol.id === item.id));
                    }}
                  >
                    {item.year}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <ul className={styles.dateShowBox} ref={dayRef} id="day-layout">
              {daysData.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={idDay === item.id ? styles.activeMonth : ""}
                    onClick={() => {
                      setIdDay(item.id);
                      setDays(daysData.filter((dayCol) => dayCol.id === item.id));
                    }}
                  >
                    {item.day}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export { DatePicker };
