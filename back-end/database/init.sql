CREATE TABLE IF NOT EXISTS products (
    id CHAR(36) NOT NULL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    url_imagem VARCHAR(500),
    quantidade_em_stock INT NOT NULL DEFAULT 0
);

INSERT INTO products (id, nome, descricao, preco, url_imagem, quantidade_em_stock)
VALUES
    (UUID(), 'Notebook Dell Inspiron', 'Notebook Dell com 16GB RAM e SSD 512GB', 4500.00, 'https://exemplo.com/dell.jpg', 10),
    (UUID(), 'iPhone 14', 'Smartphone Apple com 128GB', 6500.00, 'https://exemplo.com/iphone14.jpg', 5),
    (UUID(), 'Monitor LG UltraWide', 'Monitor 29 polegadas Full HD', 1200.00, 'https://exemplo.com/lg.jpg', 8),
    (UUID(), 'Teclado Mecânico', 'Teclado RGB Switch Blue', 350.00, 'https://exemplo.com/teclado.jpg', 15),
    (UUID(), 'Mouse Gamer Logitech', 'Mouse com 6 botões programáveis', 250.00, 'https://exemplo.com/mouse.jpg', 20);
