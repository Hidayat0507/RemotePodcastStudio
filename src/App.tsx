import React, { useState, useEffect } from 'react';
import { Mic, Radio } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { AudioMeter } from './components/AudioMeter';
import { MediaControls } from './components/MediaControls';
import { PeerStatus } from './components/PeerStatus';
import { VideoPreview } from './components/VideoPreview';
import type { MediaSettings, PeerConnection } from './types';

function App() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaSettings, setMediaSettings] = useState<MediaSettings>({
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    sampleRate: 48000,
    channelCount: 2,
    video: true,
    videoQuality: 'hd',
    videoDevice: '',
    audioDevice: '',
  });

  const [peer, setPeer] = useState<PeerConnection>({
    id: uuidv4(),
    stream: null,
    connected: false,
  });

  const getVideoConstraints = () => {
    const constraints: MediaTrackConstraints = {
      deviceId: mediaSettings.videoDevice ? { exact: mediaSettings.videoDevice } : undefined,
    };

    switch (mediaSettings.videoQuality) {
      case '4k':
        return { ...constraints, width: 3840, height: 2160 };
      case 'hd':
        return { ...constraints, width: 1920, height: 1080 };
      case 'sd':
        return { ...constraints, width: 854, height: 480 };
    }
  };

  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            echoCancellation: mediaSettings.echoCancellation,
            noiseSuppression: mediaSettings.noiseSuppression,
            autoGainControl: mediaSettings.autoGainControl,
            sampleRate: mediaSettings.sampleRate,
            channelCount: mediaSettings.channelCount,
            deviceId: mediaSettings.audioDevice ? { exact: mediaSettings.audioDevice } : undefined,
          },
          video: mediaSettings.video ? getVideoConstraints() : false,
        })
        .then(setStream)
        .catch(console.error);
    } else {
      stream?.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [isRecording, mediaSettings]);

  const toggleRecording = () => setIsRecording(!isRecording);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Radio className="w-8 h-8 text-purple-500" />
            <h1 className="text-2xl font-bold">Remote Podcast Studio</h1>
          </div>
          <PeerStatus peer={peer} />
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Mic className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-semibold">Local Preview</h2>
              </div>
              <div className="space-y-4">
                <VideoPreview stream={stream} isEnabled={mediaSettings.video} />
                {stream && <AudioMeter stream={stream} />}
                {!stream && (
                  <div className="h-20 flex items-center justify-center text-gray-400">
                    Start recording to see audio levels
                  </div>
                )}
              </div>
            </div>
            <MediaControls
              isRecording={isRecording}
              toggleRecording={toggleRecording}
              mediaSettings={mediaSettings}
              setMediaSettings={setMediaSettings}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Radio className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-semibold">Remote Connection</h2>
              </div>
              <div className="space-y-4">
                <VideoPreview stream={peer.stream} isEnabled={false} />
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-center text-gray-300">
                    Share this ID with your podcast guest:
                  </p>
                  <p className="text-center font-mono text-lg mt-2">{peer.id}</p>
                </div>
                <div className="text-center">
                  <button className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-medium transition-colors">
                    Connect to Remote Host
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;