'use client';

import React from 'react';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { motion } from 'framer-motion';

const attorneys = [
  {
    name: 'Jane Doe, Esq.',
    specialty: 'Civil Rights',
    phone: '+1 555-123-4567',
    email: 'jane.doe@lawfirm.com',
    website: 'https://www.janedoelaw.com'
  },
  {
    name: 'John Smith, Esq.',
    specialty: 'Employment Law',
    phone: '+1 555-987-6543',
    email: 'john.smith@lawfirm.com',
    website: 'https://www.johnsmithlaw.com'
  },
  {
    name: 'Emily Johnson, Esq.',
    specialty: 'Family Law',
    phone: '+1 555-555-1212',
    email: 'emily.johnson@lawfirm.com',
    website: 'https://www.emilyjohnsonlaw.com'
  },
];

const AttorneyContact = () => {
  return (
    <div className="space-y-8">
      {/* Emergency Contacts */}
      <GlassmorphicCard className="p-6 border-signal/30">
        <h2 className="text-2xl font-display font-bold mb-4 text-signal">
          Emergency Legal Contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-signal/10 rounded-lg border border-signal/20">
            <h3 className="font-semibold text-signal mb-2">24/7 Legal Hotline</h3>
            <a href="tel:1-800-LEGAL-AID" className="text-lg font-bold text-signal hover:text-signal/80">
              1-800-LEGAL-AID
            </a>
            <p className="text-sm text-gray mt-1">Free emergency legal advice</p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <h3 className="font-semibold text-accent mb-2">ACLU Hotline</h3>
            <a href="tel:1-212-549-2500" className="text-lg font-bold text-accent hover:text-accent/80">
              1-212-549-2500
            </a>
            <p className="text-sm text-gray mt-1">Civil rights violations</p>
          </div>
        </div>
        <p className="text-sm text-gray italic">
          If you are in immediate danger, call 911 first
        </p>
      </GlassmorphicCard>

      {/* Attorney Directory */}
      <GlassmorphicCard className="p-6">
        <h2 className="text-2xl font-display font-bold mb-6 text-accent">
          Attorney Directory
        </h2>
        
        <div className="space-y-4">
        {attorneys.map((attorney, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-ink/5 rounded-lg border border-ink/20"
          >
            <h3 className="font-semibold text-ink mb-2">
              {attorney.name}
            </h3>
            <p className="text-sm text-gray mb-2">
              Specialty: {attorney.specialty}
            </p>
            <div className="flex gap-3 text-sm">
              <a 
                href={`tel:${attorney.phone}`}
                className="flex items-center gap-2 text-accent hover:text-accent/80"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {attorney.phone}
              </a>
              <a 
                href={`mailto:${attorney.email}`}
                className="flex items-center gap-2 text-signal hover:text-signal/80"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M16 12h1a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2h1m10 0V8a3 3 0 00-3-3H9a3 3 0 00-3 3v4m10 0H9" />
                </svg>
                Email
              </a>
              <a 
                href={attorney.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-signal hover:text-signal/80"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Website
              </a>
            </div>
          </motion.div>
        ))}
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default AttorneyContact;

