import { useRef, useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useAudioPlayer() {
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePreview = (url: string | null) => {
    if (!url) {
      toast.error('Preview no disponible', {
        description: 'Restricción de derechos de autor en este track.',
        duration: 3000,
      });
      return;
    }

    if (playingUrl === url) {
      audioRef.current?.pause();
      setPlayingUrl(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(url);
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => {
        console.error('Error playing audio:', e);
        toast.error('Error al reproducir audio');
      });
      
      audioRef.current.onended = () => setPlayingUrl(null);
      setPlayingUrl(url);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { playingUrl, togglePreview };
}
