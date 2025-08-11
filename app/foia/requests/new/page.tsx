'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FOIATemplate } from '@/types/foia';

function NewFOIARequestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams?.get('template') || null;
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    agency_name: '',
    agency_contact: '',
    subject: '',
    request_content: '',
    priority: 3,
    estimated_cost: 0,
    tags: [] as string[],
  });

  const [template, setTemplate] = useState<FOIATemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState('');

  useEffect(() => {
    if (templateId) {
      fetchTemplate(templateId);
    }
  }, [templateId]);

  const fetchTemplate = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('foia_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setTemplate(data);
        setFormData(prev => ({
          ...prev,
          request_content: data.template_content,
          subject: `FOIA Request - ${data.title}`
        }));

        // Increment usage count
        await supabase
          .from('foia_templates')
          .update({ usage_count: (data.usage_count || 0) + 1 })
          .eq('id', id);
      }
    } catch (error) {
      console.error('Error fetching template:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please log in to create a FOIA request');
        return;
      }

      const { data, error } = await supabase
        .from('foia_requests')
        .insert({
          ...formData,
          template_id: templateId,
          status: 'draft',
          requester_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      router.push(`/foia/requests/${data.id}`);
    } catch (error) {
      console.error('Error creating FOIA request:', error);
      alert('Failed to create FOIA request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'priority' || name === 'estimated_cost' ? Number(value) : value
    }));
  };

  const addTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const fillPlaceholder = (placeholder: string) => {
    const value = prompt(`Enter value for: ${placeholder}`);
    if (value) {
      setFormData(prev => ({
        ...prev,
        request_content: prev.request_content.replace(`[${placeholder}]`, value)
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New FOIA Request</h1>

      {template && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            Using template: <span className="font-semibold">{template.title}</span>
          </p>
          {template.placeholders && template.placeholders.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-blue-600 mb-1">Click to fill placeholders:</p>
              <div className="flex flex-wrap gap-1">
                {template.placeholders.map((placeholder, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => fillPlaceholder(placeholder)}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    {placeholder}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="agency_name" className="block text-sm font-medium text-gray-700">
              Agency Name *
            </label>
            <input
              type="text"
              id="agency_name"
              name="agency_name"
              required
              value={formData.agency_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="agency_contact" className="block text-sm font-medium text-gray-700">
              Agency Contact Email
            </label>
            <input
              type="email"
              id="agency_contact"
              name="agency_contact"
              value={formData.agency_contact}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="request_content" className="block text-sm font-medium text-gray-700">
            Request Content *
          </label>
          <textarea
            id="request_content"
            name="request_content"
            required
            rows={12}
            value={formData.request_content}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your FOIA request details..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={1}>1 - Low</option>
              <option value={2}>2 - Medium-Low</option>
              <option value={3}>3 - Medium</option>
              <option value={4}>4 - Medium-High</option>
              <option value={5}>5 - High</option>
            </select>
          </div>

          <div>
            <label htmlFor="estimated_cost" className="block text-sm font-medium text-gray-700">
              Estimated Cost ($)
            </label>
            <input
              type="number"
              id="estimated_cost"
              name="estimated_cost"
              min="0"
              step="0.01"
              value={formData.estimated_cost}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add a tag..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Request'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NewFOIARequestPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto py-8">Loading...</div>}>
      <NewFOIARequestContent />
    </Suspense>
  );
}
