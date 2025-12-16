'use client';
import { useEffect, useState } from 'react';

// The data structure for an ad, received from our API
interface Ad {
  id: string;
  type: 'image' | 'code';
  name?: string;
  image_url?: string;
  target_url?: string;
  image_width?: number;
  image_height?: number;
}

export default function HomeCarousel() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch ad data from the new placement API
  useEffect(() => {
    async function fetchAdsForHomeCarousel() {
      try {
        const response = await fetch('/api/placements/home_carousel');
        if (!response.ok) throw new Error('Home carousel ads could not be loaded.');
        
        const data: Ad[] = await response.json();
        
        if (data.length > 0) {
          // Store all ads returned by the API
          setAds(data);
        }
      } catch (error) {
        console.error('Home Carousel fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAdsForHomeCarousel();
  }, []);

  // For simplicity, we will only display the first ad for now.
  const firstAd = ads.length > 0 ? ads[0] : null;

  // 2. Handle ad clicks and report them
  const handleAdClick = () => {
    if (!firstAd) return;

    // Report the click event (fire-and-forget)
    fetch(`/api/ads/${firstAd.id}/click`, { method: 'POST', cache: 'no-store' });

    if (firstAd.target_url) {
      window.open(firstAd.target_url, '_blank');
    }
  };

  // Render nothing while loading or if no ad is found
  if (loading || !firstAd) {
    return null;
  }

  // 3. Render the first ad's image
  // Per user request, display the image in its original dimensions.
  if (firstAd.type === 'image' && firstAd.image_url) {
    return (
      <div 
        className="w-full flex justify-center items-center cursor-pointer my-4" // Added margin for spacing
        onClick={handleAdClick}
      >
        <img 
          src={firstAd.image_url} 
          alt={firstAd.name || 'Advertisement'} 
          className="h-auto w-auto max-w-full" // This preserves original aspect ratio
          style={{ 
            width: firstAd.image_width ? `${firstAd.image_width}px` : 'auto',
            height: firstAd.image_height ? `${firstAd.image_height}px` : 'auto',
          }}
        />
      </div>
    );
  }

  // Fallback in case of unexpected data
  return null;
}