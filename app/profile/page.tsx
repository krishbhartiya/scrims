'use client';

import { useFavorites } from '@/hooks/useFavorites';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/firebaseAuth';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockStreams } from '@/lib/mockData';

export default function ProfilePage() {
  const { favorites, removeFavorite, isLoaded } = useFavorites();
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const router = useRouter();

  // Format user data from Firebase
  const formatJoinDate = (timestamp: string | null) => {
    if (!timestamp) return 'Recently';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Redirect to login if not authenticated
  if (!loading && !user) {
    router.push('/auth/login');
    return null;
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9146FF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#9146FF]/10 via-[#9146FF]/5 to-transparent border-b border-[#2D2D31]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user?.photoURL || 'https://static-cdn.jtvnw.net/jtv_user_pictures/default-profile-image-70x70.png'}
                  alt={user?.displayName || 'User'}
                  className="w-28 h-28 rounded-full border-4 border-[#9146FF] shadow-xl shadow-[#9146FF]/30"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-[#18181B] rounded-full" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{user?.displayName || 'GameWave User'}</h1>
                <p className="text-[#ADADAD] flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {user?.email || user?.phoneNumber || 'No email'}
                </p>
                <p className="text-[#ADADAD] text-sm mt-1.5 flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Joined {formatJoinDate(user?.metadata?.creationTime || null)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 bg-[#2D2D31] text-white rounded-lg font-semibold hover:bg-red-600 transition-all hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-[#9146FF]/10 to-transparent border border-[#2D2D31] rounded-xl p-6 hover:border-[#9146FF] transition-all hover:shadow-lg hover:shadow-[#9146FF]/20">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#9146FF] to-[#7d3cd6] rounded-xl flex items-center justify-center shadow-lg shadow-[#9146FF]/30">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </div>
              <div>
                <p className="text-[#ADADAD] text-sm font-medium">Favorite Streamers</p>
                <p className="text-3xl font-bold text-white">{favorites.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#9146FF]/10 to-transparent border border-[#2D2D31] rounded-xl p-6 hover:border-[#9146FF] transition-all hover:shadow-lg hover:shadow-[#9146FF]/20">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#9146FF] to-[#7d3cd6] rounded-xl flex items-center justify-center shadow-lg shadow-[#9146FF]/30">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[#ADADAD] text-sm font-medium">Total Watch Time</p>
                <p className="text-3xl font-bold text-white">42h</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#9146FF]/10 to-transparent border border-[#2D2D31] rounded-xl p-6 hover:border-[#9146FF] transition-all hover:shadow-lg hover:shadow-[#9146FF]/20">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#9146FF] to-[#7d3cd6] rounded-xl flex items-center justify-center shadow-lg shadow-[#9146FF]/30">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <p className="text-[#ADADAD] text-sm font-medium">Current Theme</p>
                <p className="text-3xl font-bold text-white capitalize">{theme}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Streamers */}
        <div className="bg-[#18181B] rounded-xl border border-[#2D2D31] p-6 md:p-8">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <svg className="w-8 h-8 mr-3 text-[#9146FF]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            Favorite Streamers
          </h2>
          
          {favorites.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-[#9146FF]/5 to-transparent rounded-xl border-2 border-dashed border-[#2D2D31]">
              <svg className="w-20 h-20 text-[#ADADAD] mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-[#ADADAD] text-xl mb-3 font-semibold">No favorite streamers yet</p>
              <p className="text-[#ADADAD] text-sm mb-8 max-w-md mx-auto">
                Start adding your favorite streamers by clicking the heart icon on stream cards
              </p>
              <Link
                href="/browse"
                className="inline-flex items-center px-8 py-4 bg-[#9146FF] text-white rounded-xl font-semibold hover:bg-[#7d3cd6] transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#9146FF]/50"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Streams
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => {
                const stream = mockStreams.find(s => s.id === favorite.streamerId);
                return (
                  <div
                    key={favorite.streamerId}
                    className="bg-gradient-to-br from-[#1F1F23] to-[#18181B] rounded-xl p-5 border border-[#2D2D31] hover:border-[#9146FF] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#9146FF]/20"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <img
                          src={favorite.streamerAvatar}
                          alt={favorite.streamerName}
                          className="w-16 h-16 rounded-full border-2 border-[#9146FF] shadow-lg"
                        />
                        {stream?.isLive && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-[#18181B] rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-lg truncate">
                          {favorite.streamerName}
                        </h3>
                        {stream && (
                          <>
                            <p className="text-[#ADADAD] text-sm truncate">{stream.game}</p>
                            {stream.isLive && (
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center space-x-1 animate-pulse">
                                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                  <span>LIVE</span>
                                </span>
                                <span className="text-[#ADADAD] text-xs font-medium">
                                  {stream.viewers.toLocaleString()} viewers
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {stream && (
                        <Link
                          href={`/stream/${stream.id}`}
                          className="flex-1 px-4 py-2.5 bg-[#9146FF] text-white rounded-lg text-sm font-semibold hover:bg-[#7d3cd6] transition-all text-center hover:scale-105"
                        >
                          Watch Now
                        </Link>
                      )}
                      <button
                        onClick={() => removeFavorite(favorite.streamerId)}
                        className="px-4 py-2.5 bg-[#2D2D31] text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-all group"
                        aria-label="Remove from favorites"
                        title="Remove from favorites"
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
