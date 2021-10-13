import React, { Fragment, useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import "./camera.css";
import { useHistory } from "react-router-dom";

const CameraComponent = ({ model, image, setImage, setPredictionValue }) => {
  // console.log(model.summary());
  const history = useHistory();
  const webcamRef = useRef(null);
  const imageRef = useRef(null);

  const predictModel = async () => {
    const img = tf.browser.fromPixels(imageRef.current);

    const resized = img.resizeNearestNeighbor([150, 150]).toFloat();
    const expanded = resized.expandDims();
    const obj = await model.predict(expanded).data();
    console.log(obj);
    if (obj[0] === 0) {
      setPredictionValue("This is a Car!");
    } else {
      setPredictionValue("This is Not a Car :(");
    }
  };

  const capture = async () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImage(imgSrc);
    await predictModel();
    history.push("/imagepreview");
  };

  const uploadImage = async (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImage(url);
      await predictModel();
      history.push("/imagepreview");
    } else {
      setImage(null);
    }
  };

  return (
    <>
      <div>
        <Webcam
          audio={false}
          height={"100%"}
          width={"100%"}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ height: 480, width: 500, facingMode: "user" }}
        />
      </div>
      <div className="box">
        <button className="btn btn-dark btn-lg button" onClick={capture}>
          Capture
        </button>

        <label
          htmlFor="file-input"
          className="btn btn-outline-dark button btn-lg"
        >
          Upload
        </label>
        <input
          id="file-input"
          type="file"
          onChange={uploadImage}
          style={{ display: "none" }}
        />

        <img
          src={image}
          ref={imageRef}
          hidden={true}
          width="660"
          height="350"
          alt="clicked images"
        />
      </div>
    </>
  );
};

export default CameraComponent;
