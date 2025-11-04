'use client';

import { useState, useCallback, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import StreamGrid from '@/components/StreamGrid';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { getLiveStreams, getTopCategories, searchStreams, getStreamsByCategory, Stream, Category } from '@/lib/mockData';

export default function BrowsePage() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredStreams, setFilteredStreams] = useState<Stream[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [fetchedStreams, fetchedCategories] = await Promise.all([
        getLiveStreams(50),
        getTopCategories(10)
      ]);
      setStreams(fetchedStreams);
      setCategories(fetchedCategories);
      setFilteredStreams(fetchedStreams);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    if (query.trim() === '') {
      if (selectedCategory === 'all') {
        setFilteredStreams(streams);
      } else {
        const categoryStreams = await getStreamsByCategory(selectedCategory, 50);
        setFilteredStreams(categoryStreams);
      }
    } else {
      const results = await searchStreams(query, 50);
      if (selectedCategory !== 'all') {
        setFilteredStreams(results.filter(s => s.game === selectedCategory));
      } else {
        setFilteredStreams(results);
      }
    }
    setIsLoading(false);
  }, [selectedCategory, streams]);

  const handleCategoryChange = async (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    
    if (category === 'all') {
      if (searchQuery) {
        const results = await searchStreams(searchQuery, 50);
        setFilteredStreams(results);
      } else {
        setFilteredStreams(streams);
      }
    } else {
      const categoryStreams = await getStreamsByCategory(category, 50);
      if (searchQuery) {
        setFilteredStreams(categoryStreams.filter(s => 
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.streamerName.toLowerCase().includes(searchQuery.toLowerCase())
        ));
      } else {
        setFilteredStreams(categoryStreams);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#9146FF]/10 via-[#9146FF]/5 to-transparent border-b border-[#2D2D31]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Browse Streams</h1>
            <p className="text-[#ADADAD] text-lg">Discover live streams from thousands of creators</p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#9146FF] text-white shadow-lg shadow-[#9146FF]/30 scale-105'
                  : 'bg-[#18181B] text-[#ADADAD] hover:bg-[#2D2D31] hover:text-white border border-[#2D2D31]'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                  selectedCategory === category.name
                    ? 'bg-[#9146FF] text-white shadow-lg shadow-[#9146FF]/30 scale-105'
                    : 'bg-[#18181B] text-[#ADADAD] hover:bg-[#2D2D31] hover:text-white border border-[#2D2D31]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {searchQuery ? `Results for "${searchQuery}"` : selectedCategory === 'all' ? 'All Streams' : selectedCategory}
            </h2>
            <p className="text-[#ADADAD] text-sm mt-1.5 flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-semibold text-white">{filteredStreams.length}</span>
              <span className="ml-1">{filteredStreams.length === 1 ? 'stream' : 'streams'} found</span>
            </p>
          </div>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <StreamGrid 
            streams={filteredStreams} 
            emptyMessage={searchQuery ? `No streams found for "${searchQuery}"` : 'No streams available'}
          />
        )}
      </div>
    </div>
  );
}
