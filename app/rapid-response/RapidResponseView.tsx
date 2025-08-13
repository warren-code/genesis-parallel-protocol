'use client';

import React, { useState } from 'react';
import IncidentReportForm from './components/IncidentReportForm';
import AlertSystem from './components/AlertSystem';
import SecureMessaging from './components/SecureMessaging';
import CoordinationDashboard from './components/CoordinationDashboard';

export default function RapidResponseView() {
  const [activeTab, setActiveTab] = useState('incidents');

  const tabs = [
    { id: 'incidents', label: 'Incidents', component: IncidentReportForm },
    { id: 'alerts', label: 'Alerts', component: AlertSystem },
    { id: 'messages', label: 'Messages', component: SecureMessaging },
    { id: 'coordination', label: 'Coordination', component: CoordinationDashboard },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || IncidentReportForm;

  return (
    <div className="max-w-6xl mx-auto my-8 p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Rapid Response System</h1>
      
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray/20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === tab.id
                ? 'text-accent border-b-2 border-accent'
                : 'text-gray hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        <ActiveComponent />
      </div>
    </div>
  );
}

