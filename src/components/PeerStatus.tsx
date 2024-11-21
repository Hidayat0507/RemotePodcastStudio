import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { PeerConnection } from '../types';

interface PeerStatusProps {
  peer: PeerConnection;
}

export const PeerStatus: React.FC<PeerStatusProps> = ({ peer }) => {
  return (
    <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg">
      {peer.connected ? (
        <Wifi className="w-5 h-5 text-green-500" />
      ) : (
        <WifiOff className="w-5 h-5 text-red-500" />
      )}
      <span className="text-white font-medium">
        {peer.connected ? 'Connected' : 'Disconnected'}
      </span>
      <span className="text-gray-400 text-sm">ID: {peer.id.slice(0, 8)}</span>
    </div>
  );
};