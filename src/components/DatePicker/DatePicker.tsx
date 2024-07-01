"use client";

import { useState } from "react";
import { mounthList, mounthListCollection } from "./DatePicker.constant";

import styles from "./DatePicker.module.scss";

function DatePicker() {
  const [openListMonth, setOpenListMonth] = useState<boolean>(false);
  const [openListDay, setOpenListDay] = useState<boolean>(false);
  const [idMonth, setIdMonth] = useState<number>(0);

  const findMonth = mounthListCollection.filter((item) => item.value === idMonth);

  return (
    <div className={styles.datePicker}>
      <div className={styles.datePickerContainer}>
        <div className={styles.datePickerItems}>
          <div className={styles.datePickerItem} onClick={() => setOpenListMonth((perv) => !perv)}>
            <span>{findMonth.length === 0 ? "ماه" : findMonth[0]?.label}</span>
          </div>
          <div className={styles.datePickerItem} onClick={() => setOpenListDay((perv) => !perv)}></div>
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
        {openListDay && <ul></ul>}
      </div>
    </div>
  );
}

export { DatePicker };
