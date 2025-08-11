'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { rightsDatabase } from '../data/rightsDatabase';
import { useLanguage } from '../context/LanguageContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';

const RightsCards = () => {
  const [selectedRights, setSelectedRights] = useState<string[]>([]);
  const { language } = useLanguage();

  const toggleRightSelection = (rightId: string) => {
    setSelectedRights(prev =>
      prev.includes(rightId)
        ? prev.filter(id => id !== rightId)
        : [...prev, rightId]
    );
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const selectedRightsData = rightsDatabase.filter(right => 
      selectedRights.includes(right.id)
    );

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Know Your Rights Cards</title>
          <style>
            @media print {
              body { margin: 0; }
              .page-break { page-break-after: always; }
            }
            body {
              font-family: Arial, sans-serif;
              background: white;
              color: black;
              margin: 0;
              padding: 20px;
            }
            .card {
              border: 2px solid #333;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
              width: 3.5in;
              height: 2.5in;
              box-sizing: border-box;
              display: inline-block;
              margin-right: 10px;
              background: #f9f9f9;
            }
            .card h3 {
              margin: 0 0 10px 0;
              color: #d4af37;
              font-size: 18px;
            }
            .card p {
              margin: 0;
              font-size: 14px;
              line-height: 1.4;
            }
            .category {
              font-size: 12px;
              color: #666;
              margin-bottom: 10px;
            }
            @page {
              size: letter;
              margin: 0.5in;
            }
          </style>
        </head>
        <body>
          ${selectedRightsData.map(right => `
            <div class="card">
              <div class="category">${right.category}</div>
              <h3>${right.title[language]}</h3>
              <p>${right.description[language]}</p>
            </div>
          `).join('')}
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="space-y-8">
      <GlassmorphicCard className="p-6">
        <h2 className="text-2xl font-display font-bold mb-6 text-accent">
          Printable Rights Cards
        </h2>
        <p className="text-gray mb-6">
          Select rights to create printable wallet-sized cards that you can carry with you
        </p>

        {/* Rights Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {rightsDatabase.filter(right => right.printable).map((right) => (
            <motion.div
              key={right.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300
                ${selectedRights.includes(right.id)
                  ? 'bg-accent/20 border-accent'
                  : 'bg-ink/5 border-ink/20 hover:bg-ink/10'
                }`}
              onClick={() => toggleRightSelection(right.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center transition-all
                  ${selectedRights.includes(right.id)
                    ? 'bg-accent border-accent'
                    : 'border-ink/30'
                  }`}
                >
                  {selectedRights.includes(right.id) && (
                    <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-sm mb-1">
                    {right.title[language]}
                  </h4>
                  <p className="text-xs text-gray">
                    {right.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Print Actions */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray">
            {selectedRights.length} cards selected
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => setSelectedRights([])}
              variant="ghost"
              disabled={selectedRights.length === 0}
            >
              Clear Selection
            </Button>
            <Button
              onClick={handlePrint}
              variant="accent"
              disabled={selectedRights.length === 0}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              }
            >
              Print Cards
            </Button>
          </div>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default RightsCards;
