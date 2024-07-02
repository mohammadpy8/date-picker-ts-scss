"use client";

import { DatePicker } from "@/components";
import { useState } from "react";

function TestPage() {
  const [getDate, setGetDate] = useState<string>("");
  console.log("getDate==>>", getDate);

  return (
    <div>
      <DatePicker setGetDate={setGetDate} />
    </div>
  );
}

export default TestPage;
