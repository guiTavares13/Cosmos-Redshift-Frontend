import React, { useEffect, useState } from "react";
import "./ImageCorrelationComponent.css";
import LoaderComponent from "../Loader/LoaderComponent";

export default function ImageCorrelationComponent({ imgBase64Object }) {
    console.log(imgBase64Object)
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const base64ToPng = (jsonData) => {
            if (jsonData && 'data' in jsonData && jsonData.data.startsWith('data:image/png;base64,')) {
                setImgSrc(jsonData.data);
            } else {
                console.error('JSON input is not properly formatted');
            }
        };

        if (imgBase64Object) {
            base64ToPng(imgBase64Object);
        }
    }, [imgBase64Object]);

    return (
        <div className="img-correlation">
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
