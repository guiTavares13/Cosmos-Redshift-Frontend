import React from 'react';
import Select from 'react-select';

export default function ComponentSelectedBox({ placeholder, items, onChange }) {
  const options = items ? items.map((item) => ({ label: item, value: item })) : [];

  const handleChange = (selectedOptions) => {
    if (onChange) {
      const selectedValues = selectedOptions.map((option) => option.value);
      onChange(selectedValues);
    }
  };

  const fixedHeightStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: 38, 
      maxHeight: 38, 
      height: 38, 
    }),
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: '100%',
      overflow: 'auto',
    }),
  };

  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      name="component-selected-box"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder={placeholder}
      onChange={handleChange}
      styles={fixedHeightStyles}
    />
  );
}
