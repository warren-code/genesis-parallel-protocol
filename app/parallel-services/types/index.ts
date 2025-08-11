// Service Provider Types

export type ServiceCategory = 
  | 'legal'
  | 'medical'
  | 'mental-health'
  | 'bail-bond'
  | 'security'
  | 'media'
  | 'technology'
  | 'education'
  | 'housing'
  | 'financial'
  | 'logistics'
  | 'translation'
  | 'advocacy'
  | 'emergency'
  | 'other';

export type VerificationStatus = 
  | 'unverified'
  | 'pending'
  | 'verified'
  | 'certified';

export type ServiceAvailability = 
  | '24/7'
  | 'business-hours'
  | 'emergency-only'
  | 'appointment'
  | 'on-demand';

export interface ServiceProvider {
  id: string;
  name: string;
  category: ServiceCategory;
  subcategories: string[];
  description: string;
  services: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    emergencyContact?: string;
  };
  availability: ServiceAvailability;
  languages: string[];
  coverage: {
    areas: string[];
    remote: boolean;
    onsite: boolean;
  };
  pricing: {
    type: 'free' | 'sliding-scale' | 'fixed' | 'pro-bono' | 'insurance';
    details?: string;
    acceptsInsurance?: boolean;
    insuranceTypes?: string[];
  };
  verification: {
    status: VerificationStatus;
    verifiedAt?: Date;
    verifiedBy?: string;
    credentials?: string[];
    licenses?: {
      type: string;
      number: string;
      expiresAt?: Date;
    }[];
  };
  ratings: {
    overall: number;
    totalReviews: number;
    responsiveness: number;
    professionalism: number;
    effectiveness: number;
  };
  specializations: string[];
  experience: {
    yearsInService: number;
    casesHandled?: number;
    successRate?: number;
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    featured: boolean;
    active: boolean;
    tags: string[];
  };
}

export interface ServiceReview {
  id: string;
  providerId: string;
  userId: string;
  rating: number;
  aspects: {
    responsiveness: number;
    professionalism: number;
    effectiveness: number;
  };
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  unhelpful: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceRequest {
  id: string;
  userId: string;
  category: ServiceCategory;
  subcategories: string[];
  description: string;
  urgency: 'immediate' | 'urgent' | 'standard' | 'flexible';
  budget?: {
    min?: number;
    max?: number;
    type: 'hourly' | 'fixed' | 'negotiable';
  };
  location?: {
    area: string;
    remote: boolean;
  };
  preferredLanguages: string[];
  specialRequirements: string[];
  status: 'open' | 'matched' | 'in-progress' | 'completed' | 'cancelled';
  matches: ServiceMatch[];
  createdAt: Date;
  expiresAt?: Date;
}

export interface ServiceMatch {
  providerId: string;
  score: number;
  reasons: string[];
  status: 'suggested' | 'contacted' | 'accepted' | 'rejected';
  contactedAt?: Date;
  respondedAt?: Date;
}

export interface CategoryTaxonomy {
  id: ServiceCategory;
  name: string;
  description: string;
  icon: string;
  subcategories: {
    id: string;
    name: string;
    description: string;
  }[];
  keywords: string[];
  priority: number;
}

export interface ProviderFilter {
  categories?: ServiceCategory[];
  subcategories?: string[];
  verificationStatus?: VerificationStatus[];
  availability?: ServiceAvailability[];
  languages?: string[];
  priceTypes?: string[];
  minRating?: number;
  location?: {
    area?: string;
    radius?: number;
    remote?: boolean;
  };
  specializations?: string[];
  sortBy?: 'rating' | 'reviews' | 'distance' | 'price' | 'experience';
  sortOrder?: 'asc' | 'desc';
}

export interface ProviderSearchResult {
  providers: ServiceProvider[];
  total: number;
  page: number;
  pageSize: number;
  filters: ProviderFilter;
}

export interface VerificationRequest {
  providerId: string;
  documents: {
    type: string;
    url: string;
    uploadedAt: Date;
  }[];
  credentials: string[];
  references: {
    name: string;
    relationship: string;
    contact: string;
  }[];
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  notes?: string;
}
