// backend/middleware/auth.js

const jwt = require('jsonwebtoken');
// FIX: Import the Supabase client instead of the old database pool
const supabase = require('../lib/supabaseClient');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // FIX: Use Supabase to get the user
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, phone')
      .eq('id', decoded.userId)
      .eq('is_active', true)
      .single(); // .single() gets one record or returns an error

    if (error || !user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
};

module.exports = authMiddleware;