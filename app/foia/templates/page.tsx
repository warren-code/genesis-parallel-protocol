'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FOIATemplate } from '@/types/foia';
import { 
  DocumentDuplicateIcon, 
  PlusIcon,
  TagIcon,
  UserIcon,
  GlobeAltIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const categoryColors: Record<string, string> = {
  'general': 'bg-blue-100 text-blue-800',
  'contracts': 'bg-purple-100 text-purple-800',
  'surveillance': 'bg-red-100 text-red-800',
  'policy': 'bg-green-100 text-green-800',
  'communications': 'bg-yellow-100 text-yellow-800',
  'data': 'bg-indigo-100 text-indigo-800'
};

export default function FOIATemplatesPage() {
  const [templates, setTemplates] = useState<FOIATemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('foia_templates')
        .select('*')
        .order('usage_count', { ascending: false });

      if (error) throw error;
      
      // Add some default templates if none exist
      if (!data || data.length === 0) {
        await createDefaultTemplates();
        return;
      }

      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultTemplates = async () => {
    const defaultTemplates = [
      {
        title: 'General FOIA Request',
        description: 'A basic template for general information requests',
        category: 'general',
        template_content: `Dear [Agency Name],

Under the Freedom of Information Act, 5 U.S.C. § 552, I am requesting access to [specific documents or information requested].

Please provide the documents in electronic format if possible. If any portion of the requested records is exempt from disclosure, please provide the non-exempt portions and cite the specific exemptions.

Thank you for your assistance.

Sincerely,
[Your Name]
[Your Contact Information]`,
        placeholders: ['Agency Name', 'specific documents or information requested', 'Your Name', 'Your Contact Information'],
        tags: ['general', 'basic'],
        is_public: true
      },
      {
        title: 'Government Contracts Request',
        description: 'Request template for government contract information',
        category: 'contracts',
        template_content: `Dear [Agency Name],

Under the Freedom of Information Act, I am requesting access to all contracts, purchase orders, and related documents between [Agency Name] and [Vendor Name] from [Start Date] to [End Date].

This includes:
- Contract agreements and amendments
- Statements of work
- Purchase orders
- Invoices and payment records
- Performance evaluations
- Correspondence related to contract negotiations

Please include documents containing:
- Contract values and pricing structures
- Deliverables and milestones
- Data handling and security requirements
- Surveillance technology capabilities (if applicable)

I request these documents in electronic format. If any portion is exempt from disclosure, please provide the non-exempt portions and cite specific exemptions.

Thank you for your assistance.

Sincerely,
[Your Name]
[Your Contact Information]`,
        placeholders: ['Agency Name', 'Vendor Name', 'Start Date', 'End Date', 'Your Name', 'Your Contact Information'],
        tags: ['contracts', 'vendors', 'procurement'],
        is_public: true
      },
      {
        title: 'Surveillance Technology Request',
        description: 'Template for requesting information about surveillance technologies',
        category: 'surveillance',
        template_content: `Dear [Agency Name],

Under the Freedom of Information Act, I am requesting access to records regarding [Agency Name]'s acquisition, deployment, and use of surveillance technologies from [Start Date] to [End Date].

This includes but is not limited to:
- Purchase orders and contracts for surveillance equipment
- Policies governing the use of surveillance technologies
- Data retention and sharing agreements
- Privacy impact assessments
- Training materials for surveillance technology use
- Statistics on surveillance technology deployment
- Communications with vendors of surveillance technologies

Technologies of interest include:
- Facial recognition systems
- License plate readers
- Cell-site simulators (IMSI catchers/Stingrays)
- Drones/UAVs
- Social media monitoring tools
- Predictive policing software

Please provide documents in electronic format. If exemptions apply, please provide non-exempt portions and cite specific exemptions.

Thank you for your assistance.

Sincerely,
[Your Name]
[Your Contact Information]`,
        placeholders: ['Agency Name', 'Start Date', 'End Date', 'Your Name', 'Your Contact Information'],
        tags: ['surveillance', 'privacy', 'technology'],
        is_public: true
      }
    ];

    try {
      const { error } = await supabase
        .from('foia_templates')
        .insert(defaultTemplates);

      if (error) throw error;
      
      await fetchTemplates();
    } catch (error) {
      console.error('Error creating default templates:', error);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FOIA Request Templates</h1>
          <p className="text-gray-600 mt-1">Use these templates to quickly create FOIA requests</p>
        </div>
        <Link
          href="/foia/templates/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Template
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 mt-2">Loading templates...</p>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <DocumentDuplicateIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No templates found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                  {template.is_public ? (
                    <GlobeAltIcon className="h-5 w-5 text-gray-400" title="Public template" />
                  ) : (
                    <LockClosedIcon className="h-5 w-5 text-gray-400" title="Private template" />
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      categoryColors[template.category] || 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.category}
                    </span>
                    <span className="ml-auto flex items-center">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {template.usage_count} uses
                    </span>
                  </div>

                  {template.tags && template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          <TagIcon className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-3 flex gap-2">
                    <Link
                      href={`/foia/templates/${template.id}`}
                      className="flex-1 text-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
                    >
                      View Template
                    </Link>
                    <Link
                      href={`/foia/requests/new?template=${template.id}`}
                      className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
