'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rightsDatabase, scenarioDescriptions } from '../data/rightsDatabase';
import { useLanguage } from '../context/LanguageContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';

const ScenarioExplorer = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const { language } = useLanguage();

  // Get rights for selected scenario
  const scenarioRights = selectedScenario
    ? rightsDatabase.filter(right => right.scenarios.includes(selectedScenario))
    : [];

  return (
    <div className="space-y-8">
      <GlassmorphicCard className="p-6">
        <h2 className="text-2xl font-display font-bold mb-6 text-accent">
          Explore Rights by Scenario
        </h2>
        <p className="text-gray mb-6">
          Select a scenario to see what rights apply to that situation
        </p>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(scenarioDescriptions).map(([key, scenario]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedScenario(key === selectedScenario ? null : key)}
              className={`p-4 rounded-lg border transition-all duration-300 text-left
                ${selectedScenario === key
                  ? 'bg-accent/20 border-accent text-ink'
                  : 'bg-ink/5 border-ink/20 hover:bg-ink/10 hover:border-ink/30'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-display font-semibold mb-2">
                {scenario.title}
              </h3>
              <p className="text-sm text-gray">
                {scenario.description}
              </p>
            </motion.button>
          ))}
        </div>
      </GlassmorphicCard>

      {/* Selected Scenario Rights */}
      <AnimatePresence mode="wait">
        {selectedScenario && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-display font-semibold text-ink mb-4">
            Rights in &quot;{scenarioDescriptions[selectedScenario].title}&quot;
            </h3>
            
            {scenarioRights.map((right, index) => (
              <motion.div
                key={right.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GlassmorphicCard className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                    <h4 className="text-lg font-display font-bold text-signal">
                      {right.title[language]}
                    </h4>
                  </div>
                  <p className="text-gray leading-relaxed">
                    {right.description[language]}
                  </p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScenarioExplorer;
