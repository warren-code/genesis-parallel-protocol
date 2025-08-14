import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

function CourseCatalog() {
    const [courses, setCourses] = useState<any[]>([]);
    
    useEffect(() => {
        const fetchCourses = async () => {
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .order('created_at', { ascending: true });
            
            if (error) console.error('Error fetching courses:', error);
            else setCourses(data);
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Course Catalog</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <span>Duration: {course.duration} minutes</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseCatalog;
