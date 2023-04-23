import React, { useState } from "react";
import "./App.css";

function App() {
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [finalDate, setFinalDate] = useState(null);
  const [formats, setFormats] = useState([]);

  const handleDateChange = (e) => {
    let { value } = e.target;
    setSelectedDate(value);
    updateSelectedDate(value, selectedMonth, selectedYear);
  };

  const handleMonthChange = (e) => {
    let { value } = e.target;
    setSelectedMonth(value);
    updateSelectedDate(selectedDate, value, selectedYear);
  };

  const handleYearChange = (e) => {
    let { value } = e.target;
    setSelectedYear(value);
    updateSelectedDate(selectedDate, selectedMonth, value);
  };

  const updateSelectedDate = (date, month, year) => {
    if (date && month && year) {
      let formats = [];
      const formattedDate = new Date(year, month - 1, date);
      setFinalDate(formattedDate.toISOString());
      const dt = new Date(formattedDate);
      formats.push({
        id: 1,
        label: "YYYY-MM-DD",
        date: dt.toISOString().slice(0, 10),
      });
      formats.push({
        id: 2,
        label: "MM/DD/YYYY",
        date: `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`,
      });
      formats.push({
        id: 3,
        label: "DD-MM-YYYY",
        date: `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`,
      });
      setFormats([...formats]);
    }
  };

  const renderDateOptions = () => {
    const dateOptions = [
      <option key={0} value={""} disabled>
        Select
      </option>,
    ];

    for (let i = 1; i <= 31; i++) {
      dateOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return dateOptions;
  };

  const renderMonthOptions = () => {
    const monthOptions = [
      <option key={0} value={""} disabled>
        Select
      </option>,
    ];

    for (let i = 1; i <= 12; i++) {
      monthOptions.push(
        <option key={i} value={i}>
          {new Date(2000, i - 1, 1).toLocaleString("default", {
            month: "long",
          })}
        </option>
      );
    }

    return monthOptions;
  };

  const renderYearOptions = () => {
    const yearOptions = [
      <option key={0} value={""} disabled>
        Select
      </option>,
    ];

    for (let i = currentYear; i >= 1900; i--) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return yearOptions;
  };

  return (
    <div className="d-flex" style={{ height: "100dvh" }}>
      <div className="app">
        <div className="app-heading d-flex w-100">
          <h2 className="app-heading_text">Custom</h2>
          <h2 className="app-heading_text text-primary">DatePicker</h2>
        </div>
        <div className="app-container d-flex">
          <div className="app-select">
            <p>DD</p>
            <select value={selectedDate} onChange={handleDateChange}>
              {renderDateOptions()}
            </select>
          </div>
          <div className="app-select">
            <p>MM</p>
            <select value={selectedMonth} onChange={handleMonthChange}>
              {renderMonthOptions()}
            </select>
          </div>
          <div className="app-select">
            <p>YYYY</p>
            <select value={selectedYear} onChange={handleYearChange}>
              {renderYearOptions()}
            </select>
          </div>
        </div>
        {finalDate && (
          <div className="app-format">
            <p>Selected date : </p>
            <p>{finalDate}</p>
          </div>
        )}
        {formats.map((format) => {
          return (
            <div className="app-format" key={format.id}>
              <p>{format.label} : </p>
              <p>{format.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
