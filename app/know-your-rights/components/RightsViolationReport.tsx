'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';

interface ViolationReport {
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  witnesses: string;
  evidence: string[];
  urgency: 'immediate' | 'high' | 'medium' | 'low';
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const violationTypes = {
  en: [
    'Police Misconduct',
    'Workplace Discrimination',
    'Housing Discrimination',
    'Privacy Violation',
    'Healthcare Denial',
    'Free Speech Violation',
    'Other'
  ],
  es: [
    'Mala Conducta Policial',
    'Discriminación Laboral',
    'Discriminación de Vivienda',
    'Violación de Privacidad',
    'Negación de Atención Médica',
    'Violación de Libertad de Expresión',
    'Otro'
  ],
  fr: [
    'Inconduite Policière',
    'Discrimination au Travail',
    'Discrimination au Logement',
    'Violation de la Vie Privée',
    'Refus de Soins de Santé',
    'Violation de la Liberté d\'Expression',
    'Autre'
  ],
  zh: [
    '警察不当行为',
    '工作场所歧视',
    '住房歧视',
    '隐私侵犯',
    '医疗保健拒绝',
    '言论自由侵犯',
    '其他'
  ]
};

const RightsViolationReport = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [report, setReport] = useState<ViolationReport>({
    type: '',
    date: '',
    time: '',
    location: '',
    description: '',
    witnesses: '',
    evidence: [],
    urgency: 'medium',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // In a real app, this would send to a secure server
    console.log('Report submitted:', report);
  };

  const resetForm = () => {
    setReport({
      type: '',
      date: '',
      time: '',
      location: '',
      description: '',
      witnesses: '',
      evidence: [],
      urgency: 'medium',
      contactInfo: {
        name: '',
        email: '',
        phone: ''
      }
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <GlassmorphicCard className="p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-display font-bold mb-4 text-accent">
            Report Submitted Successfully
          </h3>
          
          <p className="text-gray mb-6 max-w-md mx-auto">
            Your rights violation report has been securely submitted. We will review it and contact you within 24-48 hours.
          </p>
          
          <div className="p-4 bg-signal/10 rounded-lg border border-signal/20 mb-6 max-w-md mx-auto">
            <p className="text-sm text-signal font-medium">
              Important: If you are in immediate danger, please call 911 or your local emergency services.
            </p>
          </div>
          
          <Button onClick={resetForm} variant="accent">
            Submit Another Report
          </Button>
        </motion.div>
      </GlassmorphicCard>
    );
  }

  return (
    <GlassmorphicCard className="p-6">
      <h2 className="text-2xl font-display font-bold mb-6 text-accent">
        Report a Rights Violation
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Violation Type */}
        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Type of Violation
          </label>
          <select
            required
            value={report.type}
            onChange={(e) => setReport({ ...report, type: e.target.value })}
            className="w-full px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                     text-ink focus:outline-none focus:border-accent/50 transition-all"
          >
            <option value="">Select violation type...</option>
            {violationTypes[language].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        
        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Date of Incident
            </label>
            <input
              type="date"
              required
              value={report.date}
              onChange={(e) => setReport({ ...report, date: e.target.value })}
              className="w-full px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                       text-ink focus:outline-none focus:border-accent/50 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Time of Incident
            </label>
            <input
              type="time"
              required
              value={report.time}
              onChange={(e) => setReport({ ...report, time: e.target.value })}
              className="w-full px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                       text-ink focus:outline-none focus:border-accent/50 transition-all"
            />
          </div>
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Location of Incident
          </label>
          <input
            type="text"
            required
            placeholder="Street address, city, state"
            value={report.location}
            onChange={(e) => setReport({ ...report, location: e.target.value })}
            className="w-full px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                     text-ink placeholder-gray focus:outline-none focus:border-accent/50 transition-all"
          />
        </div>
        
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Description of Incident
          </label>
          <textarea
            required
            rows={4}
            placeholder="Please provide a detailed description of what happened..."
            value={report.description}
            onChange={(e) => setReport({ ...report, description: e.target.value })}
            className="w-full px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                     text-ink placeholder-gray focus:outline-none focus:border-accent/50 transition-all resize-none"
          />
        </div>
        
        {/* Witnesses */}
        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Witnesses (if any)
          </label>
          <textarea
            rows={2}
            placeholder="Names and contact information of any witnesses"
            value={report.witnesses}
            onChange={(e) => setReport({ ...report, witnesses: e.target.value })}
            className="w-full px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                     text-ink placeholder-gray focus:outline-none focus:border-accent/50 transition-all resize-none"
          />
        </div>
        
        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Urgency Level
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['immediate', 'high', 'medium', 'low'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setReport({ ...report, urgency: level })}
                className={`px-4 py-2 rounded-lg border capitalize transition-all
                  ${report.urgency === level
                    ? level === 'immediate' ? 'bg-signal text-primary border-signal' :
                      level === 'high' ? 'bg-accent text-primary border-accent' :
                      'bg-ink/20 text-ink border-ink/40'
                    : 'bg-ink/5 border-ink/20 hover:bg-ink/10'
                  }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ink">Your Contact Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={report.contactInfo.name}
              onChange={(e) => setReport({ 
                ...report, 
                contactInfo: { ...report.contactInfo, name: e.target.value }
              })}
              className="w-full px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                       text-ink focus:outline-none focus:border-accent/50 transition-all"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={report.contactInfo.email}
                onChange={(e) => setReport({ 
                  ...report, 
                  contactInfo: { ...report.contactInfo, email: e.target.value }
                })}
                className="w-full px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                         text-ink focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={report.contactInfo.phone}
                onChange={(e) => setReport({ 
                  ...report, 
                  contactInfo: { ...report.contactInfo, phone: e.target.value }
                })}
                className="w-full px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                         text-ink focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray">
            All information is encrypted and secure
          </p>
          
          <Button
            type="submit"
            variant="accent"
            disabled={isSubmitting}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </form>
    </GlassmorphicCard>
  );
};

export default RightsViolationReport;
