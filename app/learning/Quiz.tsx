import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface QuizProps {
  courseId: string;
  userId: string;
}

function Quiz({ courseId, userId }: QuizProps) {
    const [quiz, setQuiz] = useState<any>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<any>({});

    useEffect(() => {
        const fetchQuiz = async () => {
            const { data, error } = await supabase
                .from('quizzes')
                .select('*, quiz_questions(*)')
                .eq('course_id', courseId)
                .limit(1)
                .single();

            if (error) console.error('Error fetching quiz:', error);
            else setQuiz(data);
        };

        fetchQuiz();
    }, [courseId]);

    const handleSubmit = async () => {
        // Evaluate answers here
        const score = quiz.quiz_questions.reduce((acc: number, question: any) => {
            const isCorrect = selectedAnswers[question.id] === question.correct_answer;
            return acc + (isCorrect ? question.marks : 0);
        }, 0);

        const { error } = await supabase.from('quiz_attempts').insert({
            user_id: userId,
            quiz_id: quiz.id,
            score,
            total_questions: quiz.quiz_questions.length,
            correct_answers: Object.values(selectedAnswers).filter(
                (answer, index) => answer === quiz.quiz_questions[index].correct_answer
            ).length,
            time_taken: 0, // Implement time tracking if needed
            passed: score >= quiz.total_marks * 0.7, // Example: 70% passing
        });

        if (error) console.error('Error submitting quiz attempt:', error);
        else alert('Quiz submitted successfully');
    };

    return (
        <div>
            <h3>Quiz</h3>
            {quiz?.quiz_questions.map((question: any, index: number) => (
                <div key={question.id}>
                    <p>{index + 1}. {question.question}</p>
                    {Object.keys(question.options).map((option: string, idx: number) => (
                        <label key={idx}>
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={selectedAnswers[question.id] === option}
                                onChange={() => setSelectedAnswers({ ...selectedAnswers, [question.id]: option })}
                            />
                            {question.options[option]}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
    );
}

export default Quiz;
