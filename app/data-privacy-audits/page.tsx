'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VendorAuditChecklistBuilderUI from './components/VendorAuditChecklistBuilderUI';
import PrivacyAssessmentToolUI from './components/PrivacyAssessmentToolUI';
import AuditReportGeneratorUI from './components/AuditReportGeneratorUI';
import VendorComparisonMatrixUI from './components/VendorComparisonMatrixUI';
import PrivacyBestPracticesLibraryUI from './components/PrivacyBestPracticesLibraryUI';

type TabType = 'checklist' | 'assessment' | 'report' | 'comparison' | 'practices';

export default function DataPrivacyAuditsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('checklist');

  const tabs = [
    { id: 'checklist', label: 'Audit Checklist Builder', icon: '📋' },
    { id: 'assessment', label: 'Privacy Assessment', icon: '🔐' },
    { id: 'report', label: 'Report Generator', icon: '📊' },
    { id: 'comparison', label: 'Vendor Comparison', icon: '⚖️' },
    { id: 'practices', label: 'Best Practices', icon: '📚' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Data Privacy & Vendor Audits</h1>
          <p className="text-gray-300">Comprehensive tools for privacy assessments and vendor management</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-gray-800 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 rounded-lg shadow-xl p-6"
        >
          {activeTab === 'checklist' && <VendorAuditChecklistBuilderUI />}
          {activeTab === 'assessment' && <PrivacyAssessmentToolUI />}
          {activeTab === 'report' && <AuditReportGeneratorUI />}
          {activeTab === 'comparison' && <VendorComparisonMatrixUI />}
          {activeTab === 'practices' && <PrivacyBestPracticesLibraryUI />}
        </motion.div>
      </div>
    </div>
  );
}
