import React from 'react';
import { Composition } from 'remotion';
import { NuvioVideo } from './NuvioVideo.jsx';
import '../index.css';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="NuvioShowcase"
        component={NuvioVideo}
        durationInFrames={720}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
