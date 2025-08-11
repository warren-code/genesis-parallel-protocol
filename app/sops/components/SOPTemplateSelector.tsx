'use client';

import { motion } from 'framer-motion';
import { defaultTemplates } from '@/lib/sop-templates';
import { SOPTemplate } from '@/types/sop';
import { Building2, GraduationCap, Heart, Church, ArrowRight, Clock, Tag, FileText } from 'lucide-react';

interface SOPTemplateSelectorProps {
  onSelectTemplate: (template: SOPTemplate) => void;
}

export function SOPTemplateSelector({ onSelectTemplate }: SOPTemplateSelectorProps) {
  const organizationTypes = [
    {
      id: 'workplace',
      title: 'Workplace',
      description: 'Corporate offices, retail stores, warehouses, and other business environments',
      icon: Building2,
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/50 hover:border-blue-400',
      textColor: 'text-blue-400',
      stats: { sections: 3, steps: 8, avgTime: '15-20 min' }
    },
    {
      id: 'school',
      title: 'Educational Institution',
      description: 'K-12 schools, universities, and other educational facilities',
      icon: GraduationCap,
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/50 hover:border-purple-400',
      textColor: 'text-purple-400',
      stats: { sections: 3, steps: 9, avgTime: '10-15 min' }
    },
    {
      id: 'clinic',
      title: 'Healthcare Facility',
      description: 'Hospitals, clinics, medical offices, and healthcare centers',
      icon: Heart,
      color: 'from-red-500/20 to-red-600/20',
      borderColor: 'border-red-500/50 hover:border-red-400',
      textColor: 'text-red-400',
      stats: { sections: 3, steps: 8, avgTime: '5-10 min' }
    },
    {
      id: 'faith',
      title: 'Faith Organization',
      description: 'Churches, mosques, temples, and other religious institutions',
      icon: Church,
      color: 'from-yellow-500/20 to-yellow-600/20',
      borderColor: 'border-yellow-500/50 hover:border-yellow-400',
      textColor: 'text-yellow-400',
      stats: { sections: 3, steps: 8, avgTime: '20-30 min' }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Choose Your Organization Type
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Select the type of organization to get started with pre-configured SOP templates 
          designed specifically for your industry and security needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {organizationTypes.map((type, index) => {
          const Icon = type.icon;
          const template = defaultTemplates[type.id as keyof typeof defaultTemplates];
          
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelectTemplate(template)}
              className={`relative bg-gradient-to-br ${type.color} border-2 ${type.borderColor} rounded-xl p-6 cursor-pointer transition-all group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-[#1a1a1a] rounded-lg ${type.textColor}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{type.title}</h3>
                    <p className="text-gray-400 mt-1">{type.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-[#00ff00] transition-colors" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">Template:</span>
                  <span className="text-white font-medium">{template.name}</span>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">
                      {type.stats.sections} sections, {type.stats.steps} steps
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">{type.stats.avgTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#1a1a1a] rounded-full text-xs text-gray-400 flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-[#1a1a1a] rounded-lg border border-[#00ff00]/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Need a Custom Template?
            </h3>
            <p className="text-gray-400">
              Can't find what you're looking for? Create a completely custom SOP from scratch.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border-2 border-[#00ff00] text-[#00ff00] rounded-lg font-medium hover:bg-[#00ff00] hover:text-black transition-all"
          >
            Create Custom SOP
          </motion.button>
        </div>
      </div>
    </div>
  );
}
