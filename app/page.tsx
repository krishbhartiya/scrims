import Link from 'next/link';
import StreamGrid from '@/components/StreamGrid';
import CategoryCarousel from '@/components/CategoryCarousel';
import { mockStreams, mockCategories, featuredStream } from '@/lib/mockData';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Featured Stream */}
      <section className="relative h-[600px] bg-gradient-to-b from-[#9146FF]/20 to-transparent overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredStream.thumbnail}
            alt={featuredStream.title}
            className="w-full h-full object-cover opacity-20 blur-md scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/90 to-[#0E0E10]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E10] via-transparent to-[#0E0E10]/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-3">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse shadow-lg shadow-red-600/50">
                🔴 LIVE
              </span>
              <span className="text-[#ADADAD] text-sm font-medium">
                {featuredStream.viewers.toLocaleString()} viewers watching
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {featuredStream.title}
            </h1>
            
            <div className="flex items-center space-x-4 p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
              <img
                src={featuredStream.streamerAvatar}
                alt={featuredStream.streamerName}
                className="w-14 h-14 rounded-full border-2 border-[#9146FF] shadow-lg"
              />
              <div>
                <p className="text-white font-semibold text-lg">{featuredStream.streamerName}</p>
                <p className="text-[#ADADAD] text-sm">{featuredStream.game}</p>
              </div>
            </div>
            
            <Link
              href={`/stream/${featuredStream.id}`}
              className="inline-flex items-center px-8 py-4 bg-[#9146FF] text-white rounded-xl font-semibold hover:bg-[#7d3cd6] transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#9146FF]/50 group"
            >
              <span>Watch Now</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Browse Categories</h2>
            <p className="text-[#ADADAD]">Discover streams by your favorite games</p>
          </div>
          <Link
            href="/browse"
            className="text-[#9146FF] hover:text-[#7d3cd6] font-semibold text-sm flex items-center group"
          >
            <span>View All</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <CategoryCarousel categories={mockCategories} />
      </section>

      {/* Top Live Streams */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Top Live Streams</h2>
            <p className="text-[#ADADAD]">Watch the most popular streams right now</p>
          </div>
          <Link
            href="/browse"
            className="text-[#9146FF] hover:text-[#7d3cd6] font-semibold text-sm flex items-center group self-start sm:self-auto"
          >
            <span>See More</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <StreamGrid streams={mockStreams} />
      </section>
    </div>
  );
}
