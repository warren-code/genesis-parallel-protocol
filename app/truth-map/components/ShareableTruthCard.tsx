'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ShareableTruthCardProps {
  entry: any;
  onClose: () => void;
}

export default function ShareableTruthCard({ entry, onClose }: ShareableTruthCardProps) {
  const cardRef = useRef(null);

  const handleDownloadImage = () => {
    if (!cardRef.current) return;
    html2canvas(cardRef.current, { scrollY: -window.scrollY }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${entry.id}-truth-card.png`;
      link.click();
    });
  };

  const handleDownloadPDF = () => {
    if (!cardRef.current) return;
    html2canvas(cardRef.current, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`${entry.id}-truth-card.pdf`);
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-gradient-to-br from-purple-800 to-indigo-800 w-full max-w-lg rounded-lg shadow-lg" ref={cardRef}>
        <div className="flex justify-between items-center p-4 border-b border-purple-700">
          <h3 className="text-white text-lg font-medium">Truth Card</h3>
          <button onClick={onClose} className="text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-white">
          <h4 className="text-xl font-semibold mb-4">{entry.title || 'Untitled Claim'}</h4>
          <p className="mb-2"><strong>Claim:</strong> {entry.original_claim}</p>
          <p className="mb-2"><strong>Evidence:</strong> {entry.counter_evidence || 'Pending verification'}</p>
          <p className="mb-4"><strong>Status:</strong> {entry.status.replace('_', ' ').toUpperCase()}</p>
          <p className="mb-2"><strong>Confidence Score:</strong> {entry.confidence_score || 0}%</p>
        </div>

        <div className="flex justify-between bg-black/20 p-4">
          <button onClick={handleDownloadImage} className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded">
            <Download className="w-4 h-4" /> Download Image
          </button>
          <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>
    </motion.div>
  );
}
