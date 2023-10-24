import React from "react";
import LoaderComponent from "../Loader/LoaderComponent";

import './ImageGraph2DComponent.css';

export default function ImageGraph2DComponent() {
    const img = false;

    return (
        <div className="img-graph2d">
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