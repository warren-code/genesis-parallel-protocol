'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState('catalog');

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Learning Hub</h1>
        
        <section className="prose prose-lg mx-auto max-w-4xl">
          <h2>Parallel Protocol Education</h2>
          <p>Learn about loop economics, decentralized governance, and memetic structures that power our parallel civilization.</p>
        </section>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'catalog'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Course Catalog
          </button>
          <button
            onClick={() => setActiveTab('my-courses')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'my-courses'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('instructor')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'instructor'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Instructor Portal
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="mt-8">
          {activeTab === 'catalog' && (
            <div className="grid gap-6">
              <h3 className="text-2xl font-bold">Available Courses</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/learning/courses/loop-economics" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <h4 className="text-xl font-semibold mb-2">Loop Economics 101</h4>
                  <p className="text-gray-400 mb-4">Understanding recursive value loops and economic cycles in decentralized systems.</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Beginner</span>
                    <span>120 min</span>
                  </div>
                </Link>
                <Link href="/learning/courses/governance" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <h4 className="text-xl font-semibold mb-2">Decentralized Governance</h4>
                  <p className="text-gray-400 mb-4">Learn about consensus mechanisms and decision-making in parallel systems.</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Intermediate</span>
                    <span>180 min</span>
                  </div>
                </Link>
                <Link href="/learning/courses/memetics" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <h4 className="text-xl font-semibold mb-2">Memetic Engineering</h4>
                  <p className="text-gray-400 mb-4">Master the art of creating and spreading powerful ideas in decentralized networks.</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Advanced</span>
                    <span>240 min</span>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'my-courses' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">My Learning Progress</h3>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-400">You haven't enrolled in any courses yet. Browse our catalog to get started!</p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Browse Courses
                </button>
              </div>
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Instructor Portal</h3>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">Become an Instructor</h4>
                <p className="text-gray-400 mb-4">
                  Share your knowledge with the community. Apply to become an instructor and create courses on parallel protocol concepts.
                </p>
                <Link
                  href="/learning/instructor/apply"
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Core Concepts Section */}
        <section className="mt-12 prose prose-lg mx-auto max-w-4xl">
          <h3>Core Concepts</h3>
          <ul>
            <li>Understanding recursive value loops</li>
            <li>Decentralized decision-making frameworks</li>
            <li>Memetic propagation patterns</li>
            <li>Community coordination mechanisms</li>
          </ul>
          
          <h3>Resources</h3>
          <p>Access guides, documentation, and interactive learning experiences to deepen your understanding of the Genesis Protocol.</p>
        </section>
      </div>
    </main>
  );
}
