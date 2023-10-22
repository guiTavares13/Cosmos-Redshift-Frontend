import React, { useState } from 'react';

const Base64ToPNGConverter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [pngSrc, setPngSrc] = useState(null);

  const base64ToPng = (jsonString) => {
    try {
      const jsonData = JSON.parse(jsonString);
      if ('data' in jsonData && jsonData.data.startsWith('data:image/png;base64,')) {
        setPngSrc(jsonData.data);
      } else {
        console.error('JSON input is not properly formatted');
      }
    } catch (e) {
      console.error('Error parsing JSON input:', e);
    }
  };

  return (
    <div>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter the JSON with base64 image data"
        rows={10}
        cols={60}
      />
      <br />
      <button onClick={() => base64ToPng(jsonInput)}>Convert to PNG</button>
      {pngSrc && (
        <div>
          <h3>Resultado:</h3>
          <img src={pngSrc} alt="Converted PNG" />
        </div>
      )}
    </div>
  );
};

export default Base64ToPNGConverter;
