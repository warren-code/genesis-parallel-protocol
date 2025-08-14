import { AuditReport, AuditReportFinding } from '../types';

export class AuditReportGenerator {
  private report: AuditReport;

  constructor() {
    this.report = this.initializeReport();
  }

  private initializeReport(): AuditReport {
    return {
      id: '',
      title: '',
      vendorId: '',
      auditId: '',
      executiveSummary: '',
      findings: [],
      recommendations: [],
      overallScore: 0,
      riskAssessment: {
        overallRisk: 'low',
        riskMatrix: [],
        mitigationStrategies: []
      },
      generatedAt: new Date(),
      generatedBy: '',
      approvalStatus: 'draft',
      approvers: []
    };
  }

  public setId(id: string): AuditReportGenerator {
    this.report.id = id;
    return this;
  }

  public setTitle(title: string): AuditReportGenerator {
    this.report.title = title;
    return this;
  }

  public setVendorId(vendorId: string): AuditReportGenerator {
    this.report.vendorId = vendorId;
    return this;
  }

  public setAuditId(auditId: string): AuditReportGenerator {
    this.report.auditId = auditId;
    return this;
  }

  public setExecutiveSummary(summary: string): AuditReportGenerator {
    this.report.executiveSummary = summary;
    return this;
  }

  public addFinding(finding: AuditReportFinding): AuditReportGenerator {
    this.report.findings.push(finding);
    return this;
  }

  public setGeneratedBy(generatedBy: string): AuditReportGenerator {
    this.report.generatedBy = generatedBy;
    return this;
  }

  public generateReport(): AuditReport {
    const generatedReport = { ...this.report };
    this.report = this.initializeReport();
    return generatedReport;
  }
}

// Example usage
const reportGenerator = new AuditReportGenerator();
const report = reportGenerator
  .setId('report-001')
  .setTitle('Vendor Security Audit Report')
  .setVendorId('vendor-123')
  .setAuditId('audit-001')
  .setExecutiveSummary('This report summarizes the security assessment findings.')
  .addFinding({
    id: 'finding-1',
    category: 'Authentication',
    title: 'Weak Password Policy',
    description: 'The vendor does not enforce strong password requirements.',
    severity: 'high',
    evidence: ['Screenshot1.png', 'PolicyDocument.pdf'],
    impact: 'Increased risk of unauthorized access',
    recommendation: 'Implement strong password policy with complexity requirements'
  })
  .setGeneratedBy('John Doe')
  .generateReport();
