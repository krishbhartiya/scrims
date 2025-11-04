interface StreamPlayerProps {
  streamId: string;
  channel: string;
  autoplay?: boolean;
}

export default function StreamPlayer({ streamId, channel, autoplay = true }: StreamPlayerProps) {
  // In production, this would use the actual Twitch embed
  // For now, we'll create a placeholder that simulates the Twitch player
  
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {/* Twitch Player Embed - Replace with actual Twitch embed in production */}
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=${autoplay}`}
        className="w-full h-full"
        allowFullScreen
        allow="autoplay; fullscreen"
      />
      
      {/* Fallback placeholder when iframe doesn't load */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#9146FF] to-[#6441a5] -z-10">
        <div className="text-center text-white">
          <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
          </svg>
          <p className="text-lg font-semibold">Live Stream Player</p>
          <p className="text-sm opacity-75 mt-2">Channel: {channel}</p>
        </div>
      </div>
    </div>
  );
}
