'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaLeaf, FaSeedling, FaCarrot, FaFish, FaRecycle,
  FaWarehouse, FaHome, FaTruck, FaChartLine, FaUsers,
  FaWater, FaSun, FaMicroscope, FaRobot, FaShoppingBasket, FaBook
} from 'react-icons/fa';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { GlossarySection } from '@/components/GlossarySection';
import Link from 'next/link';

const FoodPage = () => {
  const foodSystems = [
    {
      icon: <FaWarehouse className="text-3xl" />,
      title: "Urban Farming",
      description: "High-density food production in cities using vertical farms and rooftop gardens",
      features: [
        "Vertical farming towers",
        "Hydroponic systems",
        "LED grow light optimization",
        "Year-round production"
      ]
    },
    {
      icon: <FaSeedling className="text-3xl" />,
      title: "Regenerative Agriculture",
      description: "Soil-building practices that sequester carbon and increase biodiversity",
      features: [
        "No-till cultivation",
        "Cover crop rotations",
        "Integrated pest management",
        "Compost tea applications"
      ]
    },
    {
      icon: <FaFish className="text-3xl" />,
      title: "Aquaponics Networks",
      description: "Closed-loop fish and vegetable production with zero waste discharge",
      features: [
        "Fish waste nutrient cycling",
        "Biofilter management",
        "pH balance automation",
        "Multi-species integration"
      ]
    },
    {
      icon: <FaRecycle className="text-3xl" />,
      title: "Waste Recapture",
      description: "Converting food waste into compost, biogas, and animal feed",
      features: [
        "Community composting hubs",
        "Black soldier fly larvae",
        "Bokashi fermentation",
        "Nutrient recovery systems"
      ]
    }
  ];

  const productionMetrics = [
    {
      metric: "Yield Increase",
      value: "3-5x",
      description: "vs. traditional farming per sq ft",
      details: "Vertical farming and intensive methods multiply production capacity"
    },
    {
      metric: "Water Savings",
      value: "90%",
      description: "reduction in usage",
      details: "Recirculating hydroponic and aquaponic systems minimize water waste"
    },
    {
      metric: "Transport Miles",
      value: "<10",
      description: "average food miles",
      details: "Hyperlocal production eliminates long-distance shipping"
    },
    {
      metric: "Waste Diverted",
      value: "95%",
      description: "organic waste recycled",
      details: "Complete nutrient cycling returns organics to soil"
    }
  ];

  const implementationModels = [
    {
      name: "Neighborhood Food Hub",
      scale: "50-200 households",
      components: [
        "Shared greenhouse (2,000 sq ft)",
        "Composting facility",
        "Tool library & seed bank",
        "Weekly harvest shares"
      ],
      investment: "$50-100K initial",
      payback: "2-3 years"
    },
    {
      name: "Urban Farm Cooperative",
      scale: "500-1000 households",
      components: [
        "Multi-site production (5 acres)",
        "Processing kitchen",
        "Cold storage facility",
        "CSA distribution network"
      ],
      investment: "$250-500K initial",
      payback: "3-4 years"
    },
    {
      name: "Regional Food System",
      scale: "10,000+ households",
      components: [
        "Vertical farm facilities",
        "Aquaponics complexes",
        "Food processing hub",
        "Distribution logistics"
      ],
      investment: "$2-5M initial",
      payback: "4-5 years"
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
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
            <FaLeaf className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Food Sovereignty
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              Regenerative agriculture systems for abundant local nutrition
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
        <div className="glassmorphic-card p-8 border border-green-500/20">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Breaking the Industrial Food Chain</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Industrial agriculture depletes soil, poisons water, and ships tasteless produce thousands of miles. 
            <GlossaryTooltip term="Loop Economics">Loop food systems</GlossaryTooltip> grow nutrient-dense food 
            where people live, rebuild soil health, and create meaningful work. Every neighborhood becomes 
            its own breadbasket, every rooftop a garden, every waste stream a resource.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <FaSun className="text-2xl text-green-400 mb-2" />
              <h4 className="font-semibold text-white">Year-Round Production</h4>
              <p className="text-sm text-gray-400 mt-1">
                Climate-controlled growing extends seasons indefinitely
              </p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <FaWater className="text-2xl text-green-400 mb-2" />
              <h4 className="font-semibold text-white">Water Conservation</h4>
              <p className="text-sm text-gray-400 mt-1">
                Closed-loop systems use 10% of traditional irrigation
              </p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <FaUsers className="text-2xl text-green-400 mb-2" />
              <h4 className="font-semibold text-white">Community Ownership</h4>
              <p className="text-sm text-gray-400 mt-1">
                Cooperative models share costs, labor, and abundance
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Food Production Systems */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaCarrot className="text-green-400" />
          Integrated Production Systems
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {foodSystems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-400">
                  {system.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{system.title}</h3>
                  <p className="text-gray-400 mb-4">{system.description}</p>
                  <ul className="space-y-2">
                    {system.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <FaLeaf className="text-green-500 mt-1 flex-shrink-0" />
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

      {/* Production Metrics */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaChartLine className="text-green-400" />
          System Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productionMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-4xl font-bold text-green-400 mb-2">{metric.value}</h3>
              <p className="text-lg font-medium text-white mb-1">{metric.metric}</p>
              <p className="text-sm text-gray-400 mb-3">{metric.description}</p>
              <p className="text-xs text-gray-500 italic">{metric.details}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Implementation Models */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaHome className="text-green-400" />
          Scale-Appropriate Models
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {implementationModels.map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6"
            >
              <h3 className="text-xl font-semibold text-green-400 mb-2">{model.name}</h3>
              <p className="text-sm text-gray-400 mb-4">Serves {model.scale}</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Components:</h4>
                  <ul className="space-y-1">
                    {model.components.map((component, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        {component}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Investment:</span>
                    <span className="text-white font-medium">{model.investment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Payback:</span>
                    <span className="text-green-400 font-medium">{model.payback}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaMicroscope className="text-green-400" />
          Technology Integration
        </h2>
        <div className="glassmorphic-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <FaRobot className="text-3xl text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Automation</h4>
              <p className="text-sm text-gray-400">
                Climate control, irrigation scheduling, harvest optimization
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <FaMicroscope className="text-3xl text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Monitoring</h4>
              <p className="text-sm text-gray-400">
                Soil sensors, growth tracking, pest detection AI
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <FaTruck className="text-3xl text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Distribution</h4>
              <p className="text-sm text-gray-400">
                Route optimization, inventory management, order automation
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <FaShoppingBasket className="text-3xl text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Commerce</h4>
              <p className="text-sm text-gray-400">
                Local currency integration, subscription management, co-op shares
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Success Story */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-green-500/20">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Success Story: Detroit Urban Farms</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                In neighborhoods abandoned by grocery chains, Detroit residents transformed 1,500+ vacant lots 
                into productive farms. This grassroots movement now feeds 15,000 families with fresh, 
                affordable produce while creating jobs and rebuilding community bonds.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaLeaf className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Keep Growing Detroit</h4>
                    <p className="text-sm text-gray-400">
                      Supplies 70,000 seed packets annually to urban gardeners
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaUsers className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Community Impact</h4>
                    <p className="text-sm text-gray-400">
                      400+ community gardens, 1,600 family gardens active
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaChartLine className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Economic Benefits</h4>
                    <p className="text-sm text-gray-400">
                      $3.5M in produce value, 200+ jobs created
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <img 
                src="/api/placeholder/600/400" 
                alt="Urban farm visualization"
                className="w-full rounded-lg opacity-50"
              />
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <h4 className="font-semibold text-white mb-2">Key Lessons</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Land access through community land trusts</li>
                  <li>• Youth engagement ensures sustainability</li>
                  <li>• Market connections drive viability</li>
                  <li>• Policy advocacy removes barriers</li>
                  <li>• Cultural food traditions strengthen adoption</li>
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
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="glassmorphic-card p-8 text-center border border-green-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">Grow Your Food Future</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Every seed planted in community soil is an act of revolution. Start with a windowsill herb garden, 
            join a community plot, or organize your neighbors to transform vacant land. Food sovereignty 
            begins in your backyard and spreads through your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/loop-economics">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300">
                Explore All Sectors
              </button>
            </Link>
            <Link href="/protocols">
              <button className="px-8 py-4 bg-black/50 border border-green-500/50 text-green-400 font-semibold rounded-lg hover:bg-green-500/10 transition-all duration-300">
                Download Growing Guides
              </button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Glossary Section */}
      <GlossarySection
        accentColor="green"
        icon={<FaBook className="text-2xl text-green-400" />}
        terms={[
          {
            term: "Food Sovereignty",
            definition: "The right of communities to control their own food systems, including production, distribution, and consumption, free from corporate control.",
            related: ["Local Food Systems", "Community Agriculture"]
          },
          {
            term: "Regenerative Agriculture",
            definition: "Farming practices that restore soil health, increase biodiversity, and sequester carbon while producing food, going beyond sustainable to actively improve ecosystems.",
            related: ["Permaculture", "No-Till Farming"]
          },
          {
            term: "Vertical Farming",
            definition: "Growing crops in vertically stacked layers using controlled environment agriculture (CEA) technology to maximize production in minimal space.",
            related: ["Urban Agriculture", "Hydroponics"]
          },
          {
            term: "Aquaponics",
            definition: "A symbiotic system combining aquaculture (fish farming) with hydroponics where fish waste provides nutrients for plants, which filter water for fish.",
            related: ["Closed-Loop Systems", "Integrated Agriculture"]
          },
          {
            term: "Community Supported Agriculture (CSA)",
            definition: "A model where community members purchase shares of a farm's harvest in advance, sharing both the risks and benefits of food production.",
            related: ["Farm Shares", "Local Food Networks"]
          },
          {
            term: "Food Miles",
            definition: "The distance food travels from production to consumption, a key metric in assessing environmental impact and freshness of food systems.",
            related: ["Carbon Footprint", "Local Food"]
          },
          {
            term: "Permaculture",
            definition: "A design philosophy that mimics natural ecosystems to create sustainable and self-sufficient agricultural systems.",
            related: ["Regenerative Agriculture", "Food Forests"]
          },
          {
            term: "Bokashi Fermentation",
            definition: "An anaerobic process using beneficial microorganisms to ferment organic waste into nutrient-rich soil amendment in just weeks.",
            related: ["Composting", "Waste Recapture"]
          }
        ]}
      />
    </div>
  );
};

export default FoodPage;
