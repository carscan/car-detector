import React from "react";

const ImagePreview = ({ image, predictionValue }) => {
  return (
    <>
      <h3>Image Preview</h3>
      <img className="image" src={image} alt={"image preview"} />
      <div className="result">
        <h5>Prediction: </h5>
        <h4>{predictionValue}</h4>
      </div>
    </>
  );
};

export default ImagePreview;
