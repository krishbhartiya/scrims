// Mock data for Twitch streams and categories
import { twitchAPI, TwitchStream as TwitchAPIStream, TwitchGame } from './twitchApi';

export interface Stream {
  id: string;
  title: string;
  streamerName: string;
  streamerAvatar: string;
  game: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
  tags?: string[];
  userLogin?: string; // Add user login for proper stream linking
}

export interface Category {
  id: string;
  name: string;
  thumbnail: string;
  viewers: number;
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Just Chatting',
    thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg',
    viewers: 234567,
  },
  {
    id: '2',
    name: 'League of Legends',
    thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg',
    viewers: 189234,
  },
  {
    id: '3',
    name: 'Valorant',
    thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg',
    viewers: 156789,
  },
  {
    id: '4',
    name: 'Minecraft',
    thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg',
    viewers: 145678,
  },
  {
    id: '5',
    name: 'Fortnite',
    thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg',
    viewers: 134567,
  },
  {
    id: '6',
    name: 'Counter-Strike 2',
    thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-285x380.jpg',
    viewers: 123456,
  },
];

export const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'VALORANT RANKED - Road to Radiant! !socials',
    streamerName: 'TenZ',
    streamerAvatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4b0d6f8e-7740-44a2-8f5d-d5fe7e7d5a5e-profile_image-70x70.png',
    game: 'Valorant',
    viewers: 45230,
    thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_tenz-440x248.jpg',
    isLive: true,
    tags: ['English', 'FPS', 'Pro Player'],
    userLogin: 'tenz',
  },
  {
    id: '2',
    title: 'CHILLING WITH CHAT | !newvid',
    streamerName: 'Pokimane',
    streamerAvatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3b7b4da8-f90f-4e9d-9b3d-1f3f5c5e8e1a-profile_image-70x70.png',
    game: 'Just Chatting',
    viewers: 38540,
    thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_pokimane-440x248.jpg',
    isLive: true,
    tags: ['English', 'Variety'],
    userLogin: 'pokimane',
  },
  {
    id: '3',
    title: 'WORLDS BOOTCAMP - SCRIMS ALL DAY',
    streamerName: 'Faker',
    streamerAvatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/faker-profile_image-70x70.png',
    game: 'League of Legends',
    viewers: 52340,
    thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_faker-440x248.jpg',
    isLive: true,
    tags: ['Korean', 'Pro Player', 'MOBA'],
    userLogin: 'faker',
  },
  {
    id: '4',
    title: 'Building the ULTIMATE base! - Hardcore Mode',
    streamerName: 'Dream',
    streamerAvatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/dream-profile_image-70x70.png',
    game: 'Minecraft',
    viewers: 29870,
    thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_dream-440x248.jpg',
    isLive: true,
    tags: ['English', 'Survival', 'Speedrun'],
    userLogin: 'dream',
  },
  {
    id: '5',
    title: 'FPL FACEIT - GRINDING TO THE TOP !settings',
    streamerName: 's1mple',
    streamerAvatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/s1mple-profile_image-70x70.png',
    game: 'Counter-Strike 2',
    viewers: 41230,
    thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_s1mple-440x248.jpg',
    isLive: true,
    tags: ['English', 'FPS', 'Pro Player'],
    userLogin: 's1mple',
  },
  {
    id: '6',
    title: 'ARENA DUOS w/ Clix | !socials !prime',
    streamerName: 'Ninja',
    streamerAvatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ninja-profile_image-70x70.png',
    game: 'Fortnite',
    viewers: 35600,
    thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_ninja-440x248.jpg',
    isLive: true,
    tags: ['English', 'Battle Royale'],
    userLogin: 'ninja',
  },
  {
    id: '7',
    title: 'Solo Queue Challenger - Best ADC NA !discord',
    streamerName: 'Doublelift',
    streamerAvatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/doublelift-profile_image-70x70.png',
    game: 'League of Legends',
    viewers: 18900,
    thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_doublelift-440x248.jpg',
    isLive: true,
    tags: ['English', 'MOBA', 'Educational'],
    userLogin: 'doublelift',
  },
  {
    id: '8',
    title: 'RADIANT RANKED - Educational Commentary !coaching',
    streamerName: 'Shroud',
    streamerAvatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/shroud-profile_image-70x70.png',
    game: 'Valorant',
    viewers: 27450,
    thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_shroud-440x248.jpg',
    isLive: true,
    tags: ['English', 'FPS', 'Educational'],
    userLogin: 'shroud',
  },
];

// Convert Twitch API stream to our Stream format
const convertTwitchStream = (twitchStream: TwitchAPIStream): Stream => ({
  id: twitchStream.user_id,
  title: twitchStream.title,
  streamerName: twitchStream.user_name,
  streamerAvatar: `https://static-cdn.jtvnw.net/jtv_user_pictures/${twitchStream.user_login}-profile_image-70x70.png`,
  game: twitchStream.game_name,
  viewers: twitchStream.viewer_count,
  thumbnail: twitchAPI.formatThumbnailUrl(twitchStream.thumbnail_url),
  isLive: twitchStream.type === 'live',
  tags: twitchStream.tags || [],
  userLogin: twitchStream.user_login,
});

// Convert Twitch API game to our Category format
const convertTwitchGame = (twitchGame: TwitchGame, viewerCount: number = 0): Category => ({
  id: twitchGame.id,
  name: twitchGame.name,
  thumbnail: twitchAPI.formatBoxArtUrl(twitchGame.box_art_url),
  viewers: viewerCount,
});

// Get live streams from Twitch API
export const getLiveStreams = async (limit: number = 20): Promise<Stream[]> => {
  try {
    const twitchStreams = await twitchAPI.getTopStreams(limit);
    return twitchStreams.map(convertTwitchStream);
  } catch (error) {
    console.error('Error fetching live streams:', error);
    return mockStreams; // Fallback to mock data
  }
};

// Get top categories from Twitch API
export const getTopCategories = async (limit: number = 20): Promise<Category[]> => {
  try {
    const twitchGames = await twitchAPI.getTopGames(limit);
    return twitchGames.map((game, index) => 
      convertTwitchGame(game, 100000 - (index * 5000))
    );
  } catch (error) {
    console.error('Error fetching top categories:', error);
    return mockCategories; // Fallback to mock data
  }
};

// Featured stream for hero section
export const getFeaturedStream = async (): Promise<Stream> => {
  try {
    const streams = await getLiveStreams(1);
    return streams[0] || mockStreams[0];
  } catch (error) {
    return mockStreams[2]; // Fallback to mock featured stream
  }
};

export const featuredStream = mockStreams[2]; // Faker's stream (for initial render)

// Get streams by category
export const getStreamsByCategory = async (categoryName: string, limit: number = 20): Promise<Stream[]> => {
  try {
    // First, search for the game to get its ID
    const games = await twitchAPI.getTopGames(100);
    const game = games.find(g => g.name.toLowerCase().includes(categoryName.toLowerCase()));
    
    if (game) {
      const twitchStreams = await twitchAPI.getStreamsByGame(game.id, limit);
      return twitchStreams.map(convertTwitchStream);
    }
    
    // Fallback to mock data
    return mockStreams.filter(stream => 
      stream.game.toLowerCase().includes(categoryName.toLowerCase())
    );
  } catch (error) {
    console.error('Error fetching streams by category:', error);
    return mockStreams.filter(stream => 
      stream.game.toLowerCase().includes(categoryName.toLowerCase())
    );
  }
};

// Search streams
export const searchStreams = async (query: string, limit: number = 20): Promise<Stream[]> => {
  try {
    const results = await twitchAPI.searchChannels(query, limit);
    // Convert search results to Stream format
    const streams: Stream[] = results.map((channel: any) => ({
      id: channel.id,
      title: channel.title || `${channel.display_name}'s stream`,
      streamerName: channel.display_name,
      streamerAvatar: channel.thumbnail_url || `https://static-cdn.jtvnw.net/jtv_user_pictures/${channel.broadcaster_login}-profile_image-70x70.png`,
      game: channel.game_name || 'No Category',
      viewers: 0,
      thumbnail: channel.thumbnail_url || '',
      isLive: channel.is_live,
      tags: channel.tags || [],
      userLogin: channel.broadcaster_login,
    }));
    return streams;
  } catch (error) {
    console.error('Error searching streams:', error);
    // Fallback to mock search
    const lowerQuery = query.toLowerCase();
    return mockStreams.filter(stream =>
      stream.title.toLowerCase().includes(lowerQuery) ||
      stream.streamerName.toLowerCase().includes(lowerQuery) ||
      stream.game.toLowerCase().includes(lowerQuery)
    );
  }
};

// Get stream by ID or username
export const getStreamById = async (id: string): Promise<Stream | undefined> => {
  try {
    // Try to get stream by ID from Twitch API
    const stream = await twitchAPI.getStreamById(id);
    if (stream) {
      return convertTwitchStream(stream);
    }
    
    // If numeric ID fails, try as username
    const streamByUsername = await twitchAPI.getStreamByUsername(id);
    if (streamByUsername) {
      return convertTwitchStream(streamByUsername);
    }
    
    // Fallback to mock data
    return mockStreams.find(stream => stream.id === id);
  } catch (error) {
    console.error('Error fetching stream by ID:', error);
    return mockStreams.find(stream => stream.id === id);
  }
};

// Get related streams
export const getRelatedStreams = async (currentStreamId: string, game: string, limit: number = 4): Promise<Stream[]> => {
  try {
    const streams = await getStreamsByCategory(game, limit + 1);
    return streams.filter(stream => stream.id !== currentStreamId).slice(0, limit);
  } catch (error) {
    console.error('Error fetching related streams:', error);
    return mockStreams
      .filter(stream => stream.id !== currentStreamId && stream.game === game)
      .slice(0, limit);
  }
};
