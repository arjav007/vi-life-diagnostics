// backend/routes/packages.js
const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Route to get a single package by its slug
router.get('/:slug', packageController.getPackageBySlug); 

// Route to get all packages
router.get('/', packageController.getAllPackages);

module.exports = router;