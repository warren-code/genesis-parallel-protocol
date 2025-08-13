'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';

interface LocationRights {
  state: string;
  additionalRights: {
    en: string[];
    es: string[];
    fr: string[];
    zh: string[];
  };
  resources: {
    name: string;
    url: string;
    phone: string;
  }[];
}

const stateRights: LocationRights[] = [
  {
    state: 'California',
    additionalRights: {
      en: [
        'Right to record police in public spaces',
        'Enhanced data privacy rights under CCPA',
        'Stronger tenant protections',
        'Right to breaks and meal periods at work'
      ],
      es: [
        'Derecho a grabar a la policía en espacios públicos',
        'Derechos mejorados de privacidad de datos bajo CCPA',
        'Protecciones más fuertes para inquilinos',
        'Derecho a descansos y períodos de comida en el trabajo'
      ],
      fr: [
        'Droit d\'enregistrer la police dans les espaces publics',
        'Droits de confidentialité des données renforcés sous CCPA',
        'Protections renforcées pour les locataires',
        'Droit aux pauses et aux périodes de repas au travail'
      ],
      zh: [
        '在公共场所录制警察的权利',
        'CCPA下增强的数据隐私权',
        '更强的租户保护',
        '工作时休息和用餐时间的权利'
      ]
    },
    resources: [
      {
        name: 'California Department of Fair Employment and Housing',
        url: 'https://www.dfeh.ca.gov/',
        phone: '800-884-1684'
      },
      {
        name: 'California Labor Commissioner',
        url: 'https://www.dir.ca.gov/dlse/',
        phone: '833-526-4636'
      }
    ]
  },
  {
    state: 'New York',
    additionalRights: {
      en: [
        'Right to paid sick leave',
        'Protection against source of income discrimination',
        'Right to breastfeed in public',
        'Strong anti-discrimination laws'
      ],
      es: [
        'Derecho a licencia por enfermedad pagada',
        'Protección contra discriminación por fuente de ingresos',
        'Derecho a amamantar en público',
        'Fuertes leyes contra la discriminación'
      ],
      fr: [
        'Droit aux congés de maladie payés',
        'Protection contre la discrimination selon la source de revenus',
        'Droit d\'allaiter en public',
        'Lois anti-discrimination strictes'
      ],
      zh: [
        '带薪病假权',
        '收入来源歧视保护',
        '公开哺乳权',
        '强有力的反歧视法'
      ]
    },
    resources: [
      {
        name: 'NYC Commission on Human Rights',
        url: 'https://www.nyc.gov/site/cchr/index.page',
        phone: '212-416-0197'
      },
      {
        name: 'New York State Division of Human Rights',
        url: 'https://dhr.ny.gov/',
        phone: '888-392-3644'
      }
    ]
  },
  {
    state: 'Texas',
    additionalRights: {
      en: [
        'Right to carry firearms with permit',
        'Protection against price gouging during disasters',
        'Right to solar panel access',
        'Homestead exemption protections'
      ],
      es: [
        'Derecho a portar armas de fuego con permiso',
        'Protección contra el aumento de precios durante desastres',
        'Derecho al acceso a paneles solares',
        'Protecciones de exención de vivienda'
      ],
      fr: [
        'Droit de porter des armes à feu avec permis',
        'Protection contre les hausses de prix pendant les catastrophes',
        'Droit d\'accès aux panneaux solaires',
        'Protections d\'exemption de propriété'
      ],
      zh: [
        '持证携带枪支权',
        '灾难期间价格欺诈保护',
        '太阳能板使用权',
        '宅地豁免保护'
      ]
    },
    resources: [
      {
        name: 'Texas Workforce Commission',
        url: 'https://www.twc.texas.gov/',
        phone: '800-939-6631'
      },
      {
        name: 'Texas Attorney General',
        url: 'https://www.texasattorneygeneral.gov/',
        phone: '800-252-8011'
      }
    ]
  }
];

const LocationBasedRights = () => {
  const [userLocation, setUserLocation] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState(false);
  const { language } = useLanguage();

  const detectLocation = async () => {
    setIsDetecting(true);
    try {
      // In a real app, this would use geolocation API and reverse geocoding
      // For demo, we'll simulate with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUserLocation('California'); // Simulated result
      setSelectedState('California');
    } catch (error) {
      console.error('Location detection failed:', error);
    } finally {
      setIsDetecting(false);
    }
  };

  const stateInfo = stateRights.find(s => s.state === selectedState);

  return (
    <GlassmorphicCard className="p-6">
      <h2 className="text-2xl font-display font-bold mb-6 text-accent">
        Location-Based Rights Information
      </h2>
      
      <div className="space-y-6">
        {/* Location Detection */}
        <div>
          <p className="text-gray mb-4">
            Your rights can vary by state. Select your location or let us detect it automatically.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="flex-1 px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                       text-ink focus:outline-none focus:border-accent/50 transition-all"
            >
              <option value="">Select your state...</option>
              {stateRights.map(state => (
                <option key={state.state} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
            
            <Button
              onClick={detectLocation}
              variant="secondary"
              disabled={isDetecting}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            >
              {isDetecting ? 'Detecting...' : 'Detect Location'}
            </Button>
          </div>
          
          {userLocation && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-accent/10 rounded-lg border border-accent/20 text-sm"
            >
              📍 Detected location: {userLocation}
            </motion.div>
          )}
        </div>
        
        {/* State-Specific Rights */}
        {stateInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-display font-semibold mb-4 text-signal">
                Additional Rights in {stateInfo.state}
              </h3>
              
              <div className="space-y-3">
                {stateInfo.additionalRights[language].map((right, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-signal mt-2" />
                    <p className="text-gray">{right}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-display font-semibold mb-4 text-signal">
                Local Resources
              </h3>
              
              <div className="space-y-3">
                {stateInfo.resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-ink/5 rounded-lg border border-ink/20"
                  >
                    <h4 className="font-semibold text-ink mb-2">{resource.name}</h4>
                    <div className="flex flex-col sm:flex-row gap-3 text-sm">
                      <a 
                        href={`tel:${resource.phone}`}
                        className="flex items-center gap-2 text-accent hover:text-accent/80"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {resource.phone}
                      </a>
                      <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-signal hover:text-signal/80"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Visit Website
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </GlassmorphicCard>
  );
};

export default LocationBasedRights;
