import supabase from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  const { slug } = req.query;

  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Package not found' });
  }

  res.status(200).json(data);
}
