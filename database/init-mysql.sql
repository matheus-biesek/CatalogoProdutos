SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS produtos (
    id CHAR(36) NOT NULL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    url_imagem VARCHAR(500),
    quantidade_em_stock INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO produtos (id, nome, descricao, preco, url_imagem, quantidade_em_stock)
VALUES
    (UUID(), 'Notebook Dell Inspiron', 'Notebook Dell com 16GB RAM e SSD 512GB', 4500.00, 'https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg', 10),
    (UUID(), 'iPhone 14', 'Smartphone Apple com 128GB', 6500.00, 'https://thumbs.dreamstime.com/b/superf%C3%ADcie-surfando-da-%C3%A1gua-onda-de-oceano-do-mar-124362369.jpg', 5),
    (UUID(), 'Monitor LG UltraWide', 'Monitor 29 polegadas Full HD', 1200.00, 'https://cdn.pixabay.com/photo/2015/01/21/14/14/office-606761_640.jpg', 8),
    (UUID(), 'Teclado Mecânico', 'Teclado RGB Switch Blue', 350.00, 'https://wallpapers.com/images/hd/awesome-pictures-k287z98ruunquo28.jpg', 15),
    (UUID(), 'Mouse Gamer Logitech', 'Mouse com 6 botões programáveis', 250.00, 'https://wallpapers.com/images/featured/imagens-claras-gkaxtdvra1koe62i.jpg', 20);
