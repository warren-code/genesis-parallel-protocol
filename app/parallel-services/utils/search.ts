import { ServiceProvider, ProviderFilter, ServiceCategory } from '../types';

export function searchProviders(
  providers: ServiceProvider[],
  query: string
): ServiceProvider[] {
  const lowerQuery = query.toLowerCase();
  
  return providers.filter(provider => {
    // Search in name
    if (provider.name.toLowerCase().includes(lowerQuery)) return true;
    
    // Search in description
    if (provider.description.toLowerCase().includes(lowerQuery)) return true;
    
    // Search in services
    if (provider.services.some(service => service.toLowerCase().includes(lowerQuery))) return true;
    
    // Search in specializations
    if (provider.specializations.some(spec => spec.toLowerCase().includes(lowerQuery))) return true;
    
    // Search in tags
    if (provider.metadata.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
    
    // Search in subcategories
    if (provider.subcategories.some(sub => sub.toLowerCase().includes(lowerQuery))) return true;
    
    return false;
  });
}

export function filterProviders(
  providers: ServiceProvider[],
  filters: ProviderFilter
): ServiceProvider[] {
  let filtered = [...providers];
  
  // Filter by categories
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(p => filters.categories!.includes(p.category));
  }
  
  // Filter by subcategories
  if (filters.subcategories && filters.subcategories.length > 0) {
    filtered = filtered.filter(p => 
      p.subcategories.some(sub => filters.subcategories!.includes(sub))
    );
  }
  
  // Filter by verification status
  if (filters.verificationStatus && filters.verificationStatus.length > 0) {
    filtered = filtered.filter(p => 
      filters.verificationStatus!.includes(p.verification.status)
    );
  }
  
  // Filter by availability
  if (filters.availability && filters.availability.length > 0) {
    filtered = filtered.filter(p => 
      filters.availability!.includes(p.availability)
    );
  }
  
  // Filter by languages
  if (filters.languages && filters.languages.length > 0) {
    filtered = filtered.filter(p => 
      p.languages.some(lang => filters.languages!.includes(lang))
    );
  }
  
  // Filter by price types
  if (filters.priceTypes && filters.priceTypes.length > 0) {
    filtered = filtered.filter(p => 
      filters.priceTypes!.includes(p.pricing.type)
    );
  }
  
  // Filter by minimum rating
  if (filters.minRating) {
    filtered = filtered.filter(p => p.ratings.overall >= filters.minRating!);
  }
  
  // Filter by location
  if (filters.location) {
    if (filters.location.area) {
      filtered = filtered.filter(p => 
        p.coverage.areas.some(area => 
          area.toLowerCase().includes(filters.location!.area!.toLowerCase())
        )
      );
    }
    if (filters.location.remote !== undefined) {
      filtered = filtered.filter(p => p.coverage.remote === filters.location!.remote);
    }
  }
  
  // Filter by specializations
  if (filters.specializations && filters.specializations.length > 0) {
    filtered = filtered.filter(p => 
      p.specializations.some(spec => 
        filters.specializations!.some(filterSpec => 
          spec.toLowerCase().includes(filterSpec.toLowerCase())
        )
      )
    );
  }
  
  return filtered;
}

export function sortProviders(
  providers: ServiceProvider[],
  sortBy: ProviderFilter['sortBy'] = 'rating',
  sortOrder: ProviderFilter['sortOrder'] = 'desc'
): ServiceProvider[] {
  const sorted = [...providers];
  
  sorted.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'rating':
        comparison = a.ratings.overall - b.ratings.overall;
        break;
      case 'reviews':
        comparison = a.ratings.totalReviews - b.ratings.totalReviews;
        break;
      case 'experience':
        comparison = a.experience.yearsInService - b.experience.yearsInService;
        break;
      case 'price':
        // Free services first, then sliding scale, then fixed
        const priceOrder = { 'free': 0, 'pro-bono': 1, 'sliding-scale': 2, 'insurance': 3, 'fixed': 4 };
        comparison = (priceOrder[a.pricing.type] || 5) - (priceOrder[b.pricing.type] || 5);
        break;
      default:
        comparison = a.ratings.overall - b.ratings.overall;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
}

export function getUniqueLanguages(providers: ServiceProvider[]): string[] {
  const languages = new Set<string>();
  providers.forEach(provider => {
    provider.languages.forEach(lang => languages.add(lang));
  });
  return Array.from(languages).sort();
}

export function getUniqueAreas(providers: ServiceProvider[]): string[] {
  const areas = new Set<string>();
  providers.forEach(provider => {
    provider.coverage.areas.forEach(area => areas.add(area));
  });
  return Array.from(areas).sort();
}

export function getUniqueSpecializations(providers: ServiceProvider[]): string[] {
  const specializations = new Set<string>();
  providers.forEach(provider => {
    provider.specializations.forEach(spec => specializations.add(spec));
  });
  return Array.from(specializations).sort();
}
