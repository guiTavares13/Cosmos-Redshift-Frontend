import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateRangePicker({ placeholderStart, placeholderEnd }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText={placeholderStart}
        startDate={startDate}
        endDate={endDate}
        selectsStart
      />
      <span style={{ marginLeft: 10, marginRight: 10 }}>-</span>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText={placeholderEnd}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        selectsEnd
      />
    </div>
  );
}
