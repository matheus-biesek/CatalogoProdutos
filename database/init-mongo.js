db = db.getSiblingDB('loja');

db.produtos.insertMany([
    {
        _id: ObjectId(),
        nome: 'Notebook Dell Inspiron',
        descricao: 'Notebook Dell com 16GB RAM e SSD 512GB',
        preco: 4500.00,
        url_imagem: 'https://exemplo.com/dell.jpg',
        quantidade_em_stock: 10
    },
    {
        _id: ObjectId(),
        nome: 'iPhone 14',
        descricao: 'Smartphone Apple com 128GB',
        preco: 6500.00,
        url_imagem: 'https://exemplo.com/iphone14.jpg',
        quantidade_em_stock: 5
    },
    {
        _id: ObjectId(),
        nome: 'Monitor LG UltraWide',
        descricao: 'Monitor 29 polegadas Full HD',
        preco: 1200.00,
        url_imagem: 'https://exemplo.com/lg.jpg',
        quantidade_em_stock: 8
    },
    {
        _id: ObjectId(),
        nome: 'Teclado Mecânico',
        descricao: 'Teclado RGB Switch Blue',
        preco: 350.00,
        url_imagem: 'https://exemplo.com/teclado.jpg',
        quantidade_em_stock: 15
    },
    {
        _id: ObjectId(),
        nome: 'Mouse Gamer Logitech',
        descricao: 'Mouse com 6 botões programáveis',
        preco: 250.00,
        url_imagem: 'https://exemplo.com/mouse.jpg',
        quantidade_em_stock: 20
    }
]);

db.produtos.createIndex({ "nome": 1 });
db.produtos.createIndex({ "preco": 1 });
db.produtos.createIndex({ "quantidade_em_stock": 1 });

print('Dados iniciais inseridos com sucesso na coleção produtos!');
