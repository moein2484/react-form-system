import { useState } from "react";

export function useTimePicker(initialTime = "08:00") {
  const [tempTime, setTempTime] = useState(() => {
    const [h, m] = initialTime.split(":").map(Number);
    return { hour: h, minute: m };
  });

  const setHour = (hour) =>
    setTempTime((t) => ({ ...t, hour }));

  const setMinute = (minute) =>
    setTempTime((t) => ({ ...t, minute }));

  const formatted = `${String(tempTime.hour).padStart(2, "0")}:${String(
    tempTime.minute
  ).padStart(2, "0")}`;

  return { tempTime, setHour, setMinute, formatted };
}
