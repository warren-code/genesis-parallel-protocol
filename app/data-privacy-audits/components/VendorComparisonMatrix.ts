import { VendorComparison, ComparisonCriterion, VendorScore } from '../types';

export class VendorComparisonMatrix {
  private comparison: VendorComparison;

  constructor() {
    this.comparison = this.initializeComparison();
  }

  private initializeComparison(): VendorComparison {
    return {
      id: '',
      name: '',
      vendorIds: [],
      criteria: [],
      createdAt: new Date(),
      createdBy: '',
      summary: ''
    };
  }

  public setId(id: string): VendorComparisonMatrix {
    this.comparison.id = id;
    return this;
  }

  public setName(name: string): VendorComparisonMatrix {
    this.comparison.name = name;
    return this;
  }

  public addVendor(vendorId: string): VendorComparisonMatrix {
    if (!this.comparison.vendorIds.includes(vendorId)) {
      this.comparison.vendorIds.push(vendorId);
    }
    return this;
  }

  public addCriterion(criterion: ComparisonCriterion): VendorComparisonMatrix {
    this.comparison.criteria.push(criterion);
    return this;
  }

  public setCreatedBy(createdBy: string): VendorComparisonMatrix {
    this.comparison.createdBy = createdBy;
    return this;
  }

  public setSummary(summary: string): VendorComparisonMatrix {
    this.comparison.summary = summary;
    return this;
  }

  public buildMatrix(): VendorComparison {
    const builtMatrix = { ...this.comparison };
    this.comparison = this.initializeComparison();
    return builtMatrix;
  }

  public generateComparisonReport(): string {
    let report = `Vendor Comparison: ${this.comparison.name}\n`;
    report += `Created by: ${this.comparison.createdBy} on ${this.comparison.createdAt.toLocaleDateString()}\n\n`;
    report += `Summary: ${this.comparison.summary}\n\n`;
    
    report += 'Comparison Matrix:\n';
    report += '-'.repeat(80) + '\n';
    
    // Header row
    report += 'Criteria'.padEnd(30) + ' | ';
    this.comparison.vendorIds.forEach(vendorId => {
      report += vendorId.padEnd(15) + ' | ';
    });
    report += '\n' + '-'.repeat(80) + '\n';
    
    // Data rows
    this.comparison.criteria.forEach(criterion => {
      report += criterion.name.padEnd(30) + ' | ';
      criterion.scores.forEach(score => {
        report += score.score.toString().padEnd(15) + ' | ';
      });
      report += '\n';
    });
    
    return report;
  }
}

// Example usage
const comparisonMatrix = new VendorComparisonMatrix();
const comparison = comparisonMatrix
  .setId('comparison-001')
  .setName('Cloud Provider Security Comparison')
  .addVendor('vendor-aws')
  .addVendor('vendor-azure')
  .addVendor('vendor-gcp')
  .addCriterion({
    id: 'criterion-1',
    name: 'Data Encryption',
    category: 'Security',
    weight: 0.3,
    scores: [
      { vendorId: 'vendor-aws', score: 95, notes: 'Excellent encryption options' },
      { vendorId: 'vendor-azure', score: 92, notes: 'Strong encryption capabilities' },
      { vendorId: 'vendor-gcp', score: 94, notes: 'Comprehensive encryption features' }
    ]
  })
  .setCreatedBy('Security Team')
  .setSummary('Comparison of major cloud providers based on security capabilities')
  .buildMatrix();
