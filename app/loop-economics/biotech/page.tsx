'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaDna, FaFlask, FaRecycle, FaLeaf, FaBacterium,
  FaTshirt, FaCubes, FaMicroscope, FaChartLine, FaSeedling,
  FaVial, FaIndustry, FaNetworkWired, FaAtom, FaUserMd
} from 'react-icons/fa';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import Link from 'next/link';

const BiotechPage = () => {
  const biotechSystems = [
    {
      icon: <FaBacterium className="text-3xl" />,
      title: "Bacterial Textiles",
      description: "Growing fabrics from bacteria and fungi to replace synthetic materials",
      features: [
        "Kombucha leather (SCOBY)",
        "Mycelium materials",
        "Bacterial cellulose",
        "Zero-waste production"
      ]
    },
    {
      icon: <FaRecycle className="text-3xl" />,
      title: "Enzymatic Recycling",
      description: "Breaking down plastics and complex materials at molecular level",
      features: [
        "PET depolymerization",
        "Textile fiber recovery",
        "Chemical upcycling",
        "Infinite recyclability"
      ]
    },
    {
      icon: <FaCubes className="text-3xl" />,
      title: "Bio-Polymers",
      description: "Creating plastics from agricultural waste and algae",
      features: [
        "PHA from food waste",
        "Algae-based plastics",
        "Chitin from shells",
        "Compostable packaging"
      ]
    },
    {
      icon: <FaFlask className="text-3xl" />,
      title: "Precision Fermentation",
      description: "Producing proteins, materials, and chemicals without extraction",
      features: [
        "Alternative proteins",
        "Bio-based chemicals",
        "Pharmaceutical precursors",
        "Industrial enzymes"
      ]
    }
  ];

  const materialCycles = [
    {
      material: "Textiles",
      current: "Linear waste: 85% landfilled/burned",
      biotech: "Enzymatic breakdown → New fibers",
      impact: "100% fiber recovery",
      technology: "Engineered enzymes"
    },
    {
      material: "Plastics",
      current: "9% recycled, oceans polluted",
      biotech: "Biological degradation → Monomers",
      impact: "Infinite recycling loops",
      technology: "PETase variants"
    },
    {
      material: "Organics",
      current: "Methane emissions from landfills",
      biotech: "Fermentation → Bio-materials",
      impact: "Carbon-negative products",
      technology: "Microbial consortia"
    },
    {
      material: "Chemicals",
      current: "Petroleum-based production",
      biotech: "Precision fermentation → Pure products",
      impact: "90% energy reduction",
      technology: "Synthetic biology"
    }
  ];

  const communityLabs = [
    {
      type: "Starter Lab",
      scale: "Neighborhood",
      equipment: [
        "Incubators & shakers",
        "Basic microscopy",
        "pH/temp monitoring",
        "Sterile workspace"
      ],
      capabilities: "Kombucha leather, mushroom materials, basic fermentation",
      investment: "$10-25K"
    },
    {
      type: "Production Facility",
      scale: "District",
      equipment: [
        "Bioreactors (100-500L)",
        "Downstream processing",
        "Quality control lab",
        "Cold storage"
      ],
      capabilities: "Bio-polymers, enzymatic recycling, material production",
      investment: "$100-500K"
    },
    {
      type: "Innovation Hub",
      scale: "Regional",
      equipment: [
        "Gene synthesis",
        "Analytical chemistry",
        "Pilot production",
        "R&D facilities"
      ],
      capabilities: "Strain engineering, process optimization, new products",
      investment: "$1-5M"
    }
  ];

  const openBioStack = [
    {
      layer: "Genetic Parts",
      description: "Standardized biological components",
      resources: ["iGEM Registry", "Addgene", "FreeGenes"],
      access: "Open Material Transfer Agreements"
    },
    {
      layer: "Protocols",
      description: "Reproducible methods and procedures",
      resources: ["Protocols.io", "OpenWetWare", "Bio-protocol"],
      access: "Creative Commons licensing"
    },
    {
      layer: "Equipment",
      description: "Open hardware for biotech",
      resources: ["OpenTrons", "OpenPCR", "DIYbio"],
      access: "Build instructions freely available"
    },
    {
      layer: "Data & Models",
      description: "Computational tools and databases",
      resources: ["NCBI", "UniProt", "ModelSEED"],
      access: "Public domain datasets"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
            <FaDna className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Biotech for Circularity
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              Bio-based material cycles replacing extraction and waste
            </p>
          </div>
        </div>
      </motion.div>

      {/* Vision Statement */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-pink-500/20">
          <h2 className="text-2xl font-bold text-pink-400 mb-4">Biology as Technology</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Nature creates no waste—every output becomes input elsewhere. Through <GlossaryTooltip term="Loop Economics">biotechnology</GlossaryTooltip>, 
            we can engineer organisms to eat plastic, grow textiles, and produce materials without mining or drilling. 
            Community biolabs democratize these tools, enabling local production of everything from packaging to medicine 
            using waste as feedstock.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-pink-500/10 rounded-lg">
              <FaRecycle className="text-3xl text-pink-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Waste = Food</h4>
              <p className="text-xs text-gray-400 mt-1">Every byproduct feeds another process</p>
            </div>
            <div className="text-center p-4 bg-pink-500/10 rounded-lg">
              <FaSeedling className="text-3xl text-pink-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Grown Not Mined</h4>
              <p className="text-xs text-gray-400 mt-1">Materials from microbes, not extraction</p>
            </div>
            <div className="text-center p-4 bg-pink-500/10 rounded-lg">
              <FaAtom className="text-3xl text-pink-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Molecular Precision</h4>
              <p className="text-xs text-gray-400 mt-1">Exact materials without contamination</p>
            </div>
            <div className="text-center p-4 bg-pink-500/10 rounded-lg">
              <FaNetworkWired className="text-3xl text-pink-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Distributed Production</h4>
              <p className="text-xs text-gray-400 mt-1">Local labs, global knowledge</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Biotech Applications */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaMicroscope className="text-pink-400" />
          Material Innovation Systems
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {biotechSystems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 text-pink-400">
                  {system.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{system.title}</h3>
                  <p className="text-gray-400 mb-4">{system.description}</p>
                  <ul className="space-y-2">
                    {system.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <FaDna className="text-pink-500 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Material Transformation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaRecycle className="text-pink-400" />
          Material Cycle Transformation
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full glassmorphic-card">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-pink-400">Material Stream</th>
                <th className="text-left p-4 text-gray-400">Current System</th>
                <th className="text-left p-4 text-pink-400">Biotech Solution</th>
                <th className="text-left p-4 text-green-400">Impact</th>
                <th className="text-left p-4 text-purple-400">Technology</th>
              </tr>
            </thead>
            <tbody>
              {materialCycles.map((cycle, index) => (
                <motion.tr
                  key={cycle.material}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="border-b border-gray-800 hover:bg-pink-500/5 transition-colors"
                >
                  <td className="p-4 font-medium text-white">{cycle.material}</td>
                  <td className="p-4 text-red-400 text-sm">{cycle.current}</td>
                  <td className="p-4 text-pink-300 text-sm">{cycle.biotech}</td>
                  <td className="p-4 text-green-400 text-sm font-medium">{cycle.impact}</td>
                  <td className="p-4 text-purple-300 text-sm">{cycle.technology}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Community Lab Models */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaFlask className="text-pink-400" />
          Community Lab Infrastructure
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {communityLabs.map((lab, index) => (
            <motion.div
              key={lab.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-pink-400">{lab.type}</h3>
                <span className="text-sm text-gray-400 px-3 py-1 bg-pink-500/10 rounded-full">
                  {lab.scale}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Equipment:</h4>
                  <ul className="space-y-1">
                    {lab.equipment.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                        <FaVial className="text-pink-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Capabilities:</h4>
                  <p className="text-sm text-pink-300">{lab.capabilities}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Investment:</span>
                    <span className="text-lg font-semibold text-rose-400">{lab.investment}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Open Bio Stack */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaNetworkWired className="text-pink-400" />
          Open Biotechnology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {openBioStack.map((layer, index) => (
            <motion.div
              key={layer.layer}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6"
            >
              <h3 className="text-lg font-semibold text-pink-400 mb-3">{layer.layer}</h3>
              <p className="text-sm text-gray-400 mb-4">{layer.description}</p>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Resources:</h4>
                  <div className="flex flex-wrap gap-2">
                    {layer.resources.map((resource, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-pink-500/10 rounded-full text-pink-300 border border-pink-500/20">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-500">{layer.access}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Case Study */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-pink-500/20">
          <h2 className="text-2xl font-bold text-pink-400 mb-6">Case Study: MycoWorks Material Innovation</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Mushroom Leather Revolution</h3>
              <p className="text-gray-300 mb-4">
                MycoWorks grows premium leather from mycelium (mushroom roots) in just 2 weeks, 
                compared to years for animal leather. Their Fine Mycelium™ technology creates 
                materials identical to leather but with customizable properties.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaLeaf className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Environmental Impact</h4>
                    <p className="text-sm text-gray-400">
                      99% less water, 93% less GHG emissions vs. leather
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCubes className="text-pink-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Production Scale</h4>
                    <p className="text-sm text-gray-400">
                      150,000 sq ft facility producing millions of sq ft annually
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaIndustry className="text-purple-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Market Adoption</h4>
                    <p className="text-sm text-gray-400">
                      Partnerships with Hermès, GM, Ligne Roset
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-pink-500/10 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Open Innovation Principles</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    Published foundational research openly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    Collaborates with universities globally
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    Shares cultivation protocols
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    Supports community biofabrication labs
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-lg border border-pink-500/20">
                <h4 className="font-semibold text-white mb-2">Replication Potential</h4>
                <p className="text-sm text-gray-300">
                  Basic mycelium cultivation can start with $500 in equipment. 
                  Communities worldwide are now growing their own bio-materials 
                  using open-source protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Implementation Pathway */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaChartLine className="text-pink-400" />
          Community Implementation Pathway
        </h2>
        <div className="glassmorphic-card p-8">
          <div className="space-y-6">
            <div className="flex gap-8">
              <div className="w-24 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold mb-2">
                  1
                </div>
                <p className="text-sm text-gray-400">Month 1-3</p>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-pink-400 mb-2">Education & Community Building</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Biotech literacy workshops</li>
                  <li>• Identify local waste streams</li>
                  <li>• Form working groups</li>
                  <li>• Visit existing labs</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="w-24 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold mb-2">
                  2
                </div>
                <p className="text-sm text-gray-400">Month 4-6</p>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-pink-400 mb-2">Starter Lab Setup</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Secure space and permits</li>
                  <li>• Basic equipment acquisition</li>
                  <li>• Safety protocols</li>
                  <li>• First cultivation projects</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="w-24 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold mb-2">
                  3
                </div>
                <p className="text-sm text-gray-400">Month 7-12</p>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-pink-400 mb-2">Production & Iteration</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Scale successful experiments</li>
                  <li>• Product development</li>
                  <li>• Market testing</li>
                  <li>• Revenue generation</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="w-24 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold mb-2">
                  4
                </div>
                <p className="text-sm text-gray-400">Year 2+</p>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-pink-400 mb-2">Network & Scale</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Expand facility</li>
                  <li>• Train other communities</li>
                  <li>• Open-source innovations</li>
                  <li>• Regional bio-economy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="max-w-7xl mx-auto"
      >
        <div className="glassmorphic-card p-8 text-center border border-pink-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">Grow the Future, Don't Mine It</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Every community has waste streams that could become material streams. Every neighborhood 
            could host a biolab growing tomorrow's materials. Start with kombucha leather. Graduate 
            to mycelium packaging. Build toward complete material sovereignty. Biology is the most 
            powerful technology on Earth—let's democratize it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/loop-economics">
              <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
                Explore All Sectors
              </button>
            </Link>
            <Link href="/protocols">
              <button className="px-8 py-4 bg-black/50 border border-pink-500/50 text-pink-400 font-semibold rounded-lg hover:bg-pink-500/10 transition-all duration-300">
                Download Biotech Protocols
              </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default BiotechPage;
