import React, { useEffect, useRef } from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface VideoPreviewProps {
  stream: MediaStream | null;
  isEnabled: boolean;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ stream, isEnabled }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!isEnabled) {
    return (
      <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center">
        <CameraOff className="w-12 h-12 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full rounded-xl bg-gray-800 aspect-video object-cover"
      />
      <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1.5 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Camera className="w-4 h-4 text-white" />
        <span className="text-sm text-white">Live</span>
      </div>
    </div>
  );
};