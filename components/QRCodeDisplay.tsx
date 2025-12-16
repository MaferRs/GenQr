import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Share2 } from 'lucide-react';

interface QRCodeDisplayProps {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size,
  fgColor,
  bgColor,
  level,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div 
        ref={canvasRef} 
        className="p-4 bg-white rounded-xl shadow-inner border border-gray-200"
        style={{ backgroundColor: bgColor }} // Ensure external padding matches bg
      >
        <QRCodeCanvas
          value={value}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          level={level}
          includeMargin={true}
        />
      </div>

      <div className="flex space-x-3 w-full max-w-xs">
        <button
          onClick={downloadQRCode}
          className="flex-1 flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PNG
        </button>
      </div>
      
      <div className="text-xs text-gray-400 text-center max-w-xs break-all">
        Data: {value.length > 50 ? value.substring(0, 50) + '...' : value}
      </div>
    </div>
  );
};