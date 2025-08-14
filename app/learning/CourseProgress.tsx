import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface CourseProgressProps {
  courseId: string;
  userId: string;
}

function CourseProgress({ courseId, userId }: CourseProgressProps) {
    const [progress, setProgress] = useState<any>(null);
    
    useEffect(() => {
        const fetchProgress = async () => {
            const { data, error } = await supabase
                .from('course_progress')
                .select('*')
                .eq('course_id', courseId)
                .eq('user_id', userId)
                .single();
            
            if (error) console.error('Error fetching progress:', error);
            else setProgress(data);
        };

        fetchProgress();
    }, [courseId, userId]);

    const updateProgress = async (percentage: number) => {
        const { error } = await supabase
            .from('course_progress')
            .upsert({
                course_id: courseId,
                user_id: userId,
                completed_percentage: percentage,
                last_accessed: new Date()
            });

        if (error) console.error('Error updating progress:', error);
        else setProgress({ ...progress, completed_percentage: percentage });
    };

    return (
        <div>
            <h3>Your Progress</h3>
            <progress value={progress?.completed_percentage || 0} max="100">
                {progress?.completed_percentage || 0}%
            </progress>
            <span>{progress?.completed_percentage || 0}% Complete</span>
        </div>
    );
}

export default CourseProgress;
