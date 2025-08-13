'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';

export default function InstructorApplyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bio: '',
    expertise: '',
    experience: '',
    whyTeach: '',
    courseIdeas: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }

      // Create instructor profile
      const { error } = await supabase
        .from('instructors')
        .insert({
          user_id: user.id,
          bio: formData.bio,
          expertise: formData.expertise.split(',').map(e => e.trim()),
          verified: false
        });

      if (error) {
        console.error('Error creating instructor profile:', error);
        alert('Failed to submit application. Please try again.');
      } else {
        alert('Your instructor application has been submitted successfully!');
        router.push('/learning');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Apply to Become an Instructor</h1>
        
        <div className="bg-gray-800 rounded-lg p-8">
          <p className="text-gray-300 mb-6">
            Share your knowledge with the Genesis Protocol community. Fill out this application
            to become an instructor and create courses.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-2">
                Professional Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                required
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Tell us about your background and experience..."
              />
            </div>

            <div>
              <label htmlFor="expertise" className="block text-sm font-medium mb-2">
                Areas of Expertise (comma-separated)
              </label>
              <input
                type="text"
                id="expertise"
                name="expertise"
                required
                value={formData.expertise}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="e.g., Blockchain, Governance, Economics, Memetics"
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium mb-2">
                Teaching/Training Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                rows={3}
                required
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Describe any previous teaching or training experience..."
              />
            </div>

            <div>
              <label htmlFor="whyTeach" className="block text-sm font-medium mb-2">
                Why do you want to teach in the Genesis Protocol?
              </label>
              <textarea
                id="whyTeach"
                name="whyTeach"
                rows={3}
                required
                value={formData.whyTeach}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Share your motivation for becoming an instructor..."
              />
            </div>

            <div>
              <label htmlFor="courseIdeas" className="block text-sm font-medium mb-2">
                Course Ideas
              </label>
              <textarea
                id="courseIdeas"
                name="courseIdeas"
                rows={4}
                required
                value={formData.courseIdeas}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="What courses would you like to create? Provide at least 2-3 ideas..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/learning')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-900 bg-opacity-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">What We're Looking For</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Deep understanding of parallel protocol concepts</li>
            <li>• Ability to explain complex topics in simple terms</li>
            <li>• Commitment to creating high-quality educational content</li>
            <li>• Active participation in the Genesis Protocol community</li>
            <li>• Experience in teaching, training, or content creation (preferred)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
