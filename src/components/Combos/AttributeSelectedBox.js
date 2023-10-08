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
      // Use .map() para extrair apenas os valores de cada opção selecionada
      const selectedValues = selectedOptions.map((option) => option.value);
      onChange(selectedValues);
    }
  };

  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      name="selected-box"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
