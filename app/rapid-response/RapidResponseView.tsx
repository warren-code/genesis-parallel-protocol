import React from 'react';
import IncidentReportForm from './IncidentReportForm';
import AlertSystem from './AlertSystem';
import SecureMessaging from './SecureMessaging';
import CoordinationDashboard from './CoordinationDashboard';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

export default function RapidResponseView() {
  return (
    <div className="max-w-xl mx-auto my-8 p-4 space-y-8">
      <h1 className="text-2xl font-bold text-center">Rapid Response View</h1>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>Incidents</Tab>
          <Tab>Alerts</Tab>
          <Tab>Messages</Tab>
          <Tab>Coordination</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <IncidentReportForm />
          </TabPanel>
          <TabPanel>
            <AlertSystem />
          </TabPanel>
          <TabPanel>
            <SecureMessaging />
          </TabPanel>
          <TabPanel>
            <CoordinationDashboard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

