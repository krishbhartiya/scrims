'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import StreamPlayer from '@/components/StreamPlayer';
import ChatBox from '@/components/ChatBox';
import StreamCard from '@/components/StreamCard';
import { getStreamById, getRelatedStreams } from '@/lib/mockData';
import { useFavorites } from '@/hooks/useFavorites';

export default function StreamPage() {
  const params = useParams();
  const streamId = params.id as string;
  const stream = getStreamById(streamId);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!stream) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="w-20 h-20 text-[#ADADAD] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Stream Not Found</h2>
          <p className="text-[#ADADAD] mb-6">The stream you're looking for doesn't exist.</p>
          <Link
            href="/browse"
            className="inline-flex items-center px-6 py-3 bg-[#9146FF] text-white rounded-lg font-semibold hover:bg-[#7d3cd6] transition-all"
          >
            Browse Streams
          </Link>
        </div>
      </div>
    );
  }

  const relatedStreams = getRelatedStreams(streamId, stream.game);
  const isFav = isFavorite(streamId);

  const handleFavoriteClick = () => {
    toggleFavorite({
      streamerId: stream.id,
      streamerName: stream.streamerName,
      streamerAvatar: stream.streamerAvatar,
    });
  };

  const formatViewers = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-[#0E0E10]">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Video Player */}
            <StreamPlayer 
              streamId={stream.id} 
              channel={stream.streamerName.toLowerCase().replace(/\s+/g, '')} 
            />

            {/* Stream Info */}
            <div className="bg-[#18181B] rounded-lg p-4 border border-[#2D2D31]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <img
                    src={stream.streamerAvatar}
                    alt={stream.streamerName}
                    className="w-16 h-16 rounded-full border-2 border-[#9146FF]"
                  />
                  <div className="flex-1">
                    <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {stream.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <Link 
                        href={`/browse?category=${encodeURIComponent(stream.game)}`}
                        className="text-[#9146FF] hover:text-[#7d3cd6] font-medium"
                      >
                        {stream.game}
                      </Link>
                      <span className="text-[#ADADAD]">•</span>
                      <div className="flex items-center space-x-2">
                        {stream.isLive && (
                          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            LIVE
                          </span>
                        )}
                        <span className="text-[#ADADAD]">
                          👁 {formatViewers(stream.viewers)} viewers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={handleFavoriteClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#2D2D31] hover:bg-[#3D3D41] rounded-lg transition-all"
                >
                  {isFav ? (
                    <>
                      <svg className="w-5 h-5 text-[#9146FF] fill-current" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      <span className="text-white font-medium text-sm">Favorited</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-white font-medium text-sm">Favorite</span>
                    </>
                  )}
                </button>
              </div>

              {/* Streamer Info */}
              <div className="flex items-center space-x-4 pt-4 border-t border-[#2D2D31]">
                <h3 className="text-white font-semibold text-lg">{stream.streamerName}</h3>
              </div>

              {/* Tags */}
              {stream.tags && stream.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {stream.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-[#2D2D31] text-[#ADADAD] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Related Streams */}
            {relatedStreams.length > 0 && (
              <div className="bg-[#18181B] rounded-lg p-4 border border-[#2D2D31]">
                <h2 className="text-xl font-bold text-white mb-4">
                  More {stream.game} Streams
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedStreams.map((relatedStream) => (
                    <StreamCard key={relatedStream.id} stream={relatedStream} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat Sidebar */}
          <div className="w-full lg:w-[340px] xl:w-[400px] h-[600px] lg:h-auto lg:sticky lg:top-20">
            <ChatBox channel={stream.streamerName.toLowerCase().replace(/\s+/g, '')} />
          </div>
        </div>
      </div>
    </div>
  );
}
