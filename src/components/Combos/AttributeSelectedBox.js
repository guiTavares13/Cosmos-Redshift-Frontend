import React from 'react';
import Select from 'react-select';

function extractAttributes(item) {
  const attributes = [];

  if (item) {
    Object.entries(item).forEach(([key, valueObj]) => {
      if (key !== 'metadata' && key !== 'type' && key !== 'id') {
        attributes.push({ label: `${key}: ${valueObj.value}`, value: key });
      }
    });
  }

  return attributes;
}

export default function AttributeSelectedBox({ placeholder, items, onChange }) {
  const options = extractAttributes(items);

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
      name="selected-box"
      options={options}
      className="basic-multi-select fixed-width-select"
      classNamePrefix="select"
      placeholder={placeholder}
      onChange={handleChange}
      styles={fixedHeightStyles}
    />
  );
}
