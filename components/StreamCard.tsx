'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Stream } from '@/lib/mockData';
import { useFavorites } from '@/hooks/useFavorites';

interface StreamCardProps {
  stream: Stream;
}

export default function StreamCard({ stream }: StreamCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(stream.id);

  const formatViewers = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({
      streamerId: stream.id,
      streamerName: stream.streamerName,
      streamerAvatar: stream.streamerAvatar,
    });
  };

  return (
    <Link href={`/stream/${stream.id}`} className="group block">
      <div className="relative rounded-xl overflow-hidden bg-[#18181B] border border-[#2D2D31] transition-all duration-300 hover:border-[#9146FF] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#9146FF]/20">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-[#0E0E10]">
          <img
            src={stream.thumbnail}
            alt={stream.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Live Badge */}
          {stream.isLive && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg flex items-center space-x-1 animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              <span>LIVE</span>
            </div>
          )}

          {/* Viewers */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-lg flex items-center space-x-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{formatViewers(stream.viewers)}</span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full transition-all hover:scale-110 shadow-lg"
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFav ? (
              <svg className="w-5 h-5 text-[#9146FF] fill-current drop-shadow-lg" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={stream.streamerAvatar}
                alt={stream.streamerName}
                className="w-12 h-12 rounded-full border-2 border-[#2D2D31] group-hover:border-[#9146FF] transition-colors shadow-md"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1.5 group-hover:text-[#9146FF] transition-colors leading-snug">
                {stream.title}
              </h3>
              <p className="text-[#ADADAD] text-sm font-medium">{stream.streamerName}</p>
              <p className="text-[#ADADAD] text-xs mt-0.5">{stream.game}</p>
              
              {/* Tags */}
              {stream.tags && stream.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {stream.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#2D2D31] text-[#ADADAD] px-2.5 py-1 rounded-full font-medium hover:bg-[#3D3D41] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
