import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getCurrentUser, hasRole } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { user } = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has permission to verify
    const canVerify = await hasRole(user.id, ['admin', 'ops_lead', 'legal_lead']);
    if (!canVerify) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { entryId, status, confidence_score, verification_notes } = body;

    if (!entryId || !status) {
      return NextResponse.json(
        { error: 'Entry ID and status are required' },
        { status: 400 }
      );
    }

    // Update the truth map entry
    const { data, error } = await supabase
      .from('lie_truth_map')
      .update({
        status,
        confidence_score: confidence_score || null,
        verified_by: user.id,
        verified_at: new Date().toISOString(),
        notes: verification_notes
      })
      .eq('id', entryId)
      .select()
      .single();

    if (error) {
      console.error('Error verifying truth map entry:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the activity
    await supabase
      .from('activity_logs')
      .insert({
        user_id: user.id,
        action: 'verify_truth_entry',
        entity_type: 'lie_truth_map',
        entity_id: entryId,
        metadata: { status, confidence_score }
      });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error in truth map verify API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
