const mounthList = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const mounthListCollection = [
  { value: 1, label: "فروردین" },
  { value: 2, label: "اردیبهشت" },
  { value: 3, label: "خرداد" },
  { value: 4, label: "تیر" },
  { value: 5, label: "مرداد" },
  { value: 6, label: "شهریور" },
  { value: 7, label: "مهر" },
  { value: 8, label: "آبان" },
  { value: 9, label: "آذر" },
  { value: 10, label: "دی" },
  { value: 11, label: "بهمن" },
  { value: 12, label: "اسفند" },
];

const collectionDaysOfMonths = [
  { days: 31, months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"] },
  { days: 30, months: ["مهر", "آبان", "آذر", "دی", "بهمن"] },
  { days: 29, months: ["اسفند"] },
];

export { mounthList, mounthListCollection, collectionDaysOfMonths };
