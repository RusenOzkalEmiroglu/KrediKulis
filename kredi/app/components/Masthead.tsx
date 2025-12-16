'use client';
import { useEffect, useState } from 'react';

// The new data structure for an ad, received from our API
interface Ad {
  id: string;
  type: 'image' | 'code';
  name?: string;
  image_url?: string;
  target_url?: string;
  html_code?: string;
  image_width?: number;
  image_height?: number;
}

export default function Masthead() {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch ad data from the new placement API
  useEffect(() => {
    async function fetchAdForMasthead() {
      try {
        const response = await fetch('/api/placements/masthead');
        if (!response.ok) throw new Error('Masthead ad could not be loaded.');
        
        const data: Ad[] = await response.json();
        
        if (data.length > 0) {
          setAd(data[0]);
        }
      } catch (error) {
        console.error('Masthead fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAdForMasthead();
  }, []);

  // 2. Handle ad clicks and report them
  const handleAdClick = () => {
    if (!ad) return;

    // Report the click event (fire-and-forget)
    fetch(`/api/ads/${ad.id}/click`, { method: 'POST', cache: 'no-store' });

    if (ad.target_url) {
      window.open(ad.target_url, '_blank');
    }
  };

  // Render nothing while loading or if no ad is found
  if (loading || !ad) {
    return null;
  }

  // 3. Render the ad based on its type
  if (ad.type === 'code' && ad.html_code) {
    return (
        <div 
            className="w-full cursor-pointer flex justify-center"
            onClick={handleAdClick} 
            dangerouslySetInnerHTML={{ __html: ad.html_code }}
        />
    );
  }

  if (ad.type === 'image' && ad.image_url) {
    const hasDimensions = ad.image_width && ad.image_height;
    
    return (
      <div 
        className="w-full bg-gray-100 flex justify-center items-center cursor-pointer"
        onClick={handleAdClick}
      >
        {hasDimensions ? (
          // New method: Use aspect ratio to reserve space
          <div 
            className="w-full"
            style={{ aspectRatio: `${ad.image_width} / ${ad.image_height}` }}
          >
            <img 
              src={ad.image_url} 
              alt={ad.name || 'Advertisement'} 
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          // Fallback for old ads without dimensions
          <img 
            src={ad.image_url} 
            alt={ad.name || 'Advertisement'} 
            className="h-auto w-auto max-w-full"
          />
        )}
      </div>
    );
  }

  // Fallback in case of unexpected data
  return null;
}