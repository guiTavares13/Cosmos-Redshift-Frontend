import React from "react";
import "./ImageCorrelationComponent.css";
import LoaderComponent from "../Loader/LoaderComponent";

export default function ImageCorrelationComponent() {
  const img = false;

  return (
    <div className="img-correlation">
      {img ? (
        <p>Oi</p>
      ) : (
        <div className="text-center custom-loader">
          <LoaderComponent />
        </div>
      )}
    </div>
  );
}
