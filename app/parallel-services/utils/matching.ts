import { ServiceProvider, ServiceRequest, ServiceMatch } from '../types';

export interface MatchScore {
  provider: ServiceProvider;
  score: number;
  reasons: string[];
}

export function matchProvidersToRequest(
  request: ServiceRequest,
  providers: ServiceProvider[]
): MatchScore[] {
  const matches: MatchScore[] = [];
  
  providers.forEach(provider => {
    let score = 0;
    const reasons: string[] = [];
    
    // Category match (required)
    if (provider.category !== request.category) {
      return; // Skip if primary category doesn't match
    }
    score += 30;
    reasons.push('Category match');
    
    // Subcategory matches
    const matchingSubcategories = provider.subcategories.filter(sub =>
      request.subcategories.includes(sub)
    );
    if (matchingSubcategories.length > 0) {
      score += matchingSubcategories.length * 10;
      reasons.push(`${matchingSubcategories.length} subcategory matches`);
    }
    
    // Language match
    const hasLanguageMatch = provider.languages.some(lang =>
      request.preferredLanguages.includes(lang)
    );
    if (hasLanguageMatch) {
      score += 15;
      reasons.push('Language match');
    }
    
    // Location match
    if (request.location) {
      if (provider.coverage.remote && request.location.remote) {
        score += 10;
        reasons.push('Remote service available');
      }
      if (request.location.area && provider.coverage.areas.some(area =>
        area.toLowerCase().includes(request.location!.area.toLowerCase())
      )) {
        score += 15;
        reasons.push('Service area match');
      }
    }
    
    // Availability for urgency
    if (request.urgency === 'immediate' && provider.availability === '24/7') {
      score += 20;
      reasons.push('24/7 availability for immediate need');
    } else if (request.urgency === 'urgent' && 
              (provider.availability === '24/7' || provider.availability === 'on-demand')) {
      score += 15;
      reasons.push('Available for urgent requests');
    }
    
    // Budget match
    if (request.budget) {
      if (provider.pricing.type === 'free' || provider.pricing.type === 'pro-bono') {
        score += 20;
        reasons.push('Free/pro-bono service');
      } else if (provider.pricing.type === 'sliding-scale') {
        score += 15;
        reasons.push('Sliding scale pricing available');
      }
    }
    
    // Verification status bonus
    if (provider.verification.status === 'certified') {
      score += 10;
      reasons.push('Certified provider');
    } else if (provider.verification.status === 'verified') {
      score += 5;
      reasons.push('Verified provider');
    }
    
    // Rating bonus
    if (provider.ratings.overall >= 4.5) {
      score += 10;
      reasons.push('Highly rated (4.5+ stars)');
    } else if (provider.ratings.overall >= 4.0) {
      score += 5;
      reasons.push('Well rated (4.0+ stars)');
    }
    
    // Experience bonus
    if (provider.experience.yearsInService >= 10) {
      score += 5;
      reasons.push('10+ years experience');
    }
    
    // Special requirements match
    const specialReqMatches = request.specialRequirements.filter(req =>
      provider.specializations.some(spec => 
        spec.toLowerCase().includes(req.toLowerCase())
      ) ||
      provider.services.some(service =>
        service.toLowerCase().includes(req.toLowerCase())
      )
    );
    if (specialReqMatches.length > 0) {
      score += specialReqMatches.length * 8;
      reasons.push(`Matches ${specialReqMatches.length} special requirements`);
    }
    
    // Only include if score is above threshold
    if (score >= 30) {
      matches.push({ provider, score, reasons });
    }
  });
  
  // Sort by score descending
  matches.sort((a, b) => b.score - a.score);
  
  return matches;
}

export function createServiceMatches(
  matchScores: MatchScore[]
): ServiceMatch[] {
  return matchScores.map((match, index) => ({
    providerId: match.provider.id,
    score: match.score,
    reasons: match.reasons,
    status: index < 3 ? 'suggested' : 'suggested' // Top 3 are primary suggestions
  }));
}

export function calculateMatchPercentage(score: number): number {
  // Max possible score is approximately 150
  const maxScore = 150;
  return Math.min(Math.round((score / maxScore) * 100), 100);
}
