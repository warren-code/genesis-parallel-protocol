import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface CertificationProps {
  courseId: string;
  userId: string;
}

function Certification({ courseId, userId }: CertificationProps) {
    const [certification, setCertification] = useState<any>(null);
    const [userProgress, setUserProgress] = useState<any>(null);
    const [courseData, setCourseData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch course progress
            const { data: progressData, error: progressError } = await supabase
                .from('course_progress')
                .select('*')
                .eq('course_id', courseId)
                .eq('user_id', userId)
                .single();

            if (progressError) console.error('Error fetching progress:', progressError);
            else setUserProgress(progressData);

            // Fetch course data
            const { data: courseData, error: courseError } = await supabase
                .from('courses')
                .select('*')
                .eq('id', courseId)
                .single();

            if (courseError) console.error('Error fetching course:', courseError);
            else setCourseData(courseData);

            // Check if user already has certification
            const { data: certData, error: certError } = await supabase
                .from('certifications')
                .select('*')
                .eq('course_id', courseId)
                .eq('user_id', userId)
                .single();

            if (!certError && certData) setCertification(certData);
        };

        fetchData();
    }, [courseId, userId]);

    const generateCertificate = async () => {
        // Check if user has completed the course
        if (userProgress?.completed_percentage < 100) {
            alert('You must complete the course to receive a certificate.');
            return;
        }

        // Generate certificate (in a real app, this would create a PDF)
        const certificateUrl = `/certificates/${userId}-${courseId}.pdf`;

        const { data, error } = await supabase
            .from('certifications')
            .insert({
                user_id: userId,
                course_id: courseId,
                certificate_url: certificateUrl
            })
            .select()
            .single();

        if (error) console.error('Error generating certificate:', error);
        else {
            setCertification(data);
            alert('Certificate generated successfully!');
        }
    };

    return (
        <div>
            <h3>Course Certification</h3>
            {certification ? (
                <div>
                    <p>Congratulations! You have earned a certificate for {courseData?.title}</p>
                    <p>Certificate issued on: {new Date(certification.issued_date).toLocaleDateString()}</p>
                    <a href={certification.certificate_url} download>Download Certificate</a>
                </div>
            ) : (
                <div>
                    <p>Complete the course to earn your certificate</p>
                    <p>Current Progress: {userProgress?.completed_percentage || 0}%</p>
                    {userProgress?.completed_percentage >= 100 && (
                        <button onClick={generateCertificate}>Generate Certificate</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Certification;
