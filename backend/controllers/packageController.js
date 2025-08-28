// backend/controllers/packageController.js
const Package = require('../models/Package');

exports.getPackageBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const packageData = await Package.findBySlug(slug);

        if (!packageData) {
            return res.status(404).json({ message: 'Package not found' });
        }

        res.status(200).json(packageData);
    } catch (error) {
        console.error('Error in getPackageBySlug:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.findAll(); // Assuming you have a findAll method
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};