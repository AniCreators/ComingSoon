import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen">
        <DotLottieReact
        src="/Loading-Animation.lottie"
        loop
        autoplay
        />
    </div>
  );
};