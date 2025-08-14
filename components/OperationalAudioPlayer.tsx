'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaPause, FaRedo, FaVolumeMute, FaVolumeUp,
  FaCheckCircle, FaCircle, FaClock, FaFire
} from 'react-icons/fa';

interface OperationalAudioPlayerProps {
  trackTitle: string;
  artistName: string;
  audioUrl: string;
  className?: string;
}

interface ActStackItem {
  id: string;
  task: string;
  duration: string;
  completed: boolean;
}

const OperationalAudioPlayer: React.FC<OperationalAudioPlayerProps> = ({
  trackTitle,
  artistName,
  audioUrl,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [showActStack, setShowActStack] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [actStack, setActStack] = useState<ActStackItem[]>([
    { id: '1', task: '90s inbox zero', duration: '90s', completed: false },
    { id: '2', task: '3 outreach messages', duration: '3min', completed: false },
    { id: '3', task: '1 DAO vote', duration: '2min', completed: false }
  ]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setLoopCount(prev => prev + 1);
      audio.currentTime = 0;
      if (isPlaying) audio.play();
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      setShowActStack(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * duration;
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
    } else {
      audio.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const toggleTask = (taskId: string) => {
    setActStack(prev => prev.map(item => 
      item.id === taskId ? { ...item, completed: !item.completed } : item
    ));
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const completedTasks = actStack.filter(task => task.completed).length;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="glassmorphic-card p-6">
        {/* Track Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {trackTitle}
            {loopCount > 0 && (
              <span className="text-sm px-2 py-1 rounded-full bg-primary/20 text-primary flex items-center gap-1">
                <FaRedo className="text-xs" />
                Loop {loopCount}
              </span>
            )}
          </h3>
          <p className="text-gray-400">{artistName}</p>
        </div>

        {/* Audio Element */}
        <audio ref={audioRef} src={audioUrl} loop />

        {/* Progress Bar */}
        <div className="mb-4">
          <div 
            ref={progressRef}
            className="relative h-2 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayPause}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              {isPlaying ? (
                <FaPause className="text-white text-lg" />
              ) : (
                <FaPlay className="text-white text-lg ml-1" />
              )}
            </button>
            
            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaFire className="text-orange-500" />
            <span>Action Mode</span>
          </div>
        </div>
      </div>

      {/* Act Stack Checklist */}
      <AnimatePresence>
        {showActStack && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glassmorphic-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <FaClock className="text-primary" />
                  Act Stack ({completedTasks}/{actStack.length})
                </h4>
                {completedTasks === actStack.length && (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                    Complete! 🎯
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {actStack.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      task.completed 
                        ? 'bg-green-500/10 border border-green-500/30' 
                        : 'bg-black/30 border border-white/10 hover:border-primary/30'
                    }`}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? (
                      <FaCheckCircle className="text-green-400 text-lg" />
                    ) : (
                      <FaCircle className="text-gray-500 text-lg" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? 'text-green-400 line-through' : 'text-gray-300'}`}>
                        {task.task}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{task.duration}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
                <p className="text-xs text-gray-300">
                  <strong className="text-primary">Pro tip:</strong> Loop the track until all tasks complete. 
                  Each loop strengthens the action-trigger association.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OperationalAudioPlayer;
