import React, { useEffect, useState } from "react";
import "./ImageCorrelationComponent.css";
import loaderGif from "../../assets/cosmos-gif.gif";

export default function ImageCorrelationComponent({ imgBase64Object }) {
    const [imgSrc, setImgSrc] = useState(null);
    console.log(imgBase64Object)
    useEffect(() => {

        if (imgBase64Object) {
            setImgSrc('data:image/png;base64,' + imgBase64Object);
        } else {
            console.error('JSON input is not properly formatted');
        }

    }, [imgBase64Object]);

    return (
        <div className="img-correlation">
            {imgSrc ? (
                <img src={imgSrc} alt="Converted PNG" className="image" />
            ) : (
                <div className="text-center custom-loader">
                    <img src={loaderGif} alt="Loader" /> 
                </div>
            )}
        </div>
    );
}
