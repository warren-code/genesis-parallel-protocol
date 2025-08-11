import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { data, error } = await supabase.from('events').select('*');
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);

    case 'POST':
      const { title, description, date } = req.body;
      const { data: event, error: insertError } = await supabase
        .from('events')
        .insert([{ title, description, date }]);
      if (insertError) return res.status(500).json({ error: insertError.message });
      return res.status(201).json(event);

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
