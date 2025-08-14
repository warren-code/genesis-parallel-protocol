import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface InstructorManagementProps {
  userId: string;
}

function InstructorManagement({ userId }: InstructorManagementProps) {
    const [isInstructor, setIsInstructor] = useState(false);
    const [instructorProfile, setInstructorProfile] = useState<any>(null);
    const [courses, setCourses] = useState<any[]>([]);
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        duration: 60,
        level: 'beginner',
        tags: []
    });

    useEffect(() => {
        const checkInstructorStatus = async () => {
            // Check if user is an instructor
            const { data, error } = await supabase
                .from('instructors')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (!error && data) {
                setIsInstructor(true);
                setInstructorProfile(data);
                fetchInstructorCourses(data.id);
            }
        };

        checkInstructorStatus();
    }, [userId]);

    const fetchInstructorCourses = async (instructorId: string) => {
        const { data, error } = await supabase
            .from('course_instructors')
            .select('*, courses(*)')
            .eq('instructor_id', instructorId);

        if (error) console.error('Error fetching courses:', error);
        else setCourses(data.map(item => item.courses));
    };

    const becomeInstructor = async () => {
        const { data, error } = await supabase
            .from('instructors')
            .insert({
                user_id: userId,
                bio: 'New instructor',
                expertise: [],
                verified: false
            })
            .select()
            .single();

        if (error) console.error('Error becoming instructor:', error);
        else {
            setIsInstructor(true);
            setInstructorProfile(data);
        }
    };

    const createCourse = async () => {
        if (!newCourse.title || !newCourse.description) {
            alert('Please fill in all required fields');
            return;
        }

        // Create course
        const { data: courseData, error: courseError } = await supabase
            .from('courses')
            .insert(newCourse)
            .select()
            .single();

        if (courseError) {
            console.error('Error creating course:', courseError);
            return;
        }

        // Link instructor to course
        const { error: linkError } = await supabase
            .from('course_instructors')
            .insert({
                course_id: courseData.id,
                instructor_id: instructorProfile.id,
                role: 'primary'
            });

        if (linkError) console.error('Error linking instructor:', linkError);
        else {
            setCourses([...courses, courseData]);
            setNewCourse({
                title: '',
                description: '',
                duration: 60,
                level: 'beginner',
                tags: []
            });
            alert('Course created successfully!');
        }
    };

    if (!isInstructor) {
        return (
            <div>
                <h3>Become an Instructor</h3>
                <p>Share your knowledge by becoming an instructor.</p>
                <button onClick={becomeInstructor}>Become an Instructor</button>
            </div>
        );
    }

    return (
        <div>
            <h3>Instructor Dashboard</h3>
            
            <div className="instructor-profile">
                <h4>Your Profile</h4>
                <p>Rating: {instructorProfile.rating || 'No ratings yet'}</p>
                <p>Total Students: {instructorProfile.total_students}</p>
                <p>Status: {instructorProfile.verified ? 'Verified' : 'Pending Verification'}</p>
            </div>

            <div className="create-course">
                <h4>Create New Course</h4>
                <input
                    type="text"
                    placeholder="Course Title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                />
                <textarea
                    placeholder="Course Description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    rows={4}
                />
                <input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: parseInt(e.target.value) })}
                />
                <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
                <button onClick={createCourse}>Create Course</button>
            </div>

            <div className="my-courses">
                <h4>My Courses</h4>
                {courses.map(course => (
                    <div key={course.id} className="course-item">
                        <h5>{course.title}</h5>
                        <p>{course.description}</p>
                        <p>Duration: {course.duration} minutes | Level: {course.level}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InstructorManagement;
