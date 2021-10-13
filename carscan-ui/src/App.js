import { lazy, Suspense } from "react";
import "./App.css";

import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { LoadingOutlined } from "@ant-design/icons";

const CameraComponent = lazy(() => import("./components/Camera"));
const ImagePreview = lazy(() => import("./pages/ImagePreview"));

function App() {
  const [model, setModel] = useState(null);
  const [image, setImage] = useState("");
  const [predictionValue, setPredictionValue] = useState("");

  useEffect(() => {
    modelLayout();
  }, []);

  const modelLayout = async () => {
    const carDetectorModel = await tf.loadLayersModel(
      "https://tensorflowjscardetector.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json"
    );
    // console.log(carDetectorModel.summary());
    setModel(carDetectorModel);
  };

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5 text-primary">
          __E-PRODUCT <LoadingOutlined className="h4 p-3 text-danger" /> ___BY
          SHIVANSH MEHTA
        </div>
      }
    >
      <h1>cAR Detector</h1>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <CameraComponent
              {...props}
              model={model}
              image={image}
              setImage={setImage}
              predictionValue={predictionValue}
              setPredictionValue={setPredictionValue}
            />
          )}
        />
        <Route
          exact
          path="/imagepreview"
          render={(props) => (
            <ImagePreview
              {...props}
              image={image}
              predictionValue={predictionValue}
            />
          )}
        />
      </Switch>
    </Suspense>
  );
}

export default App;
