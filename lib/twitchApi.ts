// Twitch API integration service

interface TwitchAccessToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface TwitchStream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  tags: string[];
  is_mature: boolean;
}

interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: string;
}

interface TwitchGame {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id: string;
}

class TwitchAPI {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || '';
    this.clientSecret = process.env.TWITCH_CLIENT_SECRET || '';
    
    // Only log once on initialization if credentials are missing
    if (!this.clientId || !this.clientSecret) {
      if (typeof window === 'undefined') {
        // Only log on server-side to avoid console spam
        console.info('Twitch API credentials not configured. Using mock data fallback.');
      }
    }
  }

  // Check if API is properly configured
  private isConfigured(): boolean {
    return !!(this.clientId && this.clientSecret && this.clientId.length > 10 && this.clientSecret.length > 10);
  }

  // Get OAuth access token
  private async getAccessToken(): Promise<string> {
    // Check if API is configured
    if (!this.isConfigured()) {
      throw new Error('Twitch API credentials not configured');
    }

    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Twitch OAuth error:', errorText);
        throw new Error(`Failed to get Twitch access token: ${response.status}`);
      }

      const data: TwitchAccessToken = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min before expiry

      return this.accessToken;
    } catch (error) {
      console.error('Error getting Twitch access token:', error);
      throw error;
    }
  }

  // Generic API request method
  private async makeRequest<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const token = await this.getAccessToken();
    const url = new URL(`https://api.twitch.tv/helix/${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Client-ID': this.clientId,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Twitch API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Get top live streams
  async getTopStreams(first: number = 20): Promise<TwitchStream[]> {
    if (!this.isConfigured()) {
      // Silently return empty array to allow fallback to mock data
      return [];
    }
    
    try {
      const data = await this.makeRequest<{ data: TwitchStream[] }>('streams', {
        first: first.toString(),
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching top streams:', error);
      return [];
    }
  }

  // Get streams by game ID
  async getStreamsByGame(gameId: string, first: number = 20): Promise<TwitchStream[]> {
    if (!this.isConfigured()) {
      // Silently return empty array to allow fallback to mock data
      return [];
    }
    
    try {
      const data = await this.makeRequest<{ data: TwitchStream[] }>('streams', {
        game_id: gameId,
        first: first.toString(),
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching streams by game:', error);
      return [];
    }
  }

  // Get top games/categories
  async getTopGames(first: number = 20): Promise<TwitchGame[]> {
    if (!this.isConfigured()) {
      // Silently return empty array to allow fallback to mock data
      return [];
    }
    
    try {
      const data = await this.makeRequest<{ data: TwitchGame[] }>('games/top', {
        first: first.toString(),
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching top games:', error);
      return [];
    }
  }

  // Get user information
  async getUsers(userLogins: string[]): Promise<TwitchUser[]> {
    try {
      const params: Record<string, string> = {};
      userLogins.forEach((login, index) => {
        params[`login`] = login;
      });

      const data = await this.makeRequest<{ data: TwitchUser[] }>('users', {
        login: userLogins.join(','),
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  // Search channels
  async searchChannels(query: string, first: number = 20): Promise<any[]> {
    if (!this.isConfigured()) {
      // Silently return empty array to allow fallback to mock data
      return [];
    }
    
    try {
      const data = await this.makeRequest<{ data: any[] }>('search/channels', {
        query,
        first: first.toString(),
        live_only: 'true',
      });
      return data.data;
    } catch (error) {
      console.error('Error searching channels:', error);
      return [];
    }
  }

  // Get stream by user login
  async getStreamByUsername(username: string): Promise<TwitchStream | null> {
    if (!this.isConfigured()) {
      // Silently return null to allow fallback to mock data
      return null;
    }
    
    try {
      const data = await this.makeRequest<{ data: TwitchStream[] }>('streams', {
        user_login: username,
      });
      return data.data[0] || null;
    } catch (error) {
      console.error('Error fetching stream by username:', error);
      return null;
    }
  }

  // Get stream by stream ID or user ID
  async getStreamById(id: string): Promise<TwitchStream | null> {
    if (!this.isConfigured()) {
      // Silently return null to allow fallback to mock data
      return null;
    }
    
    try {
      // First try to get by user_id (stream ID)
      const streamData = await this.makeRequest<{ data: TwitchStream[] }>('streams', {
        user_id: id,
      });
      if (streamData.data[0]) {
        return streamData.data[0];
      }
      
      // If not found, try getting user info first then stream
      const userData = await this.makeRequest<{ data: TwitchUser[] }>('users', {
        id: id,
      });
      
      if (userData.data[0]) {
        return this.getStreamByUsername(userData.data[0].login);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching stream by ID:', error);
      return null;
    }
  }

  // Format thumbnail URL
  formatThumbnailUrl(url: string, width: number = 440, height: number = 248): string {
    return url.replace('{width}', width.toString()).replace('{height}', height.toString());
  }

  // Format box art URL
  formatBoxArtUrl(url: string, width: number = 285, height: number = 380): string {
    return url.replace('{width}', width.toString()).replace('{height}', height.toString());
  }
}

// Export singleton instance
export const twitchAPI = new TwitchAPI();
export type { TwitchStream, TwitchUser, TwitchGame };
