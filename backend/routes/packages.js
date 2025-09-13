// routes/packages.js
const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabaseClient');

// GET all packages
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('packages').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET package by slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return res.status(404).json({ error: 'Package not found' });
  res.json(data);
});

module.exports = router;
