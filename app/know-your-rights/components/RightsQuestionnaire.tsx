'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';

interface Question {
  id: string;
  question: {
    en: string;
    es: string;
    fr: string;
    zh: string;
  };
  options: {
    en: string[];
    es: string[];
    fr: string[];
    zh: string[];
  };
  nextQuestions: Record<number, string>;
  rights: string[];
}

const questionnaire: Question[] = [
  {
    id: 'q1',
    question: {
      en: 'What type of situation are you dealing with?',
      es: '¿Con qué tipo de situación está tratando?',
      fr: 'À quel type de situation êtes-vous confronté?',
      zh: '您正在处理什么类型的情况？'
    },
    options: {
      en: ['Police Interaction', 'Workplace Issue', 'Housing Problem', 'Digital Privacy', 'Healthcare'],
      es: ['Interacción Policial', 'Problema Laboral', 'Problema de Vivienda', 'Privacidad Digital', 'Atención Médica'],
      fr: ['Interaction avec la Police', 'Problème au Travail', 'Problème de Logement', 'Confidentialité Numérique', 'Soins de Santé'],
      zh: ['警察互动', '工作问题', '住房问题', '数字隐私', '医疗保健']
    },
    nextQuestions: {
      0: 'q2-police',
      1: 'q2-work',
      2: 'q2-housing',
      3: 'q2-digital',
      4: 'q2-health'
    },
    rights: []
  },
  {
    id: 'q2-police',
    question: {
      en: 'What is happening in your police interaction?',
      es: '¿Qué está sucediendo en su interacción con la policía?',
      fr: 'Que se passe-t-il dans votre interaction avec la police?',
      zh: '您与警察的互动中发生了什么？'
    },
    options: {
      en: ['Being stopped on the street', 'Being arrested', 'Being questioned', 'Traffic stop'],
      es: ['Siendo detenido en la calle', 'Siendo arrestado', 'Siendo interrogado', 'Parada de tráfico'],
      fr: ['Arrêté dans la rue', 'Être arrêté', 'Être interrogé', 'Contrôle routier'],
      zh: ['在街上被拦截', '被逮捕', '被询问', '交通拦截']
    },
    nextQuestions: {},
    rights: ['right-1', 'right-2']
  },
  {
    id: 'q2-work',
    question: {
      en: 'What workplace issue are you facing?',
      es: '¿Qué problema laboral está enfrentando?',
      fr: 'Quel problème rencontrez-vous au travail?',
      zh: '您面临什么工作问题？'
    },
    options: {
      en: ['Unpaid wages', 'Overtime not paid', 'Discrimination', 'Unsafe conditions'],
      es: ['Salarios no pagados', 'Horas extras no pagadas', 'Discriminación', 'Condiciones inseguras'],
      fr: ['Salaires impayés', 'Heures supplémentaires non payées', 'Discrimination', 'Conditions dangereuses'],
      zh: ['未付工资', '未付加班费', '歧视', '不安全的条件']
    },
    nextQuestions: {},
    rights: ['right-3']
  },
  {
    id: 'q2-housing',
    question: {
      en: 'What housing issue are you experiencing?',
      es: '¿Qué problema de vivienda está experimentando?',
      fr: 'Quel problème de logement rencontrez-vous?',
      zh: '您遇到什么住房问题？'
    },
    options: {
      en: ['Discrimination in renting', 'Eviction threat', 'Repairs needed', 'Deposit issues'],
      es: ['Discriminación al alquilar', 'Amenaza de desalojo', 'Reparaciones necesarias', 'Problemas de depósito'],
      fr: ['Discrimination à la location', 'Menace d\'expulsion', 'Réparations nécessaires', 'Problèmes de dépôt'],
      zh: ['租房歧视', '驱逐威胁', '需要维修', '押金问题']
    },
    nextQuestions: {},
    rights: ['right-5']
  },
  {
    id: 'q2-digital',
    question: {
      en: 'What digital privacy concern do you have?',
      es: '¿Qué preocupación de privacidad digital tiene?',
      fr: 'Quelle préoccupation de confidentialité numérique avez-vous?',
      zh: '您有什么数字隐私担忧？'
    },
    options: {
      en: ['Data collection without consent', 'Data breach', 'Want data deleted', 'Unclear privacy policy'],
      es: ['Recopilación de datos sin consentimiento', 'Violación de datos', 'Quiere datos eliminados', 'Política de privacidad poco clara'],
      fr: ['Collecte de données sans consentement', 'Violation de données', 'Veut supprimer des données', 'Politique de confidentialité peu claire'],
      zh: ['未经同意收集数据', '数据泄露', '想要删除数据', '隐私政策不清楚']
    },
    nextQuestions: {},
    rights: ['right-4']
  },
  {
    id: 'q2-health',
    question: {
      en: 'What healthcare situation are you in?',
      es: '¿En qué situación de atención médica se encuentra?',
      fr: 'Dans quelle situation de soins de santé êtes-vous?',
      zh: '您处于什么医疗保健情况？'
    },
    options: {
      en: ['Emergency care needed', 'Denied treatment', 'Insurance issues', 'Medical records access'],
      es: ['Atención de emergencia necesaria', 'Tratamiento denegado', 'Problemas de seguro', 'Acceso a registros médicos'],
      fr: ['Soins d\'urgence nécessaires', 'Traitement refusé', 'Problèmes d\'assurance', 'Accès aux dossiers médicaux'],
      zh: ['需要紧急护理', '被拒绝治疗', '保险问题', '医疗记录访问']
    },
    nextQuestions: {},
    rights: ['right-6']
  }
];

const RightsQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string>('q1');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const { language } = useLanguage();

  const question = questionnaire.find(q => q.id === currentQuestion);

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
    
    const nextQuestionId = question?.nextQuestions[optionIndex];
    if (nextQuestionId) {
      setCurrentQuestion(nextQuestionId);
    } else {
      setShowResults(true);
    }
  };

  const reset = () => {
    setCurrentQuestion('q1');
    setAnswers({});
    setShowResults(false);
  };

  const getRelevantRights = () => {
    const relevantRightIds = new Set<string>();
    Object.keys(answers).forEach(questionId => {
      const q = questionnaire.find(q => q.id === questionId);
      q?.rights.forEach(rightId => relevantRightIds.add(rightId));
    });
    return Array.from(relevantRightIds);
  };

  return (
    <GlassmorphicCard className="p-6">
      <h2 className="text-2xl font-display font-bold mb-6 text-accent">
        Rights Assessment Questionnaire
      </h2>
      
      <AnimatePresence mode="wait">
        {!showResults && question && (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-ink">
              {question.question[language]}
            </h3>
            
            <div className="space-y-3">
              {question.options[language].map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-4 text-left rounded-lg border border-ink/20 bg-ink/5 
                           hover:bg-ink/10 hover:border-accent/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            
            {Object.keys(answers).length > 0 && (
              <Button
                onClick={reset}
                variant="ghost"
                className="mt-4"
              >
                Start Over
              </Button>
            )}
          </motion.div>
        )}
        
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-ink">
              Your Rights Assessment Results
            </h3>
            
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 mb-6">
              <p className="text-sm text-gray mb-2">
                Based on your answers, these rights are most relevant to your situation:
              </p>
              <div className="space-y-2">
                {getRelevantRights().map(rightId => (
                  <div key={rightId} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-signal" />
                    <span className="text-sm font-medium text-signal">
                      View right: {rightId}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={reset} variant="accent">
                Take Again
              </Button>
              <Button variant="outline">
                Save Results
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassmorphicCard>
  );
};

export default RightsQuestionnaire;
