'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOPVersion } from '@/types/sop';
import { Clock, User, FileText, RotateCcw, ChevronDown, ChevronUp, GitBranch, Calendar } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface SOPVersionHistoryProps {
  sopId?: string;
  onRestoreVersion: (version: SOPVersion) => void;
}

export function SOPVersionHistory({ sopId, onRestoreVersion }: SOPVersionHistoryProps) {
  const [versions, setVersions] = useState<SOPVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [compareVersions, setCompareVersions] = useState<[string | null, string | null]>([null, null]);
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);

  // Mock data - in production, this would fetch from your database
  useEffect(() => {
    if (sopId) {
      const mockVersions: SOPVersion[] = [
        {
          id: 'v1',
          sopId: sopId,
          version: '1.2.1',
          changes: 'Updated evacuation procedures for clarity',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          createdBy: 'John Doe',
          content: {} as any
        },
        {
          id: 'v2',
          sopId: sopId,
          version: '1.2.0',
          changes: 'Added new section for child safety protocols',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          createdBy: 'Jane Smith',
          content: {} as any
        },
        {
          id: 'v3',
          sopId: sopId,
          version: '1.1.0',
          changes: 'Revised communication protocols, added emergency contacts',
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          createdBy: 'Mike Johnson',
          content: {} as any
        },
        {
          id: 'v4',
          sopId: sopId,
          version: '1.0.0',
          changes: 'Initial version',
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          createdBy: 'System',
          content: {} as any
        }
      ];
      setVersions(mockVersions);
    }
  }, [sopId]);

  const toggleVersionExpansion = (versionId: string) => {
    setExpandedVersion(expandedVersion === versionId ? null : versionId);
  };

  const selectForComparison = (versionId: string) => {
    if (compareVersions[0] === null) {
      setCompareVersions([versionId, null]);
    } else if (compareVersions[1] === null && versionId !== compareVersions[0]) {
      setCompareVersions([compareVersions[0], versionId]);
    } else {
      setCompareVersions([versionId, null]);
    }
  };

  const clearComparison = () => {
    setCompareVersions([null, null]);
  };

  if (!sopId) {
    return (
      <div className="text-center py-20">
        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No SOP Selected</h3>
        <p className="text-gray-500">Select an SOP to view its version history</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#00ff00]/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-[#00ff00]" />
              Version History
            </h2>
            <p className="text-gray-400 mt-1">Track changes and restore previous versions</p>
          </div>
          
          {compareVersions[0] && compareVersions[1] && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearComparison}
              className="px-4 py-2 border-2 border-[#00ff00] text-[#00ff00] rounded-lg hover:bg-[#00ff00] hover:text-black transition-all"
            >
              Clear Comparison
            </motion.button>
          )}
        </div>

        {/* Comparison Info */}
        {(compareVersions[0] || compareVersions[1]) && (
          <div className="bg-[#0a0a0a] rounded-lg p-4 border border-[#00ff00]/20">
            <p className="text-sm text-gray-400 mb-2">Comparing versions:</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <span className="text-[#00ff00] font-semibold">
                  {compareVersions[0] ? versions.find(v => v.id === compareVersions[0])?.version : 'Select version'}
                </span>
              </div>
              <span className="text-gray-500">vs</span>
              <div className="flex-1 text-right">
                <span className="text-[#00ff00] font-semibold">
                  {compareVersions[1] ? versions.find(v => v.id === compareVersions[1])?.version : 'Select version'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Version Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00ff00]/50 via-[#00ff00]/30 to-transparent" />

        {/* Version Items */}
        <div className="space-y-6">
          {versions.map((version, index) => {
            const isSelected = selectedVersion === version.id;
            const isInComparison = compareVersions.includes(version.id);
            const isExpanded = expandedVersion === version.id;

            return (
              <motion.div
                key={version.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-5 w-6 h-6 rounded-full border-4 border-[#0a0a0a] z-10 cursor-pointer transition-all ${
                    isInComparison
                      ? 'bg-[#00ff00]'
                      : isSelected
                      ? 'bg-[#00cc00]'
                      : 'bg-[#1a1a1a] border-2 border-[#00ff00]/50'
                  }`}
                  onClick={() => selectForComparison(version.id)}
                >
                  {index === 0 && (
                    <div className="absolute inset-0 bg-[#00ff00] rounded-full animate-ping opacity-30" />
                  )}
                </motion.div>

                {/* Version Card */}
                <div className="ml-16">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`bg-[#1a1a1a] rounded-lg border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#00ff00] shadow-lg shadow-[#00ff00]/20'
                        : 'border-[#00ff00]/20 hover:border-[#00ff00]/50'
                    }`}
                    onClick={() => setSelectedVersion(version.id)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">
                              Version {version.version}
                            </h3>
                            {index === 0 && (
                              <span className="px-2 py-1 bg-[#00ff00]/20 text-[#00ff00] text-xs rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-300 mb-3">{version.changes}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{version.createdBy}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{format(version.createdAt, 'MMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{formatDistanceToNow(version.createdAt, { addSuffix: true })}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          {index !== 0 && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onRestoreVersion(version);
                              }}
                              className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors"
                              title="Restore this version"
                            >
                              <RotateCcw className="w-5 h-5" />
                            </motion.button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleVersionExpansion(version.id);
                            }}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden border-t border-[#00ff00]/20"
                        >
                          <div className="p-5 bg-[#0a0a0a]/50">
                            <h4 className="text-sm font-semibold text-gray-400 mb-3">Version Details</h4>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Sections Modified:</span>
                                <span className="text-white ml-2">3</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Steps Added:</span>
                                <span className="text-green-400 ml-2">+5</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Steps Removed:</span>
                                <span className="text-red-400 ml-2">-2</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Training Videos:</span>
                                <span className="text-white ml-2">2</span>
                              </div>
                            </div>
                            
                            {index !== 0 && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRestoreVersion(version);
                                }}
                                className="mt-4 w-full px-4 py-2 bg-[#00ff00] text-black font-semibold rounded-lg hover:bg-[#00cc00] transition-colors"
                              >
                                Restore This Version
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Comparison View */}
      {compareVersions[0] && compareVersions[1] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-[#1a1a1a] rounded-lg p-6 border border-[#00ff00]/20"
        >
          <h3 className="text-xl font-bold text-white mb-4">Version Comparison</h3>
          <div className="space-y-4">
            <div className="bg-[#0a0a0a] rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Changes Summary</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Added emergency evacuation maps
                </li>
                <li className="flex items-center gap-2 text-yellow-400">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  Modified communication protocols
                </li>
                <li className="flex items-center gap-2 text-red-400">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  Removed outdated contact information
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
