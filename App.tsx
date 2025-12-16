import React, { useState } from 'react';
import { QRCodeDisplay } from './components/QRCodeDisplay';
import { SettingsPanel } from './components/SettingsPanel';
import { AIModal } from './components/AIModal';
import { QrCode } from 'lucide-react';

export default function App() {
  const [text, setText] = useState('https://example.com');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
               <QrCode className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              GenQR
            </h1>
          </div>
          <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            v1.0
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Settings */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
               <div className="mb-6">
                 <h2 className="text-lg font-bold text-gray-900">Configuration</h2>
                 <p className="text-gray-500 text-sm mt-1">Customize your QR code content and style.</p>
               </div>
               <SettingsPanel 
                  text={text}
                  setText={setText}
                  fgColor={fgColor}
                  setFgColor={setFgColor}
                  bgColor={bgColor}
                  setBgColor={setBgColor}
                  onAIGenerateClick={() => setIsAIModalOpen(true)}
               />
            </div>
            
            {/* Tips Section */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="text-blue-900 font-semibold text-sm mb-2">Did you know?</h3>
              <p className="text-blue-700 text-xs leading-relaxed">
                You can use the AI Helper to automatically format complex data like WiFi credentials, vCards (contacts), or calendar events just by describing them!
              </p>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="sticky top-24 w-full max-w-md">
              <div className="mb-4 flex items-center justify-between">
                 <h2 className="text-lg font-bold text-gray-900">Live Preview</h2>
                 <span className="text-xs font-medium text-gray-400">Auto-updates</span>
              </div>
              <QRCodeDisplay 
                value={text} 
                size={256} 
                fgColor={fgColor} 
                bgColor={bgColor} 
                level="H" // High error correction for better scanning
              />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-8">
         <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} GenQR Generator. Built with React & Tailwind.</p>
         </div>
      </footer>

      {/* AI Modal */}
      <AIModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onApply={(generatedText) => setText(generatedText)}
      />
    </div>
  );
}