'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const concepts = [
  {
    title: "The Paradox of Power",
    description: "True strength lies not in violence, but in the unwavering commitment to justice through peaceful means.",
    details: "Peaceful militance harnesses the moral high ground, turning oppression into a mirror that reflects injustice back upon itself.",
    icon: "⚖️",
  },
  {
    title: "Strategic Non-Violence",
    description: "Every peaceful action is carefully calculated to maximize impact while maintaining ethical integrity.",
    details: "From sit-ins to boycotts, each tactic is designed to disrupt systems of oppression without perpetuating cycles of violence.",
    icon: "♟️",
  },
  {
    title: "Collective Consciousness",
    description: "Individual actions ripple outward, creating waves of change that reshape society.",
    details: "When people unite in peaceful resistance, they become an unstoppable force that no authority can ignore.",
    icon: "🌊",
  },
  {
    title: "Moral Authority",
    description: "By refusing to meet violence with violence, peaceful militants claim an unassailable position.",
    details: "This moral authority transforms public opinion, turning bystanders into allies and oppressors into the isolated few.",
    icon: "🛡️",
  },
];

const ConceptExplainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create transforms outside of the map function
  const transforms = concepts.map((_, index) => {
    const start = index / concepts.length;
    const end = (index + 1) / concepts.length;
    
    return {
      opacity: useTransform(
        scrollYProgress,
        [start * 0.5, start * 0.7, end * 0.7, end * 0.9],
        [0, 1, 1, 0]
      ),
      scale: useTransform(
        scrollYProgress,
        [start * 0.5, start * 0.7, end * 0.7, end * 0.9],
        [0.8, 1, 1, 0.8]
      ),
      x: useTransform(
        scrollYProgress,
        [start * 0.5, start * 0.7],
        index % 2 === 0 ? [-100, 0] : [100, 0]
      )
    };
  });

  return (
    <section ref={containerRef} className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Understanding <span className="text-[#00ff00]">Peaceful Militance</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A revolutionary approach that transforms conflict through strategic non-violence
          </p>
        </motion.div>

        <div className="space-y-32">
          {concepts.map((concept, index) => {
            const { opacity, scale, x } = transforms[index];

            return (
              <motion.div
                key={index}
                style={{ opacity, scale, x }}
                className="relative"
              >
                <div className={`flex flex-col md:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}>
                  {/* Icon Side */}
                  <div className="flex-1 flex justify-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className="relative w-48 h-48 md:w-64 md:h-64"
                    >
                      <div className="absolute inset-0 bg-[#00ff00]/20 rounded-full blur-2xl" />
                      <div className="relative w-full h-full bg-gradient-to-br from-[#00ff00]/10 to-[#00cc00]/10 rounded-full flex items-center justify-center border-2 border-[#00ff00]/30">
                        <span className="text-6xl md:text-8xl">{concept.icon}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      {concept.title}
                    </h3>
                    <p className="text-xl text-gray-300">
                      {concept.description}
                    </p>
                    <p className="text-lg text-gray-400">
                      {concept.details}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-block"
                    >
                      <button className="px-6 py-3 border-2 border-[#00ff00] text-[#00ff00] rounded-full hover:bg-[#00ff00] hover:text-black transition-all">
                        Learn More
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConceptExplainer;
