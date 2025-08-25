-- Vi-Life Diagnostics Database Schema
-- PostgreSQL Database Setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    address JSONB,
    emergency_contact JSONB,
    medical_conditions TEXT[],
    allergies TEXT[],
    profile_image VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for users table
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_active ON users(is_active);

-- =====================================================
-- LOCATIONS TABLE
-- =====================================================
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    operating_hours JSONB,
    services TEXT[],
    manager_name VARCHAR(255),
    capacity INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for locations table
CREATE INDEX idx_locations_city ON locations(city);
CREATE INDEX idx_locations_active ON locations(is_active);
CREATE INDEX idx_locations_coordinates ON locations(latitude, longitude);

-- =====================================================
-- PACKAGES TABLE
-- =====================================================
CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    detailed_description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    parameter_count INTEGER NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    duration VARCHAR(50), -- e.g., "Same Day", "24 hours", "2-3 days"
    sample_type VARCHAR(100), -- e.g., "Blood", "Urine", "Both"
    fasting_required BOOLEAN DEFAULT FALSE,
    home_collection_available BOOLEAN DEFAULT TRUE,
    preparation_instructions TEXT[],
    included_tests JSONB,
    age_group VARCHAR(50), -- e.g., "Adult", "Child", "Senior", "All"
    gender_specific VARCHAR(20) CHECK (gender_specific IN ('Male', 'Female', 'Both')),
    popularity_score INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for packages table
CREATE INDEX idx_packages_slug ON packages(slug);
CREATE INDEX idx_packages_category ON packages(category);
CREATE INDEX idx_packages_price ON packages(price);
CREATE INDEX idx_packages_featured ON packages(is_featured);
CREATE INDEX idx_packages_active ON packages(is_active);
CREATE INDEX idx_packages_popularity ON packages(popularity_score DESC);
CREATE INDEX idx_packages_search ON packages USING gin(to_tsvector('english', name || ' ' || description));

-- =====================================================
-- BOOKINGS TABLE
-- =====================================================
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id),
    package_id UUID REFERENCES packages(id),
    patient_name VARCHAR(255) NOT NULL,
    patient_phone VARCHAR(20) NOT NULL,
    patient_email VARCHAR(255),
    patient_age INTEGER,
    patient_gender VARCHAR(10) CHECK (patient_gender IN ('Male', 'Female', 'Other')),
    collection_type VARCHAR(20) CHECK (collection_type IN ('Home', 'Center')) DEFAULT 'Home',
    collection_address JSONB,
    preferred_date DATE NOT NULL,
    preferred_time_slot VARCHAR(50),
    actual_collection_datetime TIMESTAMP WITH TIME ZONE,
    special_instructions TEXT,
    status VARCHAR(20) CHECK (status IN ('Pending', 'Confirmed', 'Collected', 'Processing', 'Completed', 'Cancelled')) DEFAULT 'Pending',
    payment_status VARCHAR(20) CHECK (payment_status IN ('Pending', 'Paid', 'Failed', 'Refunded')) DEFAULT 'Pending',
    payment_method VARCHAR(50),
    payment_transaction_id VARCHAR(255),
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    final_amount DECIMAL(10, 2) NOT NULL,
    discount_code VARCHAR(50),
    collector_id UUID,
    collector_notes TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancelled_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for bookings table
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_booking_number ON bookings(booking_number);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_preferred_date ON bookings(preferred_date);
CREATE INDEX idx_bookings_location_id ON bookings(location_id);
CREATE INDEX idx_bookings_package_id ON bookings(package_id);

-- =====================================================
-- REPORTS TABLE
-- =====================================================
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    report_number VARCHAR(50) UNIQUE NOT NULL,
    report_type VARCHAR(50) NOT NULL, -- e.g., "Lab Report", "Pathology", "Radiology"
    report_title VARCHAR(255) NOT NULL,
    test_date TIMESTAMP WITH TIME ZONE,
    report_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) CHECK (status IN ('Processing', 'Ready', 'Delivered', 'Archived')) DEFAULT 'Processing',
    report_file_path VARCHAR(500),
    report_file_size BIGINT,
    report_file_type VARCHAR(50),
    raw_data JSONB, -- Store test results in structured format
    normal_ranges JSONB, -- Store normal ranges for each parameter
    abnormal_flags JSONB, -- Store flags for abnormal values
    doctor_comments TEXT,
    technician_notes TEXT,
    reviewed_by UUID, -- Reference to staff/doctor who reviewed
    reviewed_at TIMESTAMP WITH TIME ZONE,
    patient_notified BOOLEAN DEFAULT FALSE,
    notification_sent_at TIMESTAMP WITH TIME ZONE,
    download_count INTEGER DEFAULT 0,
    last_downloaded_at TIMESTAMP WITH TIME ZONE,
    is_critical BOOLEAN DEFAULT FALSE, -- Flag for critical/urgent results
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for reports table
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_booking_id ON reports(booking_id);
CREATE INDEX idx_reports_report_number ON reports(report_number);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_report_date ON reports(report_date);
CREATE INDEX idx_reports_critical ON reports(is_critical);

-- =====================================================
-- CONTACT INQUIRIES TABLE
-- =====================================================
CREATE TABLE contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'Website', -- Website, Phone, Email, etc.
    status VARCHAR(20) CHECK (status IN ('New', 'In Progress', 'Resolved', 'Closed')) DEFAULT 'New',
    priority VARCHAR(20) CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')) DEFAULT 'Medium',
    assigned_to UUID,
    response_sent BOOLEAN DEFAULT FALSE,
    response_sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for contact inquiries table
CREATE INDEX idx_contact_email ON contact_inquiries(email);
CREATE INDEX idx_contact_status ON contact_inquiries(status);
CREATE INDEX idx_contact_priority ON contact_inquiries(priority);
CREATE INDEX idx_contact_created_at ON contact_inquiries(created_at);

-- =====================================================
-- BLOG POSTS TABLE
-- =====================================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[],
    featured_image VARCHAR(500),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    reading_time INTEGER, -- estimated reading time in minutes
    view_count INTEGER DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for blog posts table
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_search ON blog_posts USING gin(to_tsvector('english', title || ' ' || content));

-- =====================================================
-- DISCOUNT CODES TABLE
-- =====================================================
CREATE TABLE discount_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) CHECK (discount_type IN ('Percentage', 'Fixed')) NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    minimum_amount DECIMAL(10, 2) DEFAULT 0,
    maximum_discount DECIMAL(10, 2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    applicable_packages UUID[], -- Array of package IDs
    applicable_categories TEXT[], -- Array of categories
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for discount codes table
CREATE INDEX idx_discount_codes_code ON discount_codes(code);
CREATE INDEX idx_discount_codes_active ON discount_codes(is_active);
CREATE INDEX idx_discount_codes_valid_dates ON discount_codes(valid_from, valid_until);

-- =====================================================
-- STAFF TABLE (for internal users)
-- =====================================================
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL, -- Admin, Manager, Technician, Collector, etc.
    permissions JSONB,
    location_id UUID REFERENCES locations(id),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for staff table
CREATE INDEX idx_staff_email ON staff(email);
CREATE INDEX idx_staff_employee_id ON staff(employee_id);
CREATE INDEX idx_staff_role ON staff(role);
CREATE INDEX idx_staff_location_id ON staff(location_id);
CREATE INDEX idx_staff_active ON staff(is_active);

-- =====================================================
-- AUDIT LOGS TABLE
-- =====================================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    changed_by UUID, -- Could reference users or staff
    user_type VARCHAR(20) CHECK (user_type IN ('User', 'Staff')) DEFAULT 'User',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for audit logs table
CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_changed_by ON audit_logs(changed_by);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- email, sms, push, in-app
    status VARCHAR(20) CHECK (status IN ('Pending', 'Sent', 'Failed', 'Read')) DEFAULT 'Pending',
    scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB, -- Store additional data like booking_id, report_id, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for notifications table
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_scheduled_at ON notifications(scheduled_at);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$ language 'plpgsql';

-- Apply triggers to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE ON contact_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discount_codes_updated_at BEFORE UPDATE ON discount_codes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL DATA SEEDING
-- =====================================================

-- Insert sample locations
INSERT INTO locations (name, address, city, state, pincode, phone, email, operating_hours, services) VALUES
('Thane Center', 'Casting Company, Unit 1A & B, 1st Floor, Shreeji Arcade, opp. Nitm - Cadbury Flyover, Panch Pakhdi, Thane, Maharashtra 400602', 'Thane', 'Maharashtra', '400602', '+91-982-882-6646', 'thane@vlifediagnostics.com', 
'{"monday": "6:30-19:30", "tuesday": "6:30-19:30", "wednesday": "6:30-19:30", "thursday": "6:30-19:30", "friday": "6:30-19:30", "saturday": "6:30-19:30", "sunday": "6:30-19:30"}',
'{"Blood Collection", "Home Sample Collection", "Health Packages", "Pathology Tests"}'),

('Dombivli Center', 'Hopewell Multispeciality Hospital, Meadows Gate Bunglow No. 46, Casa Rio Gold No. 2, Palava City, Dombivli - 421204', 'Dombivli', 'Maharashtra', '421204', '+91-982-882-6646', 'dombivli@vlifediagnostics.com',
'{"monday": "6:30-19:30", "tuesday": "6:30-19:30", "wednesday": "6:30-19:30", "thursday": "6:30-19:30", "friday": "6:30-19:30", "saturday": "6:30-19:30", "sunday": "6:30-19:30"}',
'{"Blood Collection", "Home Sample Collection", "Health Packages", "Pathology Tests"}'),

('Vashi Center', 'Global 5 Heights, F 2/0-1 Main Road, Sector 9, Vashi, Navi Mumbai, Maharashtra 400703', 'Vashi', 'Maharashtra', '400703', '+91-982-882-6646', 'vashi@vlifediagnostics.com',
'{"monday": "6:30-19:30", "tuesday": "6:30-19:30", "wednesday": "6:30-19:30", "thursday": "6:30-19:30", "friday": "6:30-19:30", "saturday": "6:30-19:30", "sunday": "6:30-19:30"}',
'{"Blood Collection", "Home Sample Collection", "Health Packages", "Pathology Tests"}'),

('Bhiwandi Center', 'House no 278, Old Mumbai-Agra Rd, opp. Sympathy Hospital, Dhamankar Naka, Bhiwandi, Maharashtra 421302', 'Bhiwandi', 'Maharashtra', '421302', '+91-982-882-6646', 'bhiwandi@vlifediagnostics.com',
'{"monday": "6:30-19:30", "tuesday": "6:30-19:30", "wednesday": "6:30-19:30", "thursday": "6:30-19:30", "friday": "6:30-19:30", "saturday": "6:30-19:30", "sunday": "6:30-19:30"}',
'{"Blood Collection", "Home Sample Collection", "Health Packages", "Pathology Tests"}');

-- Insert sample packages
INSERT INTO packages (name, slug, description, detailed_description, price, original_price, parameter_count, category, gender_specific, duration, sample_type, fasting_required, included_tests) VALUES
('ViLife Adult Female', 'vilife-adult-female', 'Comprehensive health checkup package designed specifically for adult women', 'A complete health assessment package tailored for adult women, including hormone tests, reproductive health markers, and general wellness parameters.', 2999.00, 5999.00, 9, 'Health Checkup', 'Female', 'Same Day', 'Blood', true,
'{"CBC": "Complete Blood Count", "Lipid Profile": "Cholesterol and Triglycerides", "Thyroid Profile": "TSH, T3, T4", "Blood Glucose": "Fasting and Random", "Liver Function": "SGPT, SGOT, Bilirubin", "Kidney Function": "Creatinine, BUN", "Iron Studies": "Serum Iron, TIBC", "Vitamin D": "25-OH Vitamin D", "HbA1c": "Diabetes Monitoring"}'),

('ViLife Adult Male', 'vilife-adult-male', 'Comprehensive health checkup package designed specifically for adult men', 'A complete health assessment package tailored for adult men, including prostate health markers, cardiac risk assessment, and general wellness parameters.', 2999.00, 5999.00, 9, 'Health Checkup', 'Male', 'Same Day', 'Blood', true,
'{"CBC": "Complete Blood Count", "Lipid Profile": "Cholesterol and Triglycerides", "Thyroid Profile": "TSH, T3, T4", "Blood Glucose": "Fasting and Random", "Liver Function": "SGPT, SGOT, Bilirubin", "Kidney Function": "Creatinine, BUN", "PSA": "Prostate Specific Antigen", "Vitamin D": "25-OH Vitamin D", "HbA1c": "Diabetes Monitoring"}'),

('ViLife Diabetes Advance', 'vilife-diabetes-advance', 'Advanced diabetes monitoring and management package', 'Comprehensive diabetes assessment including glucose monitoring, HbA1c, kidney function, and diabetes-related complications screening.', 2999.00, 5999.00, 9, 'Diabetes', 'Both', '24 Hours', 'Blood + Urine', true,
'{"HbA1c": "3-month average glucose", "Fasting Glucose": "Blood sugar fasting", "Post Meal Glucose": "Blood sugar after meal", "Microalbumin": "Kidney function", "Lipid Profile": "Cholesterol screening", "Kidney Function": "Creatinine, BUN", "Liver Function": "SGPT, SGOT", "Thyroid Profile": "TSH", "Urine Analysis": "Complete urine examination"}');

-- Insert sample discount codes
INSERT INTO discount_codes (code, description, discount_type, discount_value, minimum_amount, maximum_discount, usage_limit, valid_from, valid_until) VALUES
('FIRST20', '20% off on first booking', 'Percentage', 20.00, 1000.00, 500.00, 1000, NOW(), NOW() + INTERVAL '30 days'),
('HEALTH50', 'Flat Rs. 50 off on health packages', 'Fixed', 50.00, 500.00, NULL, NULL, NOW(), NOW() + INTERVAL '60 days'),
('FAMILY15', '15% off on family packages', 'Percentage', 15.00, 2000.00, 300.00, 500, NOW(), NOW() + INTERVAL '90 days');

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for booking summary
CREATE VIEW booking_summary AS
SELECT 
    b.id,
    b.booking_number,
    b.patient_name,
    b.patient_phone,
    b.status,
    b.collection_type,
    b.preferred_date,
    b.final_amount,
    p.name as package_name,
    p.category as package_category,
    l.name as location_name,
    l.city as location_city,
    u.name as user_name,
    u.email as user_email,
    b.created_at
FROM bookings b
LEFT JOIN packages p ON b.package_id = p.id
LEFT JOIN locations l ON b.location_id = l.id
LEFT JOIN users u ON b.user_id = u.id;

-- View for report summary
CREATE VIEW report_summary AS
SELECT 
    r.id,
    r.report_number,
    r.report_title,
    r.status,
    r.report_date,
    r.is_critical,
    r.patient_notified,
    b.booking_number,
    b.patient_name,
    p.name as package_name,
    u.name as user_name,
    u.email as user_email,
    u.phone as user_phone
FROM reports r
JOIN bookings b ON r.booking_id = b.id
JOIN packages p ON b.package_id = p.id
JOIN users u ON r.user_id = u.id;

-- =====================================================
-- FUNCTIONS FOR BUSINESS LOGIC
-- =====================================================

-- Function to generate booking number
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TEXT AS $
DECLARE
    new_number TEXT;
    counter INTEGER;
BEGIN
    -- Get current date in YYYYMMDD format
    SELECT TO_CHAR(NOW(), 'YYYYMMDD') INTO new_number;
    
    -- Get count of bookings for today
    SELECT COUNT(*) + 1 
    FROM bookings 
    WHERE DATE(created_at) = CURRENT_DATE 
    INTO counter;
    
    -- Format: VL20240824001
    new_number := 'VL' || new_number || LPAD(counter::TEXT, 3, '0');
    
    RETURN new_number;
END;
$ LANGUAGE plpgsql;

-- Function to generate report number
CREATE OR REPLACE FUNCTION generate_report_number()
RETURNS TEXT AS $
DECLARE
    new_number TEXT;
    counter INTEGER;
BEGIN
    -- Get current date in YYYYMMDD format
    SELECT TO_CHAR(NOW(), 'YYYYMMDD') INTO new_number;
    
    -- Get count of reports for today
    SELECT COUNT(*) + 1 
    FROM reports 
    WHERE DATE(created_at) = CURRENT_DATE 
    INTO counter;
    
    -- Format: RPT20240824001
    new_number := 'RPT' || new_number || LPAD(counter::TEXT, 3, '0');
    
    RETURN new_number;
END;
$ LANGUAGE plpgsql;