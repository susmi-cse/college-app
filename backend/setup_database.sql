

CREATE DATABASE IF NOT EXISTS test;
USE test;

-- 1. Create Marketplace Table
CREATE TABLE IF NOT EXISTS marketplace (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    contact VARCHAR(100),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Canteen Orders Table (Simplified)
CREATE TABLE IF NOT EXISTS canteen_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    student_id VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Pending', -- Pending, Ready, Delivered
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Transport Rides Table
CREATE TABLE IF NOT EXISTS rides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id VARCHAR(50),
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    time_of_dept VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    seats_available INT DEFAULT 4,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some dummy data to verify it works
INSERT INTO marketplace (title, price, description, contact) VALUES 
('Engineering Physics Book', 450.00, 'Like new condition', '9998887776'),
('Scientific Calculator', 300.00, 'Casio fx-991EX', '8887776665');

INSERT INTO rides (origin, destination, time_of_dept, price) VALUES 
('Main Gate', 'Hostel Block A', '5:30 PM', 20.00),
('Library', 'City Center', '6:00 PM', 50.00);

SELECT "Database 'college_app' created successfully!" as Status;
