import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { generateQRDataFromPrompt } from '../services/geminiService';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (text: string) => void;
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, onApply }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateQRDataFromPrompt(prompt);
      onApply(result);
      onClose();
      setPrompt(''); // Reset for next time
    } catch (err) {
      setError("Something went wrong. Please check your internet or API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 bg-gradient-to-br from-purple-50 to-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-purple-700 font-bold text-lg">
              <Sparkles className="w-5 h-5" />
              <span>AI Smart Format</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Describe what you want the QR code to do, and I'll format the data correctly for you.
          </p>

          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., 'Connect to WiFi Network MyHome with password 1234' or 'Create a contact for Sarah...'"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none h-32 text-gray-700 text-sm"
              disabled={isLoading}
            />

            {error && (
              <div className="text-red-500 text-xs bg-red-50 p-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors text-sm"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className="flex-[2] flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Content
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 text-xs text-gray-400 border-t border-gray-100">
          Powered by Gemini 2.5 Flash
        </div>
      </div>
    </div>
  );
};