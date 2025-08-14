'use client';

import React, { useRef } from 'react';
import { Playbook, PlaybookProgress } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PrintablePlaybookProps {
  playbook: Playbook;
  progress?: PlaybookProgress | null;
}

const PrintablePlaybook: React.FC<PrintablePlaybookProps> = ({ playbook, progress }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!printRef.current) return;

    try {
      // Show the print content
      const printContent = document.getElementById('printable-content');
      if (printContent) {
        printContent.style.display = 'block';
      }

      // Generate canvas from the content
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1200
      });

      // Convert to PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(`${playbook.title.replace(/\s+/g, '-').toLowerCase()}-playbook.pdf`);

      // Hide the print content again
      if (printContent) {
        printContent.style.display = 'none';
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <button
        onClick={generatePDF}
        className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Download Printable Version
      </button>

      {/* Hidden printable content */}
      <div id="printable-content" style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
        <div ref={printRef} className="p-8 bg-white" style={{ width: '1200px' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">{playbook.icon} {playbook.title}</h1>
            <p className="text-lg text-gray-600">{playbook.description}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Version {playbook.version} | Last Updated: {formatDate(playbook.lastUpdated)}</p>
              <p>Generated on: {formatDate(new Date())}</p>
            </div>
          </div>

          {/* Overview Section */}
          {playbook.overview && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700">{playbook.overview}</p>
            </div>
          )}

          {/* Prerequisites */}
          {playbook.prerequisites && playbook.prerequisites.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
              <ul className="list-disc list-inside space-y-2">
                {playbook.prerequisites.map((prereq, index) => (
                  <li key={index} className="text-gray-700">{prereq}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Expected Outcomes */}
          {playbook.outcomes && playbook.outcomes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Expected Outcomes</h2>
              <ul className="list-disc list-inside space-y-2">
                {playbook.outcomes.map((outcome, index) => (
                  <li key={index} className="text-gray-700">{outcome}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Phases and Steps */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Phases and Action Steps</h2>
            {playbook.phases.map((phase, phaseIndex) => (
              <div key={phase.id} className="mb-8 page-break-inside-avoid">
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold">
                    Phase {phaseIndex + 1}: {phase.name}
                  </h3>
                  <p className="text-gray-600">{phase.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Timeframe: {phase.timeframe}</p>
                </div>

                {phase.steps.map((step, stepIndex) => (
                  <div key={step.id} className="mb-6 pl-4 border-l-4 border-gray-300">
                    <div className="mb-2">
                      <h4 className="text-lg font-semibold">
                        Step {phaseIndex + 1}.{stepIndex + 1}: {step.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Priority: {step.priority}</span>
                        <span>Duration: {step.duration}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{step.description}</p>

                    {/* Warning Notes */}
                    {step.warningNotes && step.warningNotes.length > 0 && (
                      <div className="bg-red-50 p-3 rounded mb-3">
                        <p className="font-semibold text-red-800 mb-1">⚠️ Warnings:</p>
                        <ul className="list-disc list-inside text-sm text-red-700">
                          {step.warningNotes.map((warning, index) => (
                            <li key={index}>{warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Steps */}
                    {step.substeps && step.substeps.length > 0 && (
                      <div className="mb-3">
                        <p className="font-semibold mb-1">Action Steps:</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {step.substeps.map((substep, index) => (
                            <li key={index}>☐ {substep}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tips */}
                    {step.tips && step.tips.length > 0 && (
                      <div className="bg-blue-50 p-3 rounded mb-3">
                        <p className="font-semibold text-blue-800 mb-1">💡 Tips:</p>
                        <ul className="list-disc list-inside text-sm text-blue-700">
                          {step.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Resources */}
                    {step.resources.length > 0 && (
                      <div className="mb-3">
                        <p className="font-semibold mb-1">Resources:</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {step.resources.map((resource) => (
                            <li key={resource.id}>
                              {resource.name} ({resource.type})
                              {resource.required && <span className="text-red-600"> - Required</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Notes Section */}
                    <div className="mt-3 p-3 border border-gray-300 rounded">
                      <p className="text-sm font-semibold mb-1">Notes:</p>
                      <div className="h-12 border-b border-gray-200"></div>
                      <div className="h-12 border-b border-gray-200"></div>
                      <div className="h-12"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <style jsx>{`
            @media print {
              .page-break-inside-avoid {
                page-break-inside: avoid;
              }
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default PrintablePlaybook;
