'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaPlay, FaSpotify, FaSoundcloud, FaBandcamp } from 'react-icons/fa';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';

const artists = [
  {
    name: "Recursion Collective",
    image: "/images/artists/recursion-collective.jpg",
    role: "Experimental Electronic",
    contribution: "Pioneering rhythm-based SRL induction",
    links: {
      website: "https://recursion-collective.com",
      spotify: "https://open.spotify.com/artist/...",
      soundcloud: "https://soundcloud.com/recursion-collective"
    }
  },
  {
    name: "The Protocol",
    image: "/images/artists/the-protocol.jpg",
    role: "Industrial Hip-Hop",
    contribution: "Protocol encoding through rhyme patterns",
    links: {
      website: "https://theprotocol.xyz",
      bandcamp: "https://theprotocol.bandcamp.com",
      soundcloud: "https://soundcloud.com/the-protocol"
    }
  },
  {
    name: "Loop Horizon",
    image: "/images/artists/loop-horizon.jpg",
    role: "Ambient / IDM",
    contribution: "Generative compositions from loop data",
    links: {
      website: "https://loophorizon.net",
      spotify: "https://open.spotify.com/artist/...",
      soundcloud: "https://soundcloud.com/loop-horizon"
    }
  }
];

const ArtistSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mb-16"
    >
      <GlassmorphicCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Featured Artists: <GlossaryTooltip term="Operational Art">Operational Art</GlossaryTooltip> in Practice
        </h2>
        
        <p className="text-gray-300 mb-8">
          Meet the artists pioneering <GlossaryTooltip term="Operational Art">operational art</GlossaryTooltip>. 
          Their work isn't just music—it's a toolkit for seeding <GlossaryTooltip term="SRL">SRLs</GlossaryTooltip> and 
          building parallel culture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <GlassmorphicCard 
                className="h-full hover:border-accent/50 transition-all duration-300 overflow-hidden"
                blur="sm"
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-xl font-bold text-white mb-1">{artist.name}</h3>
                    <p className="text-sm text-gray-300">{artist.role}</p>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-gray-400 text-sm mb-4">{artist.contribution}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {artist.links.website && (
                      <a
                        href={artist.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-full text-xs text-accent flex items-center gap-1.5 transition-all duration-200"
                      >
                        <FaExternalLinkAlt />
                        Website
                      </a>
                    )}
                    {artist.links.spotify && (
                      <a
                        href={artist.links.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400 flex items-center gap-1.5 transition-all duration-200"
                      >
                        <FaSpotify />
                        Spotify
                      </a>
                    )}
                    {artist.links.soundcloud && (
                      <a
                        href={artist.links.soundcloud}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-full text-xs text-orange-400 flex items-center gap-1.5 transition-all duration-200"
                      >
                        <FaSoundcloud />
                        SoundCloud
                      </a>
                    )}
                    {artist.links.bandcamp && (
                      <a
                        href={artist.links.bandcamp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400 flex items-center gap-1.5 transition-all duration-200"
                      >
                        <FaBandcamp />
                        Bandcamp
                      </a>
                    )}
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>

        {/* Latest Releases */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Latest Releases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassmorphicCard className="p-6 border-accent/30">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src="/images/releases/act-not-distract.jpg"
                    alt="Act, Not Distract"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Act, Not Distract</h4>
                  <p className="text-sm text-gray-400 mb-3">The Protocol ft. Loop Horizon</p>
                  <Link
                    href="https://soundcouch.soundcloud.com/#/profile/1566767877"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 rounded-lg text-sm text-accent transition-all duration-200"
                  >
                    <FaPlay className="text-xs" />
                    Listen Now
                  </Link>
                </div>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard className="p-6 border-signal/30">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src="/images/releases/recursion-patterns.jpg"
                    alt="Recursion Patterns"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Recursion Patterns</h4>
                  <p className="text-sm text-gray-400 mb-3">Recursion Collective</p>
                  <Link
                    href="https://soundcouch.soundcloud.com/#/profile/1566767877"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-signal/10 hover:bg-signal/20 rounded-lg text-sm text-signal transition-all duration-200"
                  >
                    <FaPlay className="text-xs" />
                    Listen Now
                  </Link>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/artist-submission">
            <button className="px-8 py-4 bg-gradient-to-r from-accent to-signal text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all duration-300">
              Submit Your Operational Art
            </button>
          </Link>
        </div>
      </GlassmorphicCard>
    </motion.section>
  );
};

export default ArtistSection;
