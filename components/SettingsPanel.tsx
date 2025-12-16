import React from 'react';
import { Wand2, Type, Palette, Settings2 } from 'lucide-react';

interface SettingsPanelProps {
  text: string;
  setText: (val: string) => void;
  fgColor: string;
  setFgColor: (val: string) => void;
  bgColor: string;
  setBgColor: (val: string) => void;
  onAIGenerateClick: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  text,
  setText,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  onAIGenerateClick,
}) => {
  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Type className="w-4 h-4 text-blue-500" />
            Content
          </label>
          <button
            onClick={onAIGenerateClick}
            className="text-xs flex items-center text-purple-600 hover:text-purple-700 font-medium bg-purple-50 px-2 py-1 rounded-md transition-colors"
          >
            <Wand2 className="w-3 h-3 mr-1" />
            AI Format Helper
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL, text, or contact info..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none h-32 text-gray-700 placeholder-gray-400 bg-white"
        />
      </div>

      {/* Colors Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-500" />
          Appearance
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-wide font-medium">Foreground</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-10 w-10 rounded cursor-pointer border-0 p-0 overflow-hidden"
              />
              <span className="text-sm text-gray-600 font-mono">{fgColor}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-wide font-medium">Background</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-10 rounded cursor-pointer border-0 p-0 overflow-hidden"
              />
              <span className="text-sm text-gray-600 font-mono">{bgColor}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Presets (Optional decoration for simple UX) */}
      <div className="pt-4 border-t border-gray-100">
         <div className="flex items-center gap-2 text-xs text-gray-400">
            <Settings2 className="w-3 h-3" />
            <span>Customize your QR code easily</span>
         </div>
      </div>
    </div>
  );
};