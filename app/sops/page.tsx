'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SOPTemplateSelector } from './components/SOPTemplateSelector';
import { SOPBuilder } from './components/SOPBuilder';
import { SOPVersionHistory } from './components/SOPVersionHistory';
import { SOPPosterGenerator } from './components/SOPPosterGenerator';
import { TrainingVideoLibrary } from './components/TrainingVideoLibrary';
import { SOPTemplate } from '@/types/sop';
import { FileText, Edit3, History, Printer, Video, Plus } from 'lucide-react';

export default function SOPsPage() {
  const [activeView, setActiveView] = useState<'templates' | 'builder' | 'history' | 'posters' | 'training'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<SOPTemplate | null>(null);
  const [editingMode, setEditingMode] = useState(false);

  const navItems = [
    { id: 'templates', label: 'SOP Templates', icon: FileText },
    { id: 'builder', label: 'SOP Builder', icon: Edit3 },
    { id: 'history', label: 'Version History', icon: History },
    { id: 'posters', label: 'Print Posters', icon: Printer },
    { id: 'training', label: 'Training Videos', icon: Video },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
      {/* Header */}
      <div className="bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-[#00ff00]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Front-Desk <span className="text-[#00ff00]">SOPs System</span>
              </h1>
              <p className="text-gray-400 mt-1">
                Standard Operating Procedures for Security Organizations
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveView('builder');
                setEditingMode(true);
                setSelectedTemplate(null);
              }}
              className="px-6 py-3 bg-[#00ff00] text-black font-semibold rounded-lg hover:bg-[#00cc00] transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create New SOP
            </motion.button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-[#1a1a1a] border-b border-[#00ff00]/20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`px-4 py-4 font-medium transition-all flex items-center gap-2 relative ${
                    activeView === item.id
                      ? 'text-[#00ff00]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                  {activeView === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ff00]"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeView === 'templates' && (
            <SOPTemplateSelector
              onSelectTemplate={(template) => {
                setSelectedTemplate(template);
                setActiveView('builder');
                setEditingMode(false);
              }}
            />
          )}

          {activeView === 'builder' && (
            <SOPBuilder
              initialTemplate={selectedTemplate}
              editingMode={editingMode}
              onSave={(sop) => {
                console.log('Saving SOP:', sop);
                setActiveView('templates');
              }}
            />
          )}

          {activeView === 'history' && (
            <SOPVersionHistory
              sopId={selectedTemplate?.id}
              onRestoreVersion={(version) => {
                setSelectedTemplate(version.content);
                setActiveView('builder');
                setEditingMode(true);
              }}
            />
          )}

          {activeView === 'posters' && (
            <SOPPosterGenerator
              sop={selectedTemplate}
              onSelectSOP={() => setActiveView('templates')}
            />
          )}

          {activeView === 'training' && (
            <TrainingVideoLibrary
              sopSection={selectedTemplate?.sections[0]}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
