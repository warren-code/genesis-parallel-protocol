'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const resources = [
  {
    category: "Guides & Handbooks",
    icon: "📚",
    items: [
      {
        title: "The Peaceful Militant's Handbook",
        description: "A comprehensive guide to non-violent resistance tactics and strategies",
        fileSize: "2.4 MB",
        format: "PDF",
        downloads: "12,450",
        downloadUrl: "/resources/peaceful-resistance-guide.md",
      },
      {
        title: "Organizing for Change",
        description: "Step-by-step instructions for building grassroots movements",
        fileSize: "1.8 MB",
        format: "PDF",
        downloads: "8,320",
      },
      {
        title: "Digital Activism Toolkit",
        description: "Modern tools and platforms for peaceful online resistance",
        fileSize: "3.1 MB",
        format: "PDF",
        downloads: "15,670",
      },
    ],
  },
  {
    category: "Historical Documents",
    icon: "📜",
    items: [
      {
        title: "Letters from Birmingham Jail",
        description: "MLK's profound meditation on civil disobedience",
        fileSize: "450 KB",
        format: "PDF",
        downloads: "23,890",
      },
      {
        title: "Gandhi's Satyagraha Principles",
        description: "The foundational philosophy of truth-force resistance",
        fileSize: "680 KB",
        format: "PDF",
        downloads: "19,230",
      },
      {
        title: "Women's Suffrage Archives",
        description: "Collection of speeches and writings from the movement",
        fileSize: "5.2 MB",
        format: "ZIP",
        downloads: "7,450",
      },
    ],
  },
  {
    category: "Training Materials",
    icon: "🎓",
    items: [
      {
        title: "De-escalation Techniques",
        description: "Essential skills for maintaining peaceful protests",
        fileSize: "1.2 MB",
        format: "PDF",
        downloads: "16,780",
      },
      {
        title: "Legal Rights Primer",
        description: "Know your rights during peaceful demonstrations",
        fileSize: "890 KB",
        format: "PDF",
        downloads: "21,340",
      },
      {
        title: "Community Building Workshop",
        description: "Creating sustainable movements through solidarity",
        fileSize: "2.7 MB",
        format: "PPT",
        downloads: "9,120",
      },
    ],
  },
];

const ResourcesSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent via-[#0a0a0a] to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Resources for <span className="text-[#00ff00]">Peaceful Warriors</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Download free guides, handbooks, and historical documents to deepen your understanding
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="text-5xl mb-3 inline-block"
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white">{category.category}</h3>
              </div>

              {/* Resource Cards */}
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const content = (
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-[#1a1a1a] border border-[#00ff00]/30 rounded-lg p-5 hover:border-[#00ff00] transition-all cursor-pointer group"
                    >
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00ff00] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400 mb-3">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-3 text-xs text-gray-500">
                          <span>{item.format}</span>
                          <span>•</span>
                          <span>{item.fileSize}</span>
                          <span>•</span>
                          <span>{item.downloads} downloads</span>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="text-[#00ff00] group-hover:animate-bounce"
                        >
                          ↓
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                  
                  return item.downloadUrl ? (
                    <Link key={itemIndex} href={item.downloadUrl} download>
                      {content}
                    </Link>
                  ) : (
                    <div key={itemIndex}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Resources CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Looking for more resources? Join our community for exclusive content and updates.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#00ff00] text-black font-bold rounded-full hover:bg-[#00cc00] transition-colors"
            >
              Join Community
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-[#00ff00] text-[#00ff00] font-bold rounded-full hover:bg-[#00ff00] hover:text-black transition-all"
            >
              Submit Resource
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesSection;
