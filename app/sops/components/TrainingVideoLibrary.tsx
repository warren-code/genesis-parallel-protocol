'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOPSection, TrainingVideo } from '@/types/sop';
import { 
  Play, Pause, Video, Clock, Tag, Search, 
  Filter, Upload, Link, Youtube, FileVideo,
  BookOpen, Award, CheckCircle2, X
} from 'lucide-react';

interface TrainingVideoLibraryProps {
  sopSection?: SOPSection;
}

export function TrainingVideoLibrary({ sopSection }: TrainingVideoLibraryProps) {
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<TrainingVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [videoProgress, setVideoProgress] = useState<Record<string, number>>({});

  // Mock data - in production, this would fetch from your database
  useEffect(() => {
    const mockVideos: TrainingVideo[] = [
      {
        id: 'v1',
        title: 'Emergency Evacuation Procedures',
        description: 'Complete guide on safely evacuating buildings during emergencies',
        url: 'https://example.com/evacuation.mp4',
        duration: '12:45',
        sopSectionId: sopSection?.id,
        tags: ['evacuation', 'emergency', 'safety']
      },
      {
        id: 'v2',
        title: 'Lockdown Protocol Training',
        description: 'Step-by-step instructions for implementing lockdown procedures',
        url: 'https://example.com/lockdown.mp4',
        duration: '8:30',
        sopSectionId: sopSection?.id,
        tags: ['lockdown', 'security', 'protocol']
      },
      {
        id: 'v3',
        title: 'First Aid Response Basics',
        description: 'Essential first aid techniques for security personnel',
        url: 'https://example.com/firstaid.mp4',
        duration: '15:20',
        tags: ['first-aid', 'medical', 'emergency']
      },
      {
        id: 'v4',
        title: 'Communication During Crisis',
        description: 'Effective communication strategies during security incidents',
        url: 'https://example.com/communication.mp4',
        duration: '10:15',
        tags: ['communication', 'crisis', 'management']
      },
      {
        id: 'v5',
        title: 'Access Control Best Practices',
        description: 'Managing building access and visitor protocols',
        url: 'https://example.com/access.mp4',
        duration: '7:45',
        tags: ['access-control', 'visitors', 'security']
      }
    ];

    // Initialize mock progress
    const progress: Record<string, number> = {};
    mockVideos.forEach(video => {
      progress[video.id] = Math.random() * 100;
    });
    setVideoProgress(progress);

    setVideos(mockVideos);
  }, [sopSection]);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => video.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const allTags = Array.from(new Set(videos.flatMap(v => v.tags)));

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const formatDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(':');
    return `${minutes}m ${seconds}s`;
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 50) return 'bg-yellow-500';
    return 'bg-[#00ff00]';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#00ff00]/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Video className="w-8 h-8 text-[#00ff00]" />
              Training Video Library
            </h2>
            <p className="text-gray-400 mt-1">
              {sopSection 
                ? `Training videos for: ${sopSection.title}`
                : 'Browse all training videos'
              }
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-[#00ff00] text-black rounded-lg hover:bg-[#00cc00] transition-colors flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Video
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#00ff00] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Filter by tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-[#00ff00] text-black'
                      : 'bg-[#0a0a0a] border border-gray-700 text-gray-400 hover:border-[#00ff00]'
                  }`}
                >
                  <Tag className="w-3 h-3 inline mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-[#0a0a0a] rounded-lg p-4 text-center">
            <FileVideo className="w-8 h-8 text-[#00ff00] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{videos.length}</p>
            <p className="text-sm text-gray-400">Total Videos</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-[#00ff00] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">2h 15m</p>
            <p className="text-sm text-gray-400">Total Duration</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-lg p-4 text-center">
            <Award className="w-8 h-8 text-[#00ff00] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">68%</p>
            <p className="text-sm text-gray-400">Completion Rate</p>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => {
          const progress = videoProgress[video.id] || 0;
          const isCompleted = progress === 100;

          return (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#00ff00]/20 hover:border-[#00ff00]/50 transition-all cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-[#0a0a0a] group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-[#00ff00]/20 rounded-full flex items-center justify-center group-hover:bg-[#00ff00]/30 transition-colors"
                  >
                    <Play className="w-8 h-8 text-[#00ff00] ml-1" />
                  </motion.div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>

                {/* Completion Badge */}
                {isCompleted && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-green-500/90 rounded text-xs text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {video.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {video.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#0a0a0a] rounded-full text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-[#00ff00]">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full ${getProgressColor(progress)}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Videos Found</h3>
          <p className="text-gray-500">
            {searchQuery || selectedTags.length > 0
              ? 'Try adjusting your search or filters'
              : 'Upload your first training video to get started'
            }
          </p>
        </div>
      )}

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1a1a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-gray-400">{selectedVideo.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Video Player Placeholder */}
                <div className="aspect-video bg-[#0a0a0a] rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Youtube className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Video player would be embedded here</p>
                    <p className="text-sm text-gray-500 mt-2">{selectedVideo.url}</p>
                  </div>
                </div>

                {/* Video Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Duration</h4>
                    <p className="text-white">{formatDuration(selectedVideo.duration)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[#00ff00]/20 text-[#00ff00] rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 bg-[#00ff00] text-black rounded-lg hover:bg-[#00cc00] transition-colors font-semibold"
                  >
                    Mark as Complete
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border-2 border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-gray-300 transition-all"
                  >
                    Share
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1a1a] rounded-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-6">Upload Training Video</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Video Source
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-[#0a0a0a] border border-gray-700 rounded-lg hover:border-[#00ff00] transition-all">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Upload File</p>
                    </button>
                    <button className="p-4 bg-[#0a0a0a] border border-gray-700 rounded-lg hover:border-[#00ff00] transition-all">
                      <Link className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Add URL</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Video Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter video title"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#00ff00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the video content"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#00ff00] focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 bg-[#00ff00] text-black rounded-lg hover:bg-[#00cc00] transition-colors font-semibold"
                  >
                    Upload Video
                  </motion.button>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 border-2 border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
