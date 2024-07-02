"use client";

import { useState, useEffect } from "react";
import { mounthListCollection, collectionDaysOfMonths } from "./DatePicker.constant";

import styles from "./DatePicker.module.scss";
import type { TYearsData, TDayData, TMonthsData } from "./DatePicker.type";

function DatePicker() {
  const [openListMonth, setOpenListMonth] = useState<boolean>(false);
  const [openListYear, setOpenListYear] = useState<boolean>(false);
  const [openListDay, setOpenListDay] = useState<boolean>(false);
  const [idMonth, setIdMonth] = useState<number>(0);
  const [idYear, setIdYear] = useState<number>(0);
  const [idDay, setIdDay] = useState<number>(0);
  const [days, setDays] = useState<TDayData>([]);
  const [months, setMonths] = useState<TMonthsData>([]);
  const [years, setYears] = useState<TYearsData>([]);

  // console.log(days, months, years);

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
    let startYear = 1340;
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

  const generateDays = () => {
    let days = [];
    const getMonth = months[0]?.label;
    const filterDays = collectionDaysOfMonths.filter((itemDay) => itemDay.months.includes(getMonth));
    if (filterDays) {
      for (let i = 1; i <= filterDays[0]?.days; i++) {
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

  useEffect(() => {
    setDays([{ id: +convertFaToEn(String(date_day)), day: date_day }]);
    setMonths([
      { value: mounthListCollection.filter((item) => item.label === date_month)[0].value, label: date_month },
    ]);
    setYears([{ id: +convertFaToEn(date_year), year: date_year }]);
    setIdMonth(mounthListCollection.filter((item) => item.label === date_month)[0].value);
    setIdYear(+convertFaToEn(date_year));
    setIdDay(+convertFaToEn(String(date_day)));
  }, []);

  const becomeDate = () => {
    if (months.length > 0 && years.length > 0) {
      const year = years[0].year;
      const month = months[0].value;
      const day = 0;
      const date = `${year}/${
        month < 10 ? convertEnToFa(String("0" + month)) : convertEnToFa(String(month))
      }/${convertEnToFa(String(day))}`;
      return date;
    }
    return;
  };

  const handleDayShow = () => {
    const findDay = daysData.filter((dayCol) => dayCol?.day === days[0].day);
    if (findDay.length > 0) return days[0].day;
    else return "انتخاب";
  };

  const showDay = handleDayShow();

  return (
    <div className={styles.datePicker}>
      <div className={styles.datePickerContainer}>
        <div className={styles.datePickerItems}>
          <div className={styles.datePickerItem} onClick={() => setOpenListMonth((perv) => !perv)}>
            <span>{`ماه/${months[0]?.label}`}</span>
          </div>
          <div className={styles.datePickerItem} onClick={() => setOpenListYear((perv) => !perv)}>
            <span>{`سال/${years[0]?.year}`}</span>
          </div>
          <div className={styles.datePickerItem} onClick={() => setOpenListDay((perv) => !perv)}>
            <span>{`روز/${showDay}`}</span>
          </div>
        </div>
      </div>
      <div>
        {openListMonth && (
          <ul className={styles.monthBox}>
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
        )}
        {openListYear && (
          <ul className={styles.yearBox}>
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
        )}
        {openListDay && (
          <ul className={styles.dayBox}>
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
        )}
      </div>
    </div>
  );
}

export { DatePicker };
