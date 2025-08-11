export interface Right {
  id: string;
  category: string;
  title: {
    en: string;
    es: string;
    fr: string;
    zh: string;
  };
  description: {
    en: string;
    es: string;
    fr: string;
    zh: string;
  };
  scenarios: string[];
  tags: string[];
  printable: boolean;
}

export const rightsDatabase: Right[] = [
  {
    id: "right-1",
    category: "Civil Rights",
    title: {
      en: "Right to Remain Silent",
      es: "Derecho a Permanecer en Silencio",
      fr: "Droit de Garder le Silence",
      zh: "保持沉默的权利"
    },
    description: {
      en: "You have the right to remain silent. Anything you say can and will be used against you in a court of law.",
      es: "Tiene el derecho de permanecer en silencio. Cualquier cosa que diga puede y será usada en su contra en un tribunal de justicia.",
      fr: "Vous avez le droit de garder le silence. Tout ce que vous direz pourra être retenu contre vous devant un tribunal.",
      zh: "您有权保持沉默。您所说的任何话都可能在法庭上被用作对您不利的证据。"
    },
    scenarios: ["police-stop", "arrest", "interrogation"],
    tags: ["miranda", "constitutional", "5th-amendment"],
    printable: true
  },
  {
    id: "right-2",
    category: "Civil Rights",
    title: {
      en: "Right to an Attorney",
      es: "Derecho a un Abogado",
      fr: "Droit à un Avocat",
      zh: "获得律师帮助的权利"
    },
    description: {
      en: "You have the right to an attorney. If you cannot afford one, one will be appointed to you.",
      es: "Tiene derecho a un abogado. Si no puede pagar uno, se le asignará uno.",
      fr: "Vous avez droit à un avocat. Si vous n'en avez pas les moyens, un avocat vous sera commis d'office.",
      zh: "您有权获得律师的帮助。如果您负担不起，将为您指定一名律师。"
    },
    scenarios: ["arrest", "court", "interrogation"],
    tags: ["miranda", "legal-representation", "6th-amendment"],
    printable: true
  },
  {
    id: "right-3",
    category: "Workplace Rights",
    title: {
      en: "Right to Fair Wages",
      es: "Derecho a Salarios Justos",
      fr: "Droit à un Salaire Équitable",
      zh: "获得公平工资的权利"
    },
    description: {
      en: "You have the right to receive at least minimum wage for all hours worked and overtime pay for hours over 40 in a workweek.",
      es: "Tiene derecho a recibir al menos el salario mínimo por todas las horas trabajadas y pago de horas extras por más de 40 horas semanales.",
      fr: "Vous avez droit à au moins le salaire minimum pour toutes les heures travaillées et à des heures supplémentaires pour plus de 40 heures par semaine.",
      zh: "您有权获得所有工作时间的最低工资，以及每周超过40小时的加班费。"
    },
    scenarios: ["employment", "wage-dispute", "overtime"],
    tags: ["labor", "wages", "FLSA"],
    printable: true
  },
  {
    id: "right-4",
    category: "Digital Rights",
    title: {
      en: "Right to Data Privacy",
      es: "Derecho a la Privacidad de Datos",
      fr: "Droit à la Confidentialité des Données",
      zh: "数据隐私权"
    },
    description: {
      en: "You have the right to know what personal data is collected about you and how it's used, and to request its deletion.",
      es: "Tiene derecho a saber qué datos personales se recopilan sobre usted y cómo se usan, y a solicitar su eliminación.",
      fr: "Vous avez le droit de savoir quelles données personnelles sont collectées et comment elles sont utilisées, et de demander leur suppression.",
      zh: "您有权了解收集了哪些个人数据以及如何使用，并有权要求删除。"
    },
    scenarios: ["online-privacy", "data-breach", "consent"],
    tags: ["privacy", "GDPR", "CCPA", "digital"],
    printable: true
  },
  {
    id: "right-5",
    category: "Housing Rights",
    title: {
      en: "Right to Fair Housing",
      es: "Derecho a Vivienda Justa",
      fr: "Droit au Logement Équitable",
      zh: "公平住房权"
    },
    description: {
      en: "You cannot be discriminated against in housing based on race, color, religion, sex, national origin, disability, or family status.",
      es: "No puede ser discriminado en vivienda por raza, color, religión, sexo, origen nacional, discapacidad o estado familiar.",
      fr: "Vous ne pouvez pas être discriminé dans le logement en raison de la race, couleur, religion, sexe, origine nationale, handicap ou situation familiale.",
      zh: "您不能因种族、肤色、宗教、性别、国籍、残疾或家庭状况而在住房方面受到歧视。"
    },
    scenarios: ["rental", "home-purchase", "eviction"],
    tags: ["fair-housing", "discrimination", "FHA"],
    printable: true
  },
  {
    id: "right-6",
    category: "Healthcare Rights",
    title: {
      en: "Right to Emergency Medical Care",
      es: "Derecho a Atención Médica de Emergencia",
      fr: "Droit aux Soins Médicaux d'Urgence",
      zh: "紧急医疗护理权"
    },
    description: {
      en: "Hospitals must provide emergency medical treatment regardless of your ability to pay or immigration status.",
      es: "Los hospitales deben proporcionar tratamiento médico de emergencia sin importar su capacidad de pago o estatus migratorio.",
      fr: "Les hôpitaux doivent fournir des soins médicaux d'urgence indépendamment de votre capacité de payer ou de votre statut d'immigration.",
      zh: "无论您的支付能力或移民身份如何，医院都必须提供紧急医疗治疗。"
    },
    scenarios: ["medical-emergency", "hospital", "healthcare-access"],
    tags: ["healthcare", "EMTALA", "emergency"],
    printable: true
  },
  {
    id: "right-7",
    category: "Civil Rights",
    title: {
      en: "Right to Record Police",
      es: "Derecho a Grabar a la Policía",
      fr: "Droit d'Enregistrer la Police",
      zh: "录制警察的权利"
    },
    description: {
      en: "You have the right to record police officers performing their duties in public spaces, as long as you don't interfere with their work.",
      es: "Tiene derecho a grabar a los oficiales de policía realizando sus deberes en espacios públicos, siempre que no interfiera con su trabajo.",
      fr: "Vous avez le droit d'enregistrer les policiers dans l'exercice de leurs fonctions dans les espaces publics, tant que vous n'interférez pas avec leur travail.",
      zh: "您有权在公共场所录制执行公务的警察，只要不干扰他们的工作。"
    },
    scenarios: ["police-stop", "protest", "public-space"],
    tags: ["1st-amendment", "recording", "public-rights"],
    printable: true
  },
  {
    id: "right-8",
    category: "Civil Rights",
    title: {
      en: "Right to Refuse Searches",
      es: "Derecho a Rechazar Búsquedas",
      fr: "Droit de Refuser les Fouilles",
      zh: "拒绝搜查的权利"
    },
    description: {
      en: "You have the right to refuse consent to searches of your person, car, or home without a warrant, with some exceptions.",
      es: "Tiene derecho a rechazar el consentimiento para búsquedas de su persona, automóvil o hogar sin una orden judicial, con algunas excepciones.",
      fr: "Vous avez le droit de refuser les fouilles de votre personne, voiture ou domicile sans mandat, avec quelques exceptions.",
      zh: "除某些例外情况外，您有权拒绝在没有搜查令的情况下对您的人身、车辆或住所进行搜查。"
    },
    scenarios: ["police-stop", "home-search", "vehicle-search"],
    tags: ["4th-amendment", "privacy", "search-warrant"],
    printable: true
  },
  {
    id: "right-9",
    category: "Digital Rights",
    title: {
      en: "Right to Encryption",
      es: "Derecho a la Encriptación",
      fr: "Droit au Chiffrement",
      zh: "加密权"
    },
    description: {
      en: "You have the right to use encryption to protect your digital communications and data from unauthorized access.",
      es: "Tiene derecho a usar encriptación para proteger sus comunicaciones digitales y datos del acceso no autorizado.",
      fr: "Vous avez le droit d'utiliser le chiffrement pour protéger vos communications numériques et données contre l'accès non autorisé.",
      zh: "您有权使用加密来保护您的数字通信和数据免受未经授权的访问。"
    },
    scenarios: ["online-privacy", "digital-security", "data-protection"],
    tags: ["encryption", "digital-security", "privacy"],
    printable: true
  },
  {
    id: "right-10",
    category: "Protest Rights",
    title: {
      en: "Right to Peaceful Assembly",
      es: "Derecho a la Asamblea Pacífica",
      fr: "Droit de Réunion Pacifique",
      zh: "和平集会权"
    },
    description: {
      en: "You have the right to peacefully assemble and protest in public spaces, though time, place, and manner restrictions may apply.",
      es: "Tiene derecho a reunirse pacíficamente y protestar en espacios públicos, aunque pueden aplicarse restricciones de tiempo, lugar y manera.",
      fr: "Vous avez le droit de vous réunir pacifiquement et de manifester dans les espaces publics, bien que des restrictions de temps, lieu et manière puissent s'appliquer.",
      zh: "您有权在公共场所和平集会和抗议，但可能会受到时间、地点和方式的限制。"
    },
    scenarios: ["protest", "demonstration", "public-assembly"],
    tags: ["1st-amendment", "protest", "assembly"],
    printable: true
  }
];

export const scenarioDescriptions: Record<string, { title: string; description: string }> = {
  "police-stop": {
    title: "During a Police Stop",
    description: "Your rights when stopped by law enforcement on the street or in a vehicle"
  },
  "arrest": {
    title: "During an Arrest",
    description: "Your rights when being placed under arrest"
  },
  "interrogation": {
    title: "During Police Questioning",
    description: "Your rights when being questioned by law enforcement"
  },
  "employment": {
    title: "In the Workplace",
    description: "Your rights as an employee"
  },
  "wage-dispute": {
    title: "Wage Disputes",
    description: "Your rights when facing issues with pay"
  },
  "online-privacy": {
    title: "Online Privacy",
    description: "Your rights regarding personal data online"
  },
  "rental": {
    title: "Renting a Home",
    description: "Your rights as a tenant"
  },
  "medical-emergency": {
    title: "Medical Emergencies",
    description: "Your rights in emergency medical situations"
  },
  "protest": {
    title: "During Protests",
    description: "Your rights when participating in protests"
  },
  "public-space": {
    title: "In Public Spaces",
    description: "Your rights in public areas"
  },
  "home-search": {
    title: "Home Searches",
    description: "Your rights when police want to search your home"
  },
  "vehicle-search": {
    title: "Vehicle Searches",
    description: "Your rights during vehicle searches"
  }
};
