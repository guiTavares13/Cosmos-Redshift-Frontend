import React, {useEffect, useState} from "react";
import LoaderComponent from "../Loader/LoaderComponent";

import './ImageGraph2DComponent.css';

export default function ImageGraph2DComponent({ imgBase64Object }) {
  console.log(imgBase64Object)
  const [imgSrc, setImgSrc] = useState(null);


  useEffect(() => {

    if (imgBase64Object) {
        setImgSrc('data:image/png;base64,' + imgBase64Object);
    } else {
        console.error('JSON input is not properly formatted');
    }

}, [imgBase64Object]);

  return (
    <div className="img-graph2d">
      {imgSrc ? (
        <img src={imgSrc} alt="Converted PNG" />
      ) : (
        <div className="text-center custom-loader">
          <LoaderComponent />
        </div>
      )}
    </div>
  );
}