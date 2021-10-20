// state management
import { useState, useEffect } from 'react';

// demo information
import { DemoInfo, DemoSEO, NotSupported } from 'components';

// api
import {
  isSupported,
  getUserMedia,
  videoOff,
  grabFrame,
  takePhoto,
} from 'web-apis/image-capture';

// demo info by id
import { getDemoById } from 'utils/data/data-access';

// Component that Renders the Demo UI
const ToRender = () => {
  return (
    <div className="tw-flex tw-gap-4 tw-flex-col tw-items-center tw-justify-center">
      <div className="tw-p-4 tw-flex-wrap tw-flex tw-gap-4 tw-flex-row tw-items-center tw-justify-center">
        <button id="getUserMediaButton" onClick={() => getUserMedia()}>
          Start the Stream
        </button>{' '}
        <button onClick={() => videoOff()}>Switch Off</button>{' '}
        <button
          id="grabFrameButton"
          onClick={() => grabFrame()}
          disabled={!isSupported()}
        >
          Grab Frame
        </button>{' '}
        <button
          id="takePhotoButton"
          onClick={() => takePhoto()}
          disabled={!isSupported()}
        >
          Take Photo
        </button>
      </div>
      <div className="tw-m-4 sm:tw-m-0">
        <video
          style={{ height: '198px', width: '100%', border: '2px solid' }}
          autoPlay
        ></video>
      </div>
      <div
        id="error-msg-id"
        className="tw-bg-red tw-text-white tw-p-10px tw-rounded-4px tw-m-10px hide"
      ></div>
      <div>
        <canvas id="grabFrameCanvas"></canvas>
        <canvas id="takePhotoCanvas"></canvas>
      </div>
    </div>
  );
};

const ImageCapture = () => {
  const [loaded, setLoaded] = useState(false);
  const [demoInfo, setDemoInfo] = useState();

  // Get the demo id
  const id = '_image_capture_api_';

  useEffect(() => {
    // find the demo details
    const thisDemo = getDemoById(id);
    setDemoInfo(thisDemo);
    setLoaded(true);
  }, [id]);

  return (
    <>
      {loaded && (
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
          <DemoSEO title={demoInfo.title} description={demoInfo.desc} />
          <DemoInfo info={demoInfo} />
          {isSupported() ? (
            <ToRender />
          ) : (
            <NotSupported canIUseURL={demoInfo.canIUseURL} />
          )}
        </div>
      )}
    </>
  );
};

export default ImageCapture;
