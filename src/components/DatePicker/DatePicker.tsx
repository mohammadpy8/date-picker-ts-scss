"use client";

import { useState } from "react";
import { mounthList, mounthListCollection } from "./DatePicker.constant";

import styles from "./DatePicker.module.scss";
import { TYearsData } from "./DatePicker.type";

function DatePicker() {
  const [openListMonth, setOpenListMonth] = useState<boolean>(false);
  const [openListDay, setOpenListDay] = useState<boolean>(false);
  const [idMonth, setIdMonth] = useState<number>(0);
  const [idYear, setIdYear] = useState<number>(0);

  const convertFaToEn = (s: any) => s.replace(/[۰-۹]/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const convertEnToFa = (s: any) => s.replace(/\d/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  const persianDate = () => {
    const date = new Date().toLocaleDateString("fa").split("/");
    const createCurrentMonth = convertFaToEn(String(date[1]));
    if(Number(createCurrentMonth) > 9) {
      return [date[0], createCurrentMonth, date[2]]
    } else {
      return [date[0]]
    }
  };

  console.log("persinadat", persianDate());

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

  const yearsData = generateYear();

  const findMonth = mounthListCollection.filter((item) => item.value === idMonth);
  const findYear = yearsData.filter((item) => item.id === idYear);

  const becomeDate = () => {
    if (findMonth.length > 0 && findYear.length > 0) {
      const year = findYear[0].year;
      const month = findMonth[0].value;
      const day = 0;
      const date = `${year}/${
        month < 10 ? convertEnToFa(String("0" + month)) : convertEnToFa(String(month))
      }/${convertEnToFa(String(day))}`;
      return date;
    }
    return;
  };

  return (
    <div className={styles.datePicker}>
      <div className={styles.datePickerContainer}>
        <div className={styles.datePickerItems}>
          <div className={styles.datePickerItem} onClick={() => setOpenListMonth((perv) => !perv)}>
            <span>{findMonth.length === 0 ? "ماه" : findMonth[0]?.label}</span>
          </div>
          <div className={styles.datePickerItem} onClick={() => setOpenListDay((perv) => !perv)}>
            <span>{findYear.length === 0 ? "سال" : findYear[0].year}</span>
          </div>
          <div className={styles.datePickerItem}></div>
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
                  }}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        )}
        {openListDay && (
          <ul className={styles.yearBox}>
            {yearsData.map((item) => {
              return (
                <li
                  key={item.id}
                  className={idYear === item.id ? styles.activeMonth : ""}
                  onClick={() => {
                    setIdYear(item.id);
                  }}
                >
                  {item.year}
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
