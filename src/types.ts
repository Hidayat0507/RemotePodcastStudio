export interface MediaSettings {
  echoCancellation: boolean;
  noiseSuppression: boolean;
  autoGainControl: boolean;
  sampleRate: number;
  channelCount: number;
  video: boolean;
  videoQuality: 'sd' | 'hd' | '4k';
  videoDevice: string;
  audioDevice: string;
}

export interface PeerConnection {
  id: string;
  stream: MediaStream | null;
  connected: boolean;
}