import React from 'react';
import { Mic, MicOff, Settings, Radio } from 'lucide-react';
import { AudioSettings } from '../types';

interface AudioControlsProps {
  isRecording: boolean;
  toggleRecording: () => void;
  audioSettings: AudioSettings;
  setAudioSettings: (settings: AudioSettings) => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isRecording,
  toggleRecording,
  audioSettings,
  setAudioSettings,
}) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl">
      <div className="flex items-center justify-between">
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
            checked={audioSettings.echoCancellation}
            onChange={(e) =>
              setAudioSettings({ ...audioSettings, echoCancellation: e.target.checked })
            }
            className="toggle"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">Noise Suppression</span>
          <input
            type="checkbox"
            checked={audioSettings.noiseSuppression}
            onChange={(e) =>
              setAudioSettings({ ...audioSettings, noiseSuppression: e.target.checked })
            }
            className="toggle"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">Sample Rate</span>
          <select
            value={audioSettings.sampleRate}
            onChange={(e) =>
              setAudioSettings({ ...audioSettings, sampleRate: Number(e.target.value) })
            }
            className="bg-gray-700 text-white rounded px-3 py-1"
          >
            <option value="44100">44.1 kHz</option>
            <option value="48000">48 kHz</option>
            <option value="96000">96 kHz</option>
          </select>
        </div>
      </div>
    </div>
  );
};