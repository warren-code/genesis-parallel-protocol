import { VendorAuditChecklist } from '../types';

export class VendorAuditChecklistBuilder {
  private checklist: VendorAuditChecklist;

  constructor() {
    this.checklist = this.resetChecklist();
  }

  private resetChecklist(): VendorAuditChecklist {
    return {
      id: '',
      name: '',
      description: '',
      category: 'security',
      sections: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isTemplate: false,
      tags: [],
    };
  }

  public setId(id: string): VendorAuditChecklistBuilder {
    this.checklist.id = id;
    return this;
  }

  public setName(name: string): VendorAuditChecklistBuilder {
    this.checklist.name = name;
    return this;
  }

  public setDescription(description: string): VendorAuditChecklistBuilder {
    this.checklist.description = description;
    return this;
  }

  public setCategory(category: 'security' | 'privacy' | 'compliance' | 'financial' | 'operational'): VendorAuditChecklistBuilder {
    this.checklist.category = category;
    return this;
  }

  public setTags(tags: string[]): VendorAuditChecklistBuilder {
    this.checklist.tags = tags;
    return this;
  }

  public addSection(section: { id: string, title: string, description?: string, items: any[], weight: number, order: number }): VendorAuditChecklistBuilder {
    this.checklist.sections.push(section);
    return this;
  }

  public build(): VendorAuditChecklist {
    const builtChecklist = { ...this.checklist };
    this.checklist = this.resetChecklist();
    return builtChecklist;
  }
}

// Example usage
const checklistBuilder = new VendorAuditChecklistBuilder();
const newChecklist = checklistBuilder
  .setId('audit-001')
  .setName('Security Audit')
  .setDescription('A comprehensive security audit checklist.')
  .setCategory('security')
  .setTags(['security', 'audit'])
  .addSection({
    id: 'section-1',
    title: 'Authentication',
    items: [],
    weight: 5,
    order: 1,
  })
  .build();
