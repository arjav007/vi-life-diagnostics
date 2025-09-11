// backend/models/package.js
const { pool } = require('../config/database');

class Package {
    static async findBySlug(slug) {
        try {
            const query = 'SELECT * FROM packages WHERE slug = $1';
            const result = await pool.query(query, [slug]);
            return result.rows[0];
        } catch (error) {
            console.error('Error finding package by slug:', error);
            throw error;
        }
    }

    static async findAll() {
        try {
            const query = 'SELECT * FROM packages WHERE is_active = true ORDER BY name ASC';
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error finding all packages:', error);
            throw error;
        }
    }
}

module.exports = Package;
