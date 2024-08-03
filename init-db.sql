-- Usar la base de datos 'mycrud'
USE mycrud;

-- Crear una tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Insertar datos de ejemplo en la tabla de usuarios
INSERT INTO users (name, email) VALUES ('ramiro_doe', 'rami@example.com');
INSERT INTO users (name, email) VALUES ('carlos_doe', 'carlo@example.com');

