'use client';

import { useState, useEffect } from 'react';

export interface Favorite {
  streamerId: string;
  streamerName: string;
  streamerAvatar: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const stored = localStorage.getItem('gamewave_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save favorites to localStorage whenever they change
    if (isLoaded) {
      localStorage.setItem('gamewave_favorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const addFavorite = (favorite: Favorite) => {
    setFavorites(prev => {
      if (prev.some(f => f.streamerId === favorite.streamerId)) {
        return prev;
      }
      return [...prev, favorite];
    });
  };

  const removeFavorite = (streamerId: string) => {
    setFavorites(prev => prev.filter(f => f.streamerId !== streamerId));
  };

  const isFavorite = (streamerId: string): boolean => {
    return favorites.some(f => f.streamerId === streamerId);
  };

  const toggleFavorite = (favorite: Favorite) => {
    if (isFavorite(favorite.streamerId)) {
      removeFavorite(favorite.streamerId);
    } else {
      addFavorite(favorite);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    isLoaded,
  };
};
