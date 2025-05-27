// components/RoomFilter.jsx
"use client";

import { useState } from "react";
import Select from "react-select";

export default function RoomFilter({ options, onSelectChange }) {
  const [selected, setSelected] = useState("all");

  const handleChange = (option) => {
    setSelected(option.value);
    if (onSelectChange) {
      onSelectChange(option.value); // callback to parent (optional)
    }
  };

  return (
    <Select
      options={options}
      value={options.find((opt) => opt.value === selected)}
      onChange={handleChange}
      className="w-full"
    />
  );
}
