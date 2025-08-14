'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SOPTemplate, SOPPoster } from '@/types/sop';
import { 
  Printer, Download, Eye, Layout, Type, 
  AlertTriangle, Phone, FileText, Check,
  Palette, Image as ImageIcon
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface SOPPosterGeneratorProps {
  sop: SOPTemplate | null;
  onSelectSOP: () => void;
}

export function SOPPosterGenerator({ sop, onSelectSOP }: SOPPosterGeneratorProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<SOPPoster['template']>('basic');
  const [selectedFormat, setSelectedFormat] = useState<SOPPoster['format']>('a4');
  const [selectedColorScheme, setSelectedColorScheme] = useState('default');
  const [showPreview, setShowPreview] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: '911 Emergency', number: '911' },
    { name: 'Security Desk', number: '555-0123' }
  ]);

  const posterTemplates = [
    {
      id: 'basic',
      name: 'Basic Checklist',
      description: 'Simple checklist format with clear steps',
      icon: Check
    },
    {
      id: 'detailed',
      name: 'Detailed Guide',
      description: 'Comprehensive layout with warnings and tips',
      icon: FileText
    },
    {
      id: 'emergency',
      name: 'Emergency Response',
      description: 'High-visibility design for critical procedures',
      icon: AlertTriangle
    },
    {
      id: 'quickref',
      name: 'Quick Reference',
      description: 'Condensed format for at-a-glance information',
      icon: Layout
    }
  ];

  const formatOptions = [
    { id: 'a4', name: 'A4', dimensions: '210 × 297 mm' },
    { id: 'letter', name: 'Letter', dimensions: '8.5 × 11 in' },
    { id: 'a3', name: 'A3', dimensions: '297 × 420 mm' },
    { id: 'custom', name: 'Custom', dimensions: 'User defined' }
  ];

  const colorSchemes = [
    { id: 'default', name: 'Default', primary: '#00ff00', secondary: '#0a0a0a' },
    { id: 'professional', name: 'Professional', primary: '#2563eb', secondary: '#1e293b' },
    { id: 'emergency', name: 'Emergency', primary: '#ef4444', secondary: '#7f1d1d' },
    { id: 'medical', name: 'Medical', primary: '#06b6d4', secondary: '#164e63' }
  ];

  const downloadPoster = async (format: 'pdf' | 'png') => {
    if (!posterRef.current) return;

    const canvas = await html2canvas(posterRef.current, {
      scale: 2,
      logging: false,
      backgroundColor: '#ffffff'
    });

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `${sop?.name || 'SOP'}-poster.png`;
      link.href = canvas.toDataURL();
      link.click();
    } else {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: selectedFormat === 'a3' ? 'landscape' : 'portrait',
        unit: 'mm',
        format: selectedFormat === 'custom' ? 'a4' : selectedFormat
      });
      
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${sop?.name || 'SOP'}-poster.pdf`);
    }
  };

  if (!sop) {
    return (
      <div className="text-center py-20">
        <Printer className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No SOP Selected</h3>
        <p className="text-gray-500 mb-6">Select an SOP to create printable posters</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelectSOP}
          className="px-6 py-3 bg-[#00ff00] text-black font-semibold rounded-lg hover:bg-[#00cc00] transition-colors"
        >
          Select SOP
        </motion.button>
      </div>
    );
  }

  const selectedScheme = colorSchemes.find(s => s.id === selectedColorScheme) || colorSchemes[0];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#00ff00]/20">
        <h2 className="text-2xl font-bold text-white mb-6">Poster Designer</h2>
        
        {/* Template Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Choose Template</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {posterTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTemplate(template.id as any)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTemplate === template.id
                      ? 'border-[#00ff00] bg-[#00ff00]/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${
                    selectedTemplate === template.id ? 'text-[#00ff00]' : 'text-gray-400'
                  }`} />
                  <h4 className="text-white font-medium text-sm">{template.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Format and Color */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Paper Format</h3>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as any)}
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#00ff00] focus:outline-none"
            >
              {formatOptions.map((format) => (
                <option key={format.id} value={format.id}>
                  {format.name} ({format.dimensions})
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Color Scheme</h3>
            <div className="flex gap-2">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => setSelectedColorScheme(scheme.id)}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    selectedColorScheme === scheme.id
                      ? 'border-[#00ff00]'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: scheme.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: scheme.secondary }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">{scheme.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 border-2 border-[#00ff00] text-[#00ff00] rounded-lg hover:bg-[#00ff00] hover:text-black transition-all flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            {showPreview ? 'Hide' : 'Show'} Preview
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => downloadPoster('pdf')}
            className="px-4 py-2 bg-[#00ff00] text-black rounded-lg hover:bg-[#00cc00] transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => downloadPoster('png')}
            className="px-4 py-2 bg-[#00ff00] text-black rounded-lg hover:bg-[#00cc00] transition-colors flex items-center gap-2"
          >
            <ImageIcon className="w-5 h-5" />
            Download PNG
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="px-4 py-2 border-2 border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-gray-300 transition-all flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print
          </motion.button>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#00ff00]/20">
          <h3 className="text-lg font-semibold text-white mb-4">Poster Preview</h3>
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl mx-auto">
            <div ref={posterRef} className="p-8 bg-white text-black">
              <PosterContent
                sop={sop}
                template={selectedTemplate}
                colorScheme={selectedScheme}
                emergencyContacts={emergencyContacts}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface PosterContentProps {
  sop: SOPTemplate;
  template: SOPPoster['template'];
  colorScheme: any;
  emergencyContacts: Array<{ name: string; number: string }>;
}

function PosterContent({ sop, template, colorScheme, emergencyContacts }: PosterContentProps) {
  const renderBasicTemplate = () => (
    <div className="space-y-6">
      <div 
        className="text-center pb-4 border-b-4"
        style={{ borderColor: colorScheme.primary }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: colorScheme.secondary }}>
          {sop.name}
        </h1>
        <p className="text-gray-600">{sop.description}</p>
      </div>

      {sop.sections.map((section, index) => (
        <div key={section.id} className="space-y-3">
          <h2 
            className="text-xl font-semibold flex items-center gap-2"
            style={{ color: colorScheme.primary }}
          >
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
              style={{ backgroundColor: colorScheme.primary }}>
              {index + 1}
            </span>
            {section.title}
          </h2>
          
          {section.steps && (
            <ul className="space-y-2 ml-10">
              {section.steps.map((step) => (
                <li key={step.id} className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colorScheme.primary }} />
                  <span>{step.description}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div 
        className="mt-8 pt-4 border-t-2"
        style={{ borderColor: colorScheme.primary }}
      >
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4" style={{ color: colorScheme.primary }} />
          <span className="font-semibold">Emergency Contacts:</span>
          {emergencyContacts.map((contact, index) => (
            <span key={index}>
              {contact.name}: <strong>{contact.number}</strong>
              {index < emergencyContacts.length - 1 && ' • '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmergencyTemplate = () => (
    <div className="space-y-6">
      <div 
        className="p-4 text-center"
        style={{ backgroundColor: colorScheme.primary }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          EMERGENCY PROCEDURE
        </h1>
        <p className="text-xl text-white">{sop.name}</p>
      </div>

      {sop.sections.slice(0, 3).map((section, index) => (
        <div key={section.id} className="border-4 rounded-lg p-4" style={{ borderColor: colorScheme.primary }}>
          <h2 className="text-2xl font-bold mb-3" style={{ color: colorScheme.secondary }}>
            STEP {index + 1}: {section.title.toUpperCase()}
          </h2>
          
          {section.steps && (
            <div className="space-y-2">
              {section.steps.map((step) => (
                <div key={step.id} className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 mt-0.5 flex-shrink-0" style={{ color: colorScheme.primary }} />
                  <div>
                    <p className="font-semibold">{step.description}</p>
                    {step.warnings && step.warnings.length > 0 && (
                      <p className="text-sm mt-1" style={{ color: colorScheme.primary }}>
                        ⚠️ {step.warnings[0]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div 
        className="p-4 text-center text-white text-xl font-bold"
        style={{ backgroundColor: colorScheme.secondary }}
      >
        <div className="mb-2">CALL FOR HELP</div>
        {emergencyContacts.map((contact) => (
          <div key={contact.name} className="text-3xl">
            {contact.number}
          </div>
        ))}
      </div>
    </div>
  );

  switch (template) {
    case 'emergency':
      return renderEmergencyTemplate();
    case 'basic':
    default:
      return renderBasicTemplate();
  }
}
