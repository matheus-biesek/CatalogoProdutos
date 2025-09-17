db = db.getSiblingDB('loja');

db.produtos.insertMany([
    {
        _id: ObjectId(),
        nome: 'Notebook Dell Inspiron',
        descricao: 'Notebook Dell com 16GB RAM e SSD 512GB',
        preco: 4500.00,
        url_imagem: 'https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg',
        quantidade_em_stock: 10
    },
    {
        _id: ObjectId(),
        nome: 'iPhone 14',
        descricao: 'Smartphone Apple com 128GB',
        preco: 6500.00,
        url_imagem: 'https://thumbs.dreamstime.com/b/superf%C3%ADcie-surfando-da-%C3%A1gua-onda-de-oceano-do-mar-124362369.jpg',
        quantidade_em_stock: 5
    },
    {
        _id: ObjectId(),
        nome: 'Monitor LG UltraWide',
        descricao: 'Monitor 29 polegadas Full HD',
        preco: 1200.00,
        url_imagem: 'https://cdn.pixabay.com/photo/2015/01/21/14/14/office-606761_640.jpg',
        quantidade_em_stock: 8
    },
    {
        _id: ObjectId(),
        nome: 'Teclado Mecânico',
        descricao: 'Teclado RGB Switch Blue',
        preco: 350.00,
        url_imagem: 'https://wallpapers.com/images/hd/awesome-pictures-k287z98ruunquo28.jpg',
        quantidade_em_stock: 15
    },
    {
        _id: ObjectId(),
        nome: 'Mouse Gamer Logitech',
        descricao: 'Mouse com 6 botões programáveis',
        preco: 250.00,
        url_imagem: 'https://wallpapers.com/images/featured/imagens-claras-gkaxtdvra1koe62i.jpg',
        quantidade_em_stock: 20
    }
]);

db.produtos.createIndex({ "nome": 1 });
db.produtos.createIndex({ "preco": 1 });
db.produtos.createIndex({ "quantidade_em_stock": 1 });

print('Dados iniciais inseridos com sucesso na coleção produtos!');
