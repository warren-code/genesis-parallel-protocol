'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FOIADocument, FOIADocumentVersion } from '@/types/foia';
import { 
  DocumentTextIcon, 
  PencilIcon, 
  LockClosedIcon,
  LockOpenIcon,
  ClockIcon,
  UserIcon,
  ArrowUturnLeftIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface CollaborativeEditorProps {
  documentId: string;
  requestId: string;
  onSave?: () => void;
}

export default function CollaborativeEditor({ 
  documentId, 
  requestId,
  onSave 
}: CollaborativeEditorProps) {
  const [document, setDocument] = useState<FOIADocument | null>(null);
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [versions, setVersions] = useState<FOIADocumentVersion[]>([]);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (documentId) {
      fetchDocument();
      fetchVersions();
      subscribeToChanges();
    }

    return () => {
      // Unlock document when component unmounts
      if (isLocked && document) {
        unlockDocument();
      }
    };
  }, [documentId]);

  const fetchDocument = async () => {
    try {
      const { data, error } = await supabase
        .from('foia_documents')
        .select('*')
        .eq('id', documentId)
        .single();

      if (error) throw error;

      setDocument(data);
      setContent(data.content || '');
      setIsLocked(!!data.locked_by);
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  const fetchVersions = async () => {
    try {
      const { data, error } = await supabase
        .from('foia_document_versions')
        .select('*')
        .eq('document_id', documentId)
        .order('version_number', { ascending: false });

      if (error) throw error;

      setVersions(data || []);
    } catch (error) {
      console.error('Error fetching versions:', error);
    }
  };

  const subscribeToChanges = () => {
    const channel = supabase
      .channel(`document-${documentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'foia_documents',
          filter: `id=eq.${documentId}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            const updated = payload.new as FOIADocument;
            setDocument(updated);
            if (!isEditing && updated.content !== content) {
              setContent(updated.content || '');
            }
            setIsLocked(!!updated.locked_by);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const lockDocument = async () => {
    if (!document) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('foia_documents')
        .update({ 
          locked_by: user.id,
          locked_at: new Date().toISOString()
        })
        .eq('id', documentId);

      if (error) throw error;

      setIsLocked(true);
      setIsEditing(true);
    } catch (error) {
      console.error('Error locking document:', error);
    }
  };

  const unlockDocument = async () => {
    if (!document) return;

    try {
      const { error } = await supabase
        .from('foia_documents')
        .update({ 
          locked_by: null,
          locked_at: null
        })
        .eq('id', documentId);

      if (error) throw error;

      setIsLocked(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error unlocking document:', error);
    }
  };

  const saveDocument = async () => {
    if (!document) return;
    
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Create a new version
      const newVersion = document.version + 1;
      
      // Save version history
      await supabase
        .from('foia_document_versions')
        .insert({
          document_id: documentId,
          version_number: document.version,
          content: document.content,
          edited_by: user.id,
          edit_summary: 'Manual edit'
        });

      // Update document
      const { error } = await supabase
        .from('foia_documents')
        .update({
          content,
          version: newVersion,
          last_edited_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', documentId);

      if (error) throw error;

      await fetchVersions();
      onSave?.();
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setSaving(false);
    }
  };

  const restoreVersion = async (version: FOIADocumentVersion) => {
    if (!document) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setContent(version.content || '');
      await saveDocument();
    } catch (error) {
      console.error('Error restoring version:', error);
    }
  };

  const downloadDocument = () => {
    if (!document) return;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.document_name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!document) {
    return <div className="text-center py-8">Loading document...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="h-6 w-6 text-gray-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {document.document_name}
              </h3>
              <p className="text-sm text-gray-500">
                Version {document.version} • {document.document_type}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isLocked && document.locked_by && (
              <div className="flex items-center text-sm text-yellow-600">
                <LockClosedIcon className="h-4 w-4 mr-1" />
                Locked by someone
              </div>
            )}
            {!isEditing ? (
              <button
                onClick={lockDocument}
                disabled={isLocked}
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={saveDocument}
                  disabled={saving}
                  className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={unlockDocument}
                  className="inline-flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}
            <button
              onClick={() => setShowVersionHistory(!showVersionHistory)}
              className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <ClockIcon className="h-4 w-4 mr-2" />
              History
            </button>
            <button
              onClick={downloadDocument}
              className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex">
        <div className={`flex-1 ${showVersionHistory ? 'border-r border-gray-200' : ''}`}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!isEditing}
            className={`w-full h-96 p-6 resize-none focus:outline-none ${
              isEditing ? 'bg-white' : 'bg-gray-50'
            }`}
            placeholder="Enter document content..."
          />
        </div>

        {/* Version History */}
        {showVersionHistory && (
          <div className="w-80 p-4 bg-gray-50 overflow-y-auto max-h-96">
            <h4 className="font-semibold text-gray-900 mb-3">Version History</h4>
            {versions.length === 0 ? (
              <p className="text-sm text-gray-500">No previous versions</p>
            ) : (
              <div className="space-y-3">
                {versions.map((version) => (
                  <div
                    key={version.id}
                    className="bg-white p-3 rounded-md border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        Version {version.version_number}
                      </span>
                      <button
                        onClick={() => restoreVersion(version)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Restore
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(version.created_at).toLocaleString()}
                    </p>
                    {version.edit_summary && (
                      <p className="text-xs text-gray-600 mt-1">
                        {version.edit_summary}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            {document.last_edited_by && (
              <span className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                Last edited {new Date(document.updated_at).toLocaleString()}
              </span>
            )}
          </div>
          <div>
            {document.is_redacted && (
              <span className="text-red-600">
                This document contains redactions
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
