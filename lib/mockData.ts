// Mock data for Twitch streams and categories

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
  },
];

// Featured stream for hero section
export const featuredStream = mockStreams[2]; // Faker's stream

// Mock function to get streams by category
export const getStreamsByCategory = (categoryName: string): Stream[] => {
  return mockStreams.filter(stream => 
    stream.game.toLowerCase().includes(categoryName.toLowerCase())
  );
};

// Mock function to search streams
export const searchStreams = (query: string): Stream[] => {
  const lowerQuery = query.toLowerCase();
  return mockStreams.filter(stream =>
    stream.title.toLowerCase().includes(lowerQuery) ||
    stream.streamerName.toLowerCase().includes(lowerQuery) ||
    stream.game.toLowerCase().includes(lowerQuery)
  );
};

// Mock function to get stream by ID
export const getStreamById = (id: string): Stream | undefined => {
  return mockStreams.find(stream => stream.id === id);
};

// Mock function to get related streams
export const getRelatedStreams = (currentStreamId: string, game: string): Stream[] => {
  return mockStreams
    .filter(stream => stream.id !== currentStreamId && stream.game === game)
    .slice(0, 4);
};
