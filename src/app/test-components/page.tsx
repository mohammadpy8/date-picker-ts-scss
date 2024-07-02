"use client";

import { DatePicker } from "@/components";
import { useState } from "react";

function TestPage() {
  const [getDate, setGetDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  console.log("getDate==>>", getDate, time);

  return (
    <div>
      <DatePicker setGetDate={setGetDate} setTime={setTime} />
    </div>
  );
}

export default TestPage;
