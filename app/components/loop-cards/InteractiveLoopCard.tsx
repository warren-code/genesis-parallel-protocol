'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LoopCard, { LoopCardColumn } from './LoopCard';

interface InteractiveLoopCardProps {
  initialTitle?: string;
  initialDescription?: string;
  initialColumns?: {
    input: LoopCardColumn;
    process: LoopCardColumn;
    output: LoopCardColumn;
    feedback: LoopCardColumn;
    recursion: LoopCardColumn;
  };
  onSave?: (data: any) => void;
  editable?: boolean;
}

const InteractiveLoopCard: React.FC<InteractiveLoopCardProps> = ({
  initialTitle = 'New Loop System',
  initialDescription = 'Click to edit this loop system',
  initialColumns = {
    input: {
      title: 'Input',
      icon: <span>📥</span>,
      content: 'Resources and prerequisites',
      items: [],
    },
    process: {
      title: 'Process',
      icon: <span>⚙️</span>,
      content: 'Transformation steps',
      items: [],
    },
    output: {
      title: 'Output',
      icon: <span>📤</span>,
      content: 'Results and products',
      items: [],
    },
    feedback: {
      title: 'Feedback',
      icon: <span>📊</span>,
      content: 'Monitoring and adjustment',
      items: [],
    },
    recursion: {
      title: 'Recursion',
      icon: <span>🔄</span>,
      content: 'System improvement',
      items: [],
    },
  },
  onSave,
  editable = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [columns, setColumns] = useState(initialColumns);
  const [tempContent, setTempContent] = useState('');
  const [tempItems, setTempItems] = useState<string[]>([]);

  const handleEditColumn = (columnKey: string) => {
    setEditingColumn(columnKey);
    const column = columns[columnKey as keyof typeof columns];
    setTempContent(column.content as string);
    setTempItems(column.items || []);
  };

  const handleSaveColumn = () => {
    if (editingColumn) {
      setColumns({
        ...columns,
        [editingColumn]: {
          ...columns[editingColumn as keyof typeof columns],
          content: tempContent,
          items: tempItems,
        },
      });
      setEditingColumn(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingColumn(null);
    setTempContent('');
    setTempItems([]);
  };

  const handleAddItem = () => {
    setTempItems([...tempItems, '']);
  };

  const handleUpdateItem = (index: number, value: string) => {
    const newItems = [...tempItems];
    newItems[index] = value;
    setTempItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setTempItems(tempItems.filter((_, i) => i !== index));
  };

  const renderEditableColumn = (columnKey: string, column: LoopCardColumn) => {
    const isEditingThis = editingColumn === columnKey;

    if (!editable) {
      return column;
    }

    return {
      ...column,
      content: (
        <AnimatePresence mode="wait">
          {isEditingThis ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <textarea
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                className="w-full p-2 rounded bg-charcoal/50 border border-gold/30 text-white text-sm"
                rows={3}
                placeholder="Enter content..."
              />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-70">Items:</span>
                  <button
                    onClick={handleAddItem}
                    className="text-xs text-gold hover:text-gold-600"
                  >
                    + Add Item
                  </button>
                </div>
                
                {tempItems.map((item, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      value={item}
                      onChange={(e) => handleUpdateItem(index, e.target.value)}
                      className="flex-1 p-1 rounded bg-charcoal/50 border border-gold/30 text-white text-xs"
                      placeholder="Enter item..."
                    />
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-danger hover:text-danger/80"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleSaveColumn}
                  className="flex-1 py-1 px-2 rounded bg-gold text-charcoal text-xs font-medium hover:bg-gold-600"
                >
                  <CheckIcon className="w-3 h-3 inline mr-1" />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 py-1 px-2 rounded bg-danger text-white text-xs font-medium hover:bg-danger/80"
                >
                  <XMarkIcon className="w-3 h-3 inline mr-1" />
                  Cancel
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative group"
            >
              <div>{column.content}</div>
              {column.items && column.items.length > 0 && (
                <ul className="space-y-1 mt-2">
                  {column.items.map((item, index) => (
                    <li key={index} className="flex items-start text-xs">
                      <span className="mr-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => handleEditColumn(columnKey)}
                className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <PencilIcon className="w-4 h-4 text-gold hover:text-gold-600" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      ),
    };
  };

  const editableColumns = {
    input: renderEditableColumn('input', columns.input),
    process: renderEditableColumn('process', columns.process),
    output: renderEditableColumn('output', columns.output),
    feedback: renderEditableColumn('feedback', columns.feedback),
    recursion: renderEditableColumn('recursion', columns.recursion),
  };

  return (
    <div className="relative">
      {editable && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-lg bg-gold/20 text-gold hover:bg-gold/30 transition-colors"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {isEditing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 rounded-2xl border border-gold/30 bg-charcoal/50 backdrop-blur-lg"
        >
          <div className="space-y-4 mb-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-charcoal/50 border border-gold/30 text-gold text-xl font-display font-bold"
              placeholder="Loop Title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-charcoal/50 border border-gold/30 text-gray"
              rows={2}
              placeholder="Loop Description"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => {
                setIsEditing(false);
                if (onSave) {
                  onSave({ title, description, columns });
                }
              }}
              className="flex-1 py-2 px-4 rounded-lg bg-gold text-charcoal font-medium hover:bg-gold-600"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(initialTitle);
                setDescription(initialDescription);
              }}
              className="flex-1 py-2 px-4 rounded-lg bg-danger text-white font-medium hover:bg-danger/80"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      ) : (
        <LoopCard
          title={title}
          description={description}
          {...editableColumns}
          variant="horizontal"
        />
      )}
    </div>
  );
};

export default InteractiveLoopCard;
