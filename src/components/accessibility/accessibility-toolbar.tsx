'use client';

import { useState } from 'react';
import { useAccessibilityContext } from './accessibility-provider';
import { Button } from '@/components/ui/button';
import { 
  Text, 
  TextIncrease, 
  TextDecrease, 
  Contrast, 
  Volume2, 
  VolumeX,
  Settings,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AccessibilityToolbar() {
  const {
    fontSize,
    isHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    announce
  } = useAccessibilityContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleFontIncrease = () => {
    increaseFontSize();
    announce(`Font boyutu artırıldı: ${fontSize + 2}px`);
  };

  const handleFontDecrease = () => {
    decreaseFontSize();
    announce(`Font boyutu azaltıldı: ${fontSize - 2}px`);
  };

  const handleFontReset = () => {
    resetFontSize();
    announce('Font boyutu sıfırlandı');
  };

  const handleContrastToggle = () => {
    document.body.classList.toggle('high-contrast');
    const newContrast = !document.body.classList.contains('high-contrast');
    announce(newContrast ? 'Yüksek kontrast açıldı' : 'Yüksek kontrast kapatıldı');
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Implement audio muting logic here
    announce(isMuted ? 'Ses açıldı' : 'Ses kapatıldı');
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
        aria-label="Erişilebilirlik araçları"
        aria-expanded={isOpen}
      >
        <Settings className="w-5 h-5" />
      </Button>

      {/* Toolbar Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 min-w-[300px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Erişilebilirlik Araçları
            </h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="p-1"
              aria-label="Araçları kapat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Font Size Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Font Boyutu
              </span>
              <span className="text-xs text-gray-500">{fontSize}px</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleFontDecrease}
                variant="outline"
                size="sm"
                className="flex-1"
                aria-label="Font boyutunu azalt"
              >
                <TextDecrease className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={handleFontReset}
                variant="outline"
                size="sm"
                className="flex-1"
                aria-label="Font boyutunu sıfırla"
              >
                <Text className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={handleFontIncrease}
                variant="outline"
                size="sm"
                className="flex-1"
                aria-label="Font boyutunu artır"
              >
                <TextIncrease className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Contrast Toggle */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={handleContrastToggle}
              variant="outline"
              className="w-full justify-start"
              aria-label="Kontrastı değiştir"
            >
              <Contrast className="w-4 h-4 mr-2" />
              {isHighContrast ? 'Normal Kontrast' : 'Yüksek Kontrast'}
            </Button>
          </div>

          {/* Audio Toggle */}
          <div className="mt-3">
            <Button
              onClick={handleMuteToggle}
              variant="outline"
              className="w-full justify-start"
              aria-label="Sesi aç/kapat"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 mr-2" />
              ) : (
                <Volume2 className="w-4 h-4 mr-2" />
              )}
              {isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            </Button>
          </div>

          {/* Accessibility Info */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p className="mb-1">• Tab tuşu ile gezinme</p>
              <p className="mb-1">• Enter/Space ile etkileşim</p>
              <p>• Esc ile kapatma</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
