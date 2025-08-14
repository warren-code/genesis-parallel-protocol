'use client';

import React from 'react';
import RightsExplorer from './components/RightsExplorer';
import ScenarioExplorer from './components/ScenarioExplorer';
import RightsCards from './components/RightsCards';
import MobileQuickReference from './components/MobileQuickReference';
import LanguageSelector from './components/LanguageSelector';
import RightsQuestionnaire from './components/RightsQuestionnaire';
import LocationBasedRights from './components/LocationBasedRights';
import RightsViolationReport from './components/RightsViolationReport';
import AttorneyContact from './components/AttorneyContact';
import { LanguageProvider } from './context/LanguageContext';
import { motion } from 'framer-motion';

export default function KnowYourRightsPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-primary relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-signal/5" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-accent to-signal bg-clip-text text-transparent">
            Know Your Rights
          </h1>
          <p className="text-xl text-gray max-w-3xl mx-auto">
            Empowering you with knowledge about your fundamental rights and freedoms.
            Search, explore, and understand your rights in various scenarios.
          </p>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <LanguageSelector />
        </motion.div>

        {/* Mobile Quick Reference - shown only on mobile */}
        <div className="block md:hidden mb-8">
          <MobileQuickReference />
        </div>

        {/* Rights Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <RightsExplorer />
        </motion.div>

        {/* Rights Questionnaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <RightsQuestionnaire />
        </motion.div>

        {/* Scenario Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <ScenarioExplorer />
        </motion.div>

        {/* Location-Based Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <LocationBasedRights />
        </motion.div>

        {/* Printable Rights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <RightsCards />
        </motion.div>

        {/* Rights Violation Reporting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <RightsViolationReport />
        </motion.div>

        {/* Attorney Contact Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <AttorneyContact />
        </motion.div>
      </div>
    </div>
    </LanguageProvider>
  );
}
