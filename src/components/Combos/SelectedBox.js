import React from 'react';
import Select from 'react-select';

export default function SelectedBox({ placeholder, items }) {

  const options = items
    ? items.map((item, index) => ({
        label: item,
        value: index,
      }))
    : [];

  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      name="selected-box"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder={placeholder}
    />
  );
}
