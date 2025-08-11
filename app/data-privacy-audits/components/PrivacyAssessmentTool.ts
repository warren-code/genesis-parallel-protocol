import { PrivacyAssessment, PrivacyCategory } from '../types';

export class PrivacyAssessmentTool {
  private assessment: PrivacyAssessment;

  constructor() {
    this.assessment = this.initializeAssessment();
  }

  private initializeAssessment(): PrivacyAssessment {
    return {
      id: '',
      name: '',
      type: 'vendor',
      assessmentDate: new Date(),
      assessor: '',
      status: 'pending',
      riskScore: 0,
      categories: [],
      recommendations: [],
      complianceStatus: []
    };
  }

  public setId(id: string): PrivacyAssessmentTool {
    this.assessment.id = id;
    return this;
  }

  public setName(name: string): PrivacyAssessmentTool {
    this.assessment.name = name;
    return this;
  }

  public setType(type: 'vendor' | 'product' | 'service' | 'process'): PrivacyAssessmentTool {
    this.assessment.type = type;
    return this;
  }

  public setAssessor(assessor: string): PrivacyAssessmentTool {
    this.assessment.assessor = assessor;
    return this;
  }

  public addCategory(category: PrivacyCategory): PrivacyAssessmentTool {
    this.assessment.categories.push(category);
    return this;
  }

  public completeAssessment(): PrivacyAssessment {
    this.assessment.status = 'completed';
    const completedAssessment = { ...this.assessment };
    this.assessment = this.initializeAssessment();
    return completedAssessment;
  }
}

// Example usage
const privacyTool = new PrivacyAssessmentTool();
const newAssessment = privacyTool
  .setId('assessment-001')
  .setName('Vendor Privacy Assessment')
  .setType('vendor')
  .setAssessor('John Doe')
  .addCategory({
    id: 'category-1',
    name: 'Data Security',
    description: 'Assessment of data protection measures.',
    score: 85,
    maxScore: 100,
    findings: []
  })
  .completeAssessment();

