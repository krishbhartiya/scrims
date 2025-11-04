'use client';

import { useState } from 'react';

interface ChatBoxProps {
  channel: string;
}

export default function ChatBox({ channel }: ChatBoxProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="bg-[#18181B] rounded-lg overflow-hidden border border-[#2D2D31] h-full flex flex-col">
      {/* Chat Header */}
      <div className="bg-[#1F1F23] px-4 py-3 border-b border-[#2D2D31] flex items-center justify-between">
        <h3 className="text-white font-semibold">Stream Chat</h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="lg:hidden text-[#ADADAD] hover:text-white transition-colors"
          aria-label={isVisible ? 'Hide chat' : 'Show chat'}
        >
          {isVisible ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat Content */}
      {isVisible && (
        <div className="flex-1 relative">
          {/* Twitch Chat Embed */}
          <iframe
            src={`https://www.twitch.tv/embed/${channel}/chat?parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&darkpopout`}
            className="w-full h-full"
          />
          
          {/* Fallback placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#0E0E10] -z-10">
            <div className="text-center text-[#ADADAD] px-4">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm">Chat loading...</p>
              <p className="text-xs mt-1 opacity-75">{channel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
