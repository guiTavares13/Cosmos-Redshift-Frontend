
import React from "react";
import { Puff } from "react-loader-spinner";
import "./LoaderComponent.css";

const LoaderComponent = () => {
  return (
    <div className="loader-container">
      <Puff color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default LoaderComponent;
