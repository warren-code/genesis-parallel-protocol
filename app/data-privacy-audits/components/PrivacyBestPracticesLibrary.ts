import { PrivacyBestPractice, Resource } from '../types';

export class PrivacyBestPracticesLibrary {
  private practices: PrivacyBestPractice[] = [];

  constructor() {
    this.initializeDefaultPractices();
  }

  private initializeDefaultPractices(): void {
    const defaultPractices: PrivacyBestPractice[] = [
      {
        id: 'practice-001',
        title: 'Data Minimization',
        category: 'Data Collection',
        description: 'Collect only the minimum amount of personal data necessary for business purposes.',
        implementation: 'Review data collection processes, implement field-level validation, and regularly audit data storage.',
        benefits: [
          'Reduced risk of data breaches',
          'Lower storage costs',
          'Improved compliance with privacy regulations',
          'Enhanced customer trust'
        ],
        challenges: [
          'May require redesigning existing systems',
          'Potential impact on analytics capabilities',
          'Requires ongoing monitoring'
        ],
        resources: [
          {
            id: 'resource-001',
            title: 'GDPR Data Minimization Guide',
            type: 'document',
            url: '/resources/gdpr-data-minimization.pdf',
            description: 'Comprehensive guide on implementing data minimization under GDPR',
            tags: ['GDPR', 'compliance', 'data-minimization']
          }
        ],
        relatedFrameworks: ['GDPR', 'CCPA', 'ISO27001'],
        tags: ['data-collection', 'privacy-by-design', 'compliance'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'practice-002',
        title: 'Privacy by Design',
        category: 'System Architecture',
        description: 'Embed privacy considerations into system design from the beginning.',
        implementation: 'Conduct Privacy Impact Assessments, implement privacy controls at architecture level, and ensure data protection by default.',
        benefits: [
          'Proactive privacy protection',
          'Reduced remediation costs',
          'Better user experience',
          'Competitive advantage'
        ],
        challenges: [
          'Requires privacy expertise early in development',
          'May increase initial development time',
          'Needs buy-in from all stakeholders'
        ],
        resources: [
          {
            id: 'resource-002',
            title: 'Privacy by Design Framework',
            type: 'template',
            url: '/resources/privacy-by-design-framework.docx',
            description: 'Template for implementing Privacy by Design principles',
            tags: ['privacy-by-design', 'framework', 'template']
          }
        ],
        relatedFrameworks: ['GDPR', 'ISO27701', 'NIST Privacy Framework'],
        tags: ['privacy-by-design', 'architecture', 'best-practice'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'practice-003',
        title: 'Regular Privacy Audits',
        category: 'Compliance',
        description: 'Conduct periodic assessments of privacy practices and controls.',
        implementation: 'Establish audit schedule, define audit scope, use standardized checklists, and track remediation efforts.',
        benefits: [
          'Early detection of privacy issues',
          'Continuous improvement',
          'Regulatory compliance',
          'Risk mitigation'
        ],
        challenges: [
          'Resource intensive',
          'Requires specialized expertise',
          'May disrupt operations'
        ],
        resources: [
          {
            id: 'resource-003',
            title: 'Privacy Audit Checklist',
            type: 'checklist',
            url: '/resources/privacy-audit-checklist.xlsx',
            description: 'Comprehensive checklist for conducting privacy audits',
            tags: ['audit', 'checklist', 'compliance']
          }
        ],
        relatedFrameworks: ['SOC2', 'ISO27001', 'HIPAA'],
        tags: ['audit', 'compliance', 'assessment'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.practices = defaultPractices;
  }

  public addPractice(practice: PrivacyBestPractice): void {
    this.practices.push(practice);
  }

  public getPracticeById(id: string): PrivacyBestPractice | undefined {
    return this.practices.find(practice => practice.id === id);
  }

  public getPracticesByCategory(category: string): PrivacyBestPractice[] {
    return this.practices.filter(practice => practice.category === category);
  }

  public getPracticesByFramework(framework: string): PrivacyBestPractice[] {
    return this.practices.filter(practice => 
      practice.relatedFrameworks.includes(framework)
    );
  }

  public searchPractices(query: string): PrivacyBestPractice[] {
    const lowercaseQuery = query.toLowerCase();
    return this.practices.filter(practice =>
      practice.title.toLowerCase().includes(lowercaseQuery) ||
      practice.description.toLowerCase().includes(lowercaseQuery) ||
      practice.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  public getAllPractices(): PrivacyBestPractice[] {
    return [...this.practices];
  }

  public getCategories(): string[] {
    const categories = new Set(this.practices.map(practice => practice.category));
    return Array.from(categories);
  }

  public updatePractice(id: string, updates: Partial<PrivacyBestPractice>): boolean {
    const index = this.practices.findIndex(practice => practice.id === id);
    if (index !== -1) {
      this.practices[index] = {
        ...this.practices[index],
        ...updates,
        updatedAt: new Date()
      };
      return true;
    }
    return false;
  }

  public deletePractice(id: string): boolean {
    const index = this.practices.findIndex(practice => practice.id === id);
    if (index !== -1) {
      this.practices.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Example usage
const library = new PrivacyBestPracticesLibrary();
const allPractices = library.getAllPractices();
const gdprPractices = library.getPracticesByFramework('GDPR');
const searchResults = library.searchPractices('data minimization');
