'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import { getCurrentUser } from '../../../../lib/supabase';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [progress, setProgress] = useState(null);
  const [user, setUser] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourseData = async () => {
      setLoading(true);
      
      // Get current user
      const { user: currentUser } = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }

      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(`
          *,
          course_instructors(
            instructors(
              *,
              users(full_name)
            )
          )
        `)
        .eq('id', courseId)
        .single();

      if (courseError) {
        console.error('Error fetching course:', courseError);
        return;
      }

      setCourse(courseData);

      // Fetch course materials
      const { data: materialsData, error: materialsError } = await supabase
        .from('course_materials')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

      if (!materialsError) {
        setMaterials(materialsData);
      }

      // Check enrollment status and progress
      if (currentUser) {
        const { data: enrollmentData } = await supabase
          .from('course_enrollments')
          .select('*')
          .eq('course_id', courseId)
          .eq('user_id', currentUser.id)
          .single();

        if (enrollmentData) {
          setEnrolled(true);
          
          // Fetch progress
          const { data: progressData } = await supabase
            .from('course_progress')
            .select('*')
            .eq('course_id', courseId)
            .eq('user_id', currentUser.id)
            .single();
            
          if (progressData) {
            setProgress(progressData);
          }
        }
      }

      setLoading(false);
    };

    loadCourseData();
  }, [courseId]);

  const handleEnroll = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const { error: enrollError } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: user.id,
        course_id: courseId,
        status: 'active'
      });

    if (!enrollError) {
      // Initialize progress
      await supabase
        .from('course_progress')
        .insert({
          user_id: user.id,
          course_id: courseId,
          completed_percentage: 0
        });

      setEnrolled(true);
      alert('Successfully enrolled in the course!');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <p>Loading course...</p>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <p>Course not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Course Header */}
        <div className="bg-gray-800 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-300 text-lg mb-6">{course.description}</p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
              {course.level}
            </span>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
              {course.duration} minutes
            </span>
            {course.tags?.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {!enrolled ? (
            <button
              onClick={handleEnroll}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Enroll in Course
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-green-400">✓ You are enrolled in this course</p>
              {progress && (
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${progress.completed_percentage}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Course Navigation */}
        <div className="flex gap-4 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'materials'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Course Materials
          </button>
          <button
            onClick={() => setActiveTab('discussion')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'discussion'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Discussion
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'quiz'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Quiz & Certification
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <div className="prose prose-lg prose-invert max-w-none">
              <h2>Course Overview</h2>
              <p>{course.description}</p>
              
              <h3>What You'll Learn</h3>
              <ul>
                <li>Core concepts of {course.title.toLowerCase()}</li>
                <li>Practical applications in the Genesis Protocol</li>
                <li>Best practices and common patterns</li>
                <li>Real-world case studies</li>
              </ul>

              <h3>Instructors</h3>
              {course.course_instructors?.map((ci, index) => (
                <div key={index} className="mb-4">
                  <h4>{ci.instructors.users?.full_name || 'Instructor'}</h4>
                  <p>{ci.instructors.bio}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Course Materials</h2>
              {enrolled ? (
                materials.length > 0 ? (
                  <div className="grid gap-4">
                    {materials.map((material, index) => (
                      <div key={material.id} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {index + 1}. {material.title}
                            </h3>
                            <p className="text-gray-400">{material.description}</p>
                            <span className="text-sm text-gray-500">
                              Type: {material.material_type}
                            </span>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                            Access
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No materials available yet.</p>
                )
              ) : (
                <div className="bg-gray-800 p-6 rounded-lg text-center">
                  <p className="text-gray-400 mb-4">
                    Enroll in this course to access the materials
                  </p>
                  <button
                    onClick={handleEnroll}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Course Discussion</h2>
              {enrolled ? (
                <div className="bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-400">Discussion forum coming soon...</p>
                </div>
              ) : (
                <div className="bg-gray-800 p-6 rounded-lg text-center">
                  <p className="text-gray-400 mb-4">
                    Join the course to participate in discussions
                  </p>
                  <button
                    onClick={handleEnroll}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Quiz & Certification</h2>
              {enrolled ? (
                <div className="bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-400">
                    Complete all course materials to unlock the final quiz and earn your certificate.
                  </p>
                  {progress?.completed_percentage >= 100 && (
                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Take Quiz
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-gray-800 p-6 rounded-lg text-center">
                  <p className="text-gray-400 mb-4">
                    Enroll in the course to access quizzes and earn certificates
                  </p>
                  <button
                    onClick={handleEnroll}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
