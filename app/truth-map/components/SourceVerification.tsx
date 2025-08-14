'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Link, CheckCircle, XCircle, Clock, Search, Globe, FileText, AlertCircle } from 'lucide-react';

interface SourceVerificationProps {
  entries: any[];
}

export default function SourceVerification({ entries }: SourceVerificationProps) {
  const [verifyingSource, setVerifyingSource] = useState<string>('');
  const [verificationResults, setVerificationResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerifySource = async () => {
    if (!verifyingSource) return;
    
    setLoading(true);
    // Simulate source verification
    setTimeout(() => {
      const mockResults = {
        url: verifyingSource,
        domain: new URL(verifyingSource).hostname,
        trustScore: Math.floor(Math.random() * 40) + 60,
        factors: {
          domainAge: Math.random() > 0.5,
          httpsEnabled: verifyingSource.startsWith('https'),
          knownReliable: Math.random() > 0.3,
          factCheckHistory: Math.floor(Math.random() * 20) + 5,
          recentActivity: Math.random() > 0.4
        },
        relatedClaims: entries.filter(e => 
          e.evidence_sources?.some((s: string) => s.includes(new URL(verifyingSource).hostname))
        ).slice(0, 3)
      };
      setVerificationResults(mockResults);
      setLoading(false);
    }, 1500);
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const allSources = entries.flatMap(entry => [
    ...(entry.evidence_sources || []),
    entry.claim_source
  ].filter(Boolean));

  const sourceDomains = [...new Set(allSources.map(url => {
    try {
      return new URL(url).hostname;
    } catch {
      return null;
    }
  }).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Source Verification Tool */}
      <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-purple-400" />
          Verify Source Reliability
        </h3>
        
        <div className="flex gap-3">
          <input
            type="url"
            value={verifyingSource}
            onChange={(e) => setVerifyingSource(e.target.value)}
            placeholder="Enter source URL to verify..."
            className="flex-1 px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
          />
          <button
            onClick={handleVerifySource}
            disabled={loading || !verifyingSource}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Verifying...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Verify
              </>
            )}
          </button>
        </div>

        {/* Verification Results */}
        {verificationResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4"
          >
            <div className="flex items-center justify-between p-4 bg-black/60 rounded-lg">
              <div>
                <p className="text-sm text-gray-400">Trust Score</p>
                <p className={`text-3xl font-bold ${getTrustScoreColor(verificationResults.trustScore)}`}>
                  {verificationResults.trustScore}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Domain</p>
                <p className="text-white font-medium">{verificationResults.domain}</p>
              </div>
            </div>

            {/* Trust Factors */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(verificationResults.factors).map(([factor, passed]) => (
                <div key={factor} className="flex items-center gap-2 p-3 bg-black/40 rounded-lg">
                  {passed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span className="text-sm text-gray-300 capitalize">
                    {factor.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              ))}
            </div>

            {/* Related Claims */}
            {verificationResults.relatedClaims.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-purple-400 mb-2">Related Claims Using This Source</h4>
                <div className="space-y-2">
                  {verificationResults.relatedClaims.map((claim: any) => (
                    <div key={claim.id} className="p-3 bg-black/40 rounded-lg">
                      <p className="text-sm text-gray-300">{claim.title || 'Untitled'}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Status: <span className={getStatusColor(claim.status)}>{claim.status}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Trusted Sources Registry */}
      <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Globe className="w-6 h-6 text-purple-400" />
          Source Registry
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Most Used Sources */}
          <div>
            <h4 className="text-sm font-semibold text-purple-400 mb-3">Most Referenced Sources</h4>
            <div className="space-y-2">
              {sourceDomains.slice(0, 5).map((domain, idx) => {
                const count = allSources.filter(s => s.includes(domain)).length;
                return (
                  <div key={domain} className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">{domain}</span>
                    </div>
                    <span className="text-xs text-gray-500">{count} references</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Source Statistics */}
          <div>
            <h4 className="text-sm font-semibold text-purple-400 mb-3">Source Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-black/40 rounded-lg">
                <span className="text-sm text-gray-400">Total Sources</span>
                <span className="text-sm text-white font-medium">{allSources.length}</span>
              </div>
              <div className="flex justify-between p-3 bg-black/40 rounded-lg">
                <span className="text-sm text-gray-400">Unique Domains</span>
                <span className="text-sm text-white font-medium">{sourceDomains.length}</span>
              </div>
              <div className="flex justify-between p-3 bg-black/40 rounded-lg">
                <span className="text-sm text-gray-400">Verified Sources</span>
                <span className="text-sm text-green-400 font-medium">
                  {entries.filter(e => e.status === 'verified').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Source Guidelines */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" />
          Source Verification Guidelines
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">Reliable Sources Include:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Peer-reviewed academic journals</li>
              <li>Government official websites</li>
              <li>Established news organizations</li>
              <li>Scientific institutions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">Red Flags to Watch For:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>No author attribution</li>
              <li>Sensationalist headlines</li>
              <li>No citations or references</li>
              <li>Domain mimicking legitimate sites</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'verified': return 'text-green-400';
    case 'debunked': return 'text-red-400';
    case 'under_review': return 'text-yellow-400';
    default: return 'text-gray-400';
  }
}
