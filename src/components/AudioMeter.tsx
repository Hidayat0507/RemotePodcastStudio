import React, { useEffect, useRef } from 'react';

interface AudioMeterProps {
  stream: MediaStream;
}

export const AudioMeter: React.FC<AudioMeterProps> = ({ stream }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgb(20, 20, 20)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        ctx.fillStyle = `rgb(${barHeight + 100}, 100, 50)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    }

    draw();

    return () => {
      source.disconnect();
      audioContext.close();
    };
  }, [stream]);

  return <canvas ref={canvasRef} className="w-full h-20 rounded-lg" />;
};