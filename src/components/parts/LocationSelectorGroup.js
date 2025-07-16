import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./LocationSelectorGroup.css";

const Selector = ({ label, placeholder, options, value, onChange }) => (
  <div className="selector-wrapper">
    <label>{label}</label>
    <select value={value} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const DatePicker = ({ label, value, onChange }) => {
  const handleChange = (date) => {
    const formatted = date.toISOString().split("T")[0];
    onChange("date", formatted);
  };

  return (
    <div className="selector-wrapper">
      <label>{label}</label>
      <ReactDatePicker
        selected={value ? new Date(value) : null}
        onChange={handleChange}
        minDate={new Date()}
        placeholderText={`Select ${label.toLowerCase()}`}
        dateFormat="yyyy-MM-dd"
        className="form-control"
      />
    </div>
  );
};

const LocationSelectorGroup = ({ title, locations, values, onChange }) => {
  return (
    <div className="location-selector-group">
      <h3>{title}</h3>
      <div className="selectors-row">
        <Selector
          label="Location"
          placeholder="Select your city"
          options={locations}
          value={values.location}
          onChange={(e) => onChange("location", e.target.value)}
        />
        <DatePicker
          label="Date"
          value={values.date}
          onChange={onChange}
        />
        <Selector
          label="Time"
          placeholder="Select your time"
          options={[
            "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
            "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
          ]}
          value={values.time}
          onChange={(e) => onChange("time", e.target.value)}
        />
      </div>
    </div>
  );
};

export default LocationSelectorGroup;
