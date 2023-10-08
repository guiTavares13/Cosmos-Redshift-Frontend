import React from 'react';
import Select from 'react-select';

export default function ComponentSelectedBox({ placeholder, items, onChange }) {
  const options = items ? items.map((item) => ({ label: item, value: item })) : [];

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
      name="component-selected-box"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
