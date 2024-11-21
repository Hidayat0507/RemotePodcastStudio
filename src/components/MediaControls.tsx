import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Camera, CameraOff, Settings, Radio } from 'lucide-react';
import { MediaSettings } from '../types';

interface MediaControlsProps {
  isRecording: boolean;
  toggleRecording: () => void;
  mediaSettings: MediaSettings;
  setMediaSettings: (settings: MediaSettings) => void;
}

export const MediaControls: React.FC<MediaControlsProps> = ({
  isRecording,
  toggleRecording,
  mediaSettings,
  setMediaSettings,
}) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => setDevices(devices))
      .catch(console.error);
  }, []);

  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  const audioDevices = devices.filter(device => device.kind === 'audioinput');

  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={toggleRecording}
            className={`p-4 rounded-full ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } transition-colors`}
          >
            {isRecording ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>
          <button
            onClick={() => setMediaSettings({ ...mediaSettings, video: !mediaSettings.video })}
            className={`p-4 rounded-full ${
              mediaSettings.video ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'
            } transition-colors`}
          >
            {mediaSettings.video ? (
              <Camera className="w-6 h-6 text-white" />
            ) : (
              <CameraOff className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
        <div className="flex gap-4">
          <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
            <Settings className="w-6 h-6 text-white" />
          </button>
          <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
            <Radio className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white">Echo Cancellation</span>
          <input
            type="checkbox"
            checked={mediaSettings.echoCancellation}
            onChange={(e) =>
              setMediaSettings({ ...mediaSettings, echoCancellation: e.target.checked })
            }
            className="toggle"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">Noise Suppression</span>
          <input
            type="checkbox"
            checked={mediaSettings.noiseSuppression}
            onChange={(e) =>
              setMediaSettings({ ...mediaSettings, noiseSuppression: e.target.checked })
            }
            className="toggle"
          />
        </div>
        {mediaSettings.video && (
          <div className="flex items-center justify-between">
            <span className="text-white">Video Quality</span>
            <select
              value={mediaSettings.videoQuality}
              onChange={(e) =>
                setMediaSettings({
                  ...mediaSettings,
                  videoQuality: e.target.value as MediaSettings['videoQuality'],
                })
              }
              className="bg-gray-700 text-white rounded px-3 py-1"
            >
              <option value="sd">SD (480p)</option>
              <option value="hd">HD (1080p)</option>
              <option value="4k">4K</option>
            </select>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-white">Sample Rate</span>
          <select
            value={mediaSettings.sampleRate}
            onChange={(e) =>
              setMediaSettings({ ...mediaSettings, sampleRate: Number(e.target.value) })
            }
            className="bg-gray-700 text-white rounded px-3 py-1"
          >
            <option value="44100">44.1 kHz</option>
            <option value="48000">48 kHz</option>
            <option value="96000">96 kHz</option>
          </select>
        </div>
        {videoDevices.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-white">Camera</span>
            <select
              value={mediaSettings.videoDevice}
              onChange={(e) =>
                setMediaSettings({ ...mediaSettings, videoDevice: e.target.value })
              }
              className="bg-gray-700 text-white rounded px-3 py-1"
            >
              {videoDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId.slice(0, 4)}`}
                </option>
              ))}
            </select>
          </div>
        )}
        {audioDevices.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-white">Microphone</span>
            <select
              value={mediaSettings.audioDevice}
              onChange={(e) =>
                setMediaSettings({ ...mediaSettings, audioDevice: e.target.value })
              }
              className="bg-gray-700 text-white rounded px-3 py-1"
            >
              {audioDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Microphone ${device.deviceId.slice(0, 4)}`}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};