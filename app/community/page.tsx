'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports to prevent SSR issues
const ForumSection = dynamic(() => import('./components/ForumSection'), { 
  loading: () => <div className="animate-pulse h-96 bg-gray-100 rounded-lg" />,
  ssr: false 
});
const ChatSection = dynamic(() => import('./components/ChatSection'), { 
  loading: () => <div className="animate-pulse h-96 bg-gray-100 rounded-lg" />,
  ssr: false 
});
const EventsSection = dynamic(() => import('./components/EventsSection'), { 
  loading: () => <div className="animate-pulse h-96 bg-gray-100 rounded-lg" />,
  ssr: false 
});
const MembersSection = dynamic(() => import('./components/MembersSection'), { 
  loading: () => <div className="animate-pulse h-96 bg-gray-100 rounded-lg" />,
  ssr: false 
});
const GuidelinesSection = dynamic(() => import('./components/GuidelinesSection'), { 
  loading: () => <div className="animate-pulse h-96 bg-gray-100 rounded-lg" />,
  ssr: false 
});

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('forum');

  const tabs = [
    { id: 'forum', label: 'Forums & Discussions', icon: '💬' },
    { id: 'chat', label: 'Real-Time Chat', icon: '⚡' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'guidelines', label: 'Guidelines', icon: '📋' },
  ];

  return (
    <main className="min-h-screen px-4 py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Community Network
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our network of autonomous communities working together through shared protocols and memetic structures.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 min-h-[600px]">
          {activeTab === 'forum' && <ForumSection />}
          {activeTab === 'chat' && <ChatSection />}
          {activeTab === 'events' && <EventsSection />}
          {activeTab === 'members' && <MembersSection />}
          {activeTab === 'guidelines' && <GuidelinesSection />}
        </div>
      </div>
    </main>
  );
}
