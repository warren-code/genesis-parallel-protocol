import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getCurrentUser } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { user } = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      original_claim,
      claim_source,
      counter_evidence,
      evidence_sources,
      category,
      tags,
      confidence_score,
      impact_assessment,
      notes
    } = body;

    // Create the truth map entry
    const { data, error } = await supabase
      .from('lie_truth_map')
      .insert({
        title,
        original_claim,
        claim_source,
        counter_evidence,
        evidence_sources,
        category,
        tags,
        confidence_score: confidence_score || 0,
        impact_assessment,
        notes,
        status: 'under_review',
        created_by: user.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating truth map entry:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the activity
    await supabase
      .from('activity_logs')
      .insert({
        user_id: user.id,
        action: 'create_truth_entry',
        entity_type: 'lie_truth_map',
        entity_id: data.id,
        metadata: { title, category }
      });

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error in truth map create API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
