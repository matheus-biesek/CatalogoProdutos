# 🗄️ Database - Scripts de Inicialização

Scripts de inicialização e configuração de banco de dados para o projeto Catálogo de Produtos, com suporte a MySQL e MongoDB.

## 📁 Estrutura

```
database/
├── init-mysql.sql        # Script de inicialização MySQL
├── init-mongo.js         # Script de inicialização MongoDB
├── docker-compose.yml    # Orquestração dos bancos
└── README.md            # Este arquivo
```

## 🗄️ Bancos Suportados

### MySQL 8.0
- **Tabela**: `produtos`
- **Engine**: InnoDB
- **Charset**: UTF-8
- **Índices**: Otimizados para busca

### MongoDB 7.0
- **Coleção**: `produtos`
- **Database**: `loja`
- **Índices**: Nome, preço e estoque

## 📊 Schema de Dados

### Estrutura da Tabela/Coleção `produtos`

| Campo | Tipo | Descrição | MySQL | MongoDB |
|-------|------|-----------|-------|---------|
| `id/_id` | UUID/ObjectId | Identificador único | `CHAR(36)` | `ObjectId` |
| `nome` | String | Nome do produto | `VARCHAR(255)` | `String` |
| `descricao` | String | Descrição detalhada | `TEXT` | `String` |
| `preco` | Number | Preço em reais | `DECIMAL(10,2)` | `Number` |
| `url_imagem` | String | URL da imagem | `VARCHAR(500)` | `String` |
| `quantidade_em_stock` | Number | Estoque disponível | `INT` | `Number` |

## 🚀 Como Usar

### Opção 1: Docker Compose (Recomendado)

```bash
# Subir MySQL + PHPMyAdmin
docker-compose up mysql phpmyadmin

# Subir MongoDB + Mongo Express
docker-compose up mongodb mongo-express

# Subir ambos os bancos
docker-compose up
```

### Opção 2: Executar Scripts Manualmente

#### MySQL
```bash
# Conectar ao MySQL
mysql -u root -p

# Executar script
source init-mysql.sql
```

#### MongoDB
```bash
# Conectar ao MongoDB
mongo mongodb://admin:adminpass@localhost:27017/

# Executar script
load('init-mongo.js')
```

## 🔧 Configurações

### MySQL
- **Host**: `localhost`
- **Porta**: `3306`
- **Database**: `loja`
- **Usuário**: `user`
- **Senha**: `userpass`
- **Root Password**: `root`

### MongoDB
- **Host**: `localhost`
- **Porta**: `27017`
- **Database**: `loja`
- **Usuário**: `admin`
- **Senha**: `adminpass`

## 🌐 Interfaces de Administração

### PHPMyAdmin (MySQL)
- **URL**: http://localhost:8080
- **Usuário**: `user`
- **Senha**: `userpass`

### Mongo Express (MongoDB)
- **URL**: http://localhost:8081
- **Usuário**: `admin`
- **Senha**: `adminpass`

## 📦 Dados de Exemplo

Ambos os bancos são inicializados com os mesmos 5 produtos de exemplo:

1. **Notebook Dell Inspiron** - R$ 4.500,00
2. **iPhone 14** - R$ 6.500,00
3. **Monitor LG UltraWide** - R$ 1.200,00
4. **Teclado Mecânico** - R$ 350,00
5. **Mouse Gamer Logitech** - R$ 250,00

## ⚡ Índices Criados

### MySQL
```sql
-- Índices automáticos
PRIMARY KEY (id)
```

### MongoDB
```javascript
// Índices para otimização
db.produtos.createIndex({ "nome": 1 });
db.produtos.createIndex({ "preco": 1 });
db.produtos.createIndex({ "quantidade_em_stock": 1 });
```

## 🔄 Comandos Úteis

### Verificar Status dos Containers
```bash
docker-compose ps
```

### Ver Logs
```bash
# MySQL
docker logs mysql_db

# MongoDB
docker logs mongodb
```

### Parar Serviços
```bash
# Parar todos
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

### Backup e Restore

#### MySQL
```bash
# Backup
docker exec mysql_db mysqldump -u user -puserpass loja > backup.sql

# Restore
docker exec -i mysql_db mysql -u user -puserpass loja < backup.sql
```

#### MongoDB
```bash
# Backup
docker exec mongodb mongodump --db=loja --out=/backup

# Restore
docker exec mongodb mongorestore --db=loja /backup/loja
```

## 🔒 Segurança

⚠️ **Atenção**: As credenciais nestes scripts são para **desenvolvimento apenas**.

Para produção:
- Altere todas as senhas padrão
- Use variáveis de ambiente
- Configure SSL/TLS
- Implemente backup automático
- Configure firewall adequado

## 🐳 Volumes Docker

- **mysql_data**: Persistência de dados MySQL
- **mongodb_data**: Persistência de dados MongoDB

Os dados persistem mesmo após parar os containers, mas são removidos com `docker-compose down -v`.

## 🛠️ Troubleshooting

### Problema: Porta em uso
```bash
# Verificar portas ocupadas
netstat -tulpn | grep :3306
netstat -tulpn | grep :27017

# Parar processos se necessário
sudo systemctl stop mysql
sudo systemctl stop mongod
```

### Problema: Dados não carregaram
```bash
# Verificar se scripts foram executados
docker logs mysql_db | grep "produtos"
docker logs mongodb | grep "produtos"
```

### Problema: Permissão negada
```bash
# Ajustar permissões dos scripts
chmod +r init-mysql.sql
chmod +r init-mongo.js
```