// Referenced from React date range picker from npm website
// React
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// CSS
import "./CustomDateRangePicker.css";

const CustomDateRangePicker = ({ unavailableDates, onSelect }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    onSelect(ranges.selection);
  };

  return (
    <div>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date()} // Disable past days
        disabledDates={unavailableDates} // Array of disabled date ranges
      />
    </div>
  );
};

export default CustomDateRangePicker;
