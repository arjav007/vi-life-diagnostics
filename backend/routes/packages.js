const express = require('express');
const { pool } = require('../config/database');

const router = express.Router();

// Get all packages
router.get('/', async (req, res) => {
  try {
    const { featured, category, limit = 50 } = req.query;
    
    let query = `
      SELECT 
        id, name, slug, description, price, original_price, 
        parameter_count, category, duration, sample_type,
        fasting_required, is_featured
      FROM packages 
      WHERE is_active = true
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (featured === 'true') {
      paramCount++;
      query += ` AND is_featured = $${paramCount}`;
      params.push(true);
    }
    
    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }
    
    query += ` ORDER BY popularity_score DESC, name ASC`;
    
    if (limit) {
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      params.push(parseInt(limit));
    }
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      packages: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Get packages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch packages'
    });
  }
});

// Get package by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM packages WHERE slug = $1 AND is_active = true',
      [slug]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }
    
    res.json({
      success: true,
      package: result.rows[0]
    });
  } catch (error) {
    console.error('Get package error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch package'
    });
  }
});

module.exports = router;