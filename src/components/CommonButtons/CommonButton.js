import React from "react";
import './CommonButton.css';

export default function CommonButton({ label, onClick }) {
  return (
    <div>
      <button className="commonButton" onClick={onClick}>{label}</button>
    </div>
  );
}
