import React from "react";
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

const LocationSelectorGroup = ({ title, locations, values, onChange }) => {
  return (
    <div className="location-selector-group">
      <h3>{title}</h3>
      <div className="selectors-row">
        <Selector
          label="Locations"
          placeholder="Select your city"
          options={locations}
          value={values.location}
          onChange={(e) => onChange("location", e.target.value)}
        />
        <Selector
          label="Date"
          placeholder="Select your date"
          options={[]} // zamijeni s datum pickerom kasnije
          value={values.date}
          onChange={(e) => onChange("date", e.target.value)}
        />
        <Selector
          label="Time"
          placeholder="Select your time"
          options={[ 
            "08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
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