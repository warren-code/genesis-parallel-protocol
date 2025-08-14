'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOPTemplate, SOPSection, SOPStep } from '@/types/sop';
import { 
  Plus, Save, X, ChevronUp, ChevronDown, Trash2, 
  Edit2, AlertTriangle, Lightbulb, Clock, Package,
  Video, Image as ImageIcon, GripVertical
} from 'lucide-react';

interface SOPBuilderProps {
  initialTemplate?: SOPTemplate | null;
  editingMode?: boolean;
  onSave: (sop: SOPTemplate) => void;
}

export function SOPBuilder({ initialTemplate, editingMode = false, onSave }: SOPBuilderProps) {
  const [sop, setSOP] = useState<SOPTemplate>(
    initialTemplate || {
      id: `sop-${Date.now()}`,
      name: 'New SOP',
      organizationType: 'workplace',
      description: '',
      sections: [],
      version: '1.0.0',
      lastUpdated: new Date(),
      createdBy: 'current-user',
      isPublic: false,
      tags: []
    }
  );

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (initialTemplate) {
      setSOP(initialTemplate);
    }
  }, [initialTemplate]);

  const addSection = () => {
    const newSection: SOPSection = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      order: sop.sections.length + 1,
      content: '',
      required: true,
      steps: []
    };

    setSOP({ ...sop, sections: [...sop.sections, newSection] });
    setEditingSection(newSection.id);
    setExpandedSections(new Set([...expandedSections, newSection.id]));
  };

  const updateSection = (sectionId: string, updates: Partial<SOPSection>) => {
    setSOP({
      ...sop,
      sections: sop.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    });
  };

  const deleteSection = (sectionId: string) => {
    setSOP({
      ...sop,
      sections: sop.sections.filter(s => s.id !== sectionId)
    });
  };

  const addStep = (sectionId: string) => {
    const section = sop.sections.find(s => s.id === sectionId);
    if (!section) return;

    const newStep: SOPStep = {
      id: `step-${Date.now()}`,
      order: (section.steps?.length || 0) + 1,
      description: 'New step'
    };

    updateSection(sectionId, {
      steps: [...(section.steps || []), newStep]
    });
  };

  const updateStep = (sectionId: string, stepId: string, updates: Partial<SOPStep>) => {
    const section = sop.sections.find(s => s.id === sectionId);
    if (!section) return;

    updateSection(sectionId, {
      steps: section.steps?.map(step =>
        step.id === stepId ? { ...step, ...updates } : step
      )
    });
  };

  const deleteStep = (sectionId: string, stepId: string) => {
    const section = sop.sections.find(s => s.id === sectionId);
    if (!section) return;

    updateSection(sectionId, {
      steps: section.steps?.filter(s => s.id !== stepId)
    });
  };

  const addTag = () => {
    if (newTag && !sop.tags.includes(newTag)) {
      setSOP({ ...sop, tags: [...sop.tags, newTag] });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setSOP({ ...sop, tags: sop.tags.filter(t => t !== tag) });
  };

  const toggleSectionExpansion = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Header Information */}
      <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#00ff00]/20">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              SOP Name
            </label>
            <input
              type="text"
              value={sop.name}
              onChange={(e) => setSOP({ ...sop, name: e.target.value })}
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#00ff00] focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Organization Type
            </label>
            <select
              value={sop.organizationType}
              onChange={(e) => setSOP({ ...sop, organizationType: e.target.value as any })}
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#00ff00] focus:outline-none"
            >
              <option value="workplace">Workplace</option>
              <option value="school">School</option>
              <option value="clinic">Clinic</option>
              <option value="faith">Faith Organization</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Description
          </label>
          <textarea
            value={sop.description}
            onChange={(e) => setSOP({ ...sop, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#00ff00] focus:outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {sop.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff00]/30 rounded-full text-sm text-[#00ff00] flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-400 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              placeholder="Add a tag"
              className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#00ff00] focus:outline-none"
            />
            <button
              onClick={addTag}
              className="px-4 py-2 bg-[#00ff00] text-black rounded-lg hover:bg-[#00cc00] transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Sections</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addSection}
            className="px-4 py-2 bg-[#00ff00] text-black rounded-lg hover:bg-[#00cc00] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </motion.button>
        </div>

        <AnimatePresence>
          {sop.sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#1a1a1a] rounded-lg border border-[#00ff00]/20 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                    
                    {editingSection === section.id ? (
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        onBlur={() => setEditingSection(null)}
                        onKeyPress={(e) => e.key === 'Enter' && setEditingSection(null)}
                        className="flex-1 px-2 py-1 bg-[#0a0a0a] border border-[#00ff00] rounded text-white focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <h4 className="text-lg font-semibold text-white flex-1">{section.title}</h4>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingSection(section.id)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleSectionExpansion(section.id)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {expandedSections.has(section.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {section.content && (
                  <p className="text-gray-400 mt-2 text-sm">{section.content}</p>
                )}
              </div>

              <AnimatePresence>
                {expandedSections.has(section.id) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="border-t border-[#00ff00]/20"
                  >
                    <div className="p-4 space-y-4">
                      {/* Section Details */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Content Description
                          </label>
                          <textarea
                            value={section.content}
                            onChange={(e) => updateSection(section.id, { content: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-sm focus:border-[#00ff00] focus:outline-none"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Video URL (optional)
                            </label>
                            <div className="flex gap-2">
                              <Video className="w-4 h-4 text-gray-500 mt-2" />
                              <input
                                type="text"
                                value={section.videoUrl || ''}
                                onChange={(e) => updateSection(section.id, { videoUrl: e.target.value })}
                                placeholder="https://..."
                                className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-sm focus:border-[#00ff00] focus:outline-none"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`required-${section.id}`}
                              checked={section.required}
                              onChange={(e) => updateSection(section.id, { required: e.target.checked })}
                              className="w-4 h-4 text-[#00ff00] bg-[#0a0a0a] border-gray-700 rounded focus:ring-[#00ff00]"
                            />
                            <label htmlFor={`required-${section.id}`} className="text-sm text-gray-400">
                              This section is required
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Steps */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-sm font-semibold text-white">Steps</h5>
                          <button
                            onClick={() => addStep(section.id)}
                            className="px-3 py-1 bg-[#00ff00]/20 text-[#00ff00] rounded text-sm hover:bg-[#00ff00]/30 transition-colors flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Add Step
                          </button>
                        </div>

                        <div className="space-y-3">
                          {section.steps?.map((step, stepIndex) => (
                            <StepEditor
                              key={step.id}
                              step={step}
                              stepNumber={stepIndex + 1}
                              onUpdate={(updates) => updateStep(section.id, step.id, updates)}
                              onDelete={() => deleteStep(section.id, step.id)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4 pt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSave(sop)}
          className="px-6 py-3 bg-[#00ff00] text-black font-semibold rounded-lg hover:bg-[#00cc00] transition-colors flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save SOP
        </motion.button>
      </div>
    </div>
  );
}

interface StepEditorProps {
  step: SOPStep;
  stepNumber: number;
  onUpdate: (updates: Partial<SOPStep>) => void;
  onDelete: () => void;
}

function StepEditor({ step, stepNumber, onUpdate, onDelete }: StepEditorProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-gray-700 p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-sm text-gray-500 mt-1">#{stepNumber}</span>
          <div className="flex-1">
            <input
              type="text"
              value={step.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              className="w-full bg-transparent text-white focus:outline-none"
            />
            {step.duration && (
              <div className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">{step.duration}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3 pl-7">
          <div>
            <label className="text-xs text-gray-400">Duration</label>
            <input
              type="text"
              value={step.duration || ''}
              onChange={(e) => onUpdate({ duration: e.target.value })}
              placeholder="e.g., 5-10 minutes"
              className="w-full px-2 py-1 bg-[#1a1a1a] border border-gray-700 rounded text-sm text-white focus:border-[#00ff00] focus:outline-none"
            />
          </div>

          <DetailsList
            label="Materials"
            icon={Package}
            items={step.materials || []}
            onUpdate={(materials) => onUpdate({ materials })}
            placeholder="Add required material"
          />

          <DetailsList
            label="Warnings"
            icon={AlertTriangle}
            items={step.warnings || []}
            onUpdate={(warnings) => onUpdate({ warnings })}
            placeholder="Add warning"
            itemClass="text-yellow-400"
          />

          <DetailsList
            label="Tips"
            icon={Lightbulb}
            items={step.tips || []}
            onUpdate={(tips) => onUpdate({ tips })}
            placeholder="Add tip"
            itemClass="text-[#00ff00]"
          />
        </div>
      )}
    </div>
  );
}

interface DetailsListProps {
  label: string;
  icon: any;
  items: string[];
  onUpdate: (items: string[]) => void;
  placeholder: string;
  itemClass?: string;
}

function DetailsList({ label, icon: Icon, items, onUpdate, placeholder, itemClass = '' }: DetailsListProps) {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem) {
      onUpdate([...items, newItem]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="text-xs text-gray-400 flex items-center gap-1 mb-1">
        <Icon className="w-3 h-3" />
        {label}
      </label>
      <div className="space-y-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className={`flex-1 ${itemClass}`}>{item}</span>
            <button
              onClick={() => removeItem(index)}
              className="text-gray-500 hover:text-red-400 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <div className="flex gap-1">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder={placeholder}
            className="flex-1 px-2 py-1 bg-[#1a1a1a] border border-gray-700 rounded text-sm text-white focus:border-[#00ff00] focus:outline-none"
          />
          <button
            onClick={addItem}
            className="px-2 py-1 bg-[#00ff00]/20 text-[#00ff00] rounded text-sm hover:bg-[#00ff00]/30 transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
