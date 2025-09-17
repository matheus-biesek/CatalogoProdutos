# 🛒 Catálogo de Produtos - Backend

API RESTful para gerenciamento de catálogo de produtos com suporte a múltiplos bancos de dados, desenvolvida com NestJS e TypeScript.

## 🏗️ Arquitetura

Este projeto implementa uma arquitetura limpa com **Dependency Inversion Principle (DIP)**, permitindo alternar entre diferentes bancos de dados através de variáveis de ambiente.

### 📁 Estrutura do Projeto

```
src/
├── main.ts                    # Bootstrap da aplicação + configuração Swagger
├── app.module.ts              # Módulo principal com configuração dinâmica de DB
└── product/                   # Módulo de produtos
    ├── product.controller.ts  # Endpoints da API
    ├── product.service.ts     # Lógica de negócio
    ├── product.module.ts      # Configuração de injeção dinâmica
    ├── dto/                   # Data Transfer Objects
    │   ├── pagination.dto.ts
    │   ├── sort.dto.ts
    │   ├── search.dto.ts
    │   ├── find-all.dto.ts
    │   ├── error-response.dto.ts
    │   └── product-response.dto.ts
    └── dao/                   # Data Access Object Layer
        ├── interface/
        │   └── product.repository.ts    # Interface do repositório
        ├── entity/
        │   ├── mysql-product.entity.ts  # Entidade TypeORM
        │   └── mongo-product.entity.ts  # Schema Mongoose
        └── repository/
            ├── mysql-product.repository.ts  # Implementação MySQL
            └── mongo-product.repository.ts  # Implementação MongoDB
```

## 🚀 API Endpoints

A API oferece 3 endpoints principais documentados automaticamente via Swagger:

### 📋 Listar Produtos
```http
GET /api/products
```
- **Paginação**: `?page=1&limit=10`
- **Ordenação**: `?sort=price,asc` ou `?sort=name,desc`
- **Busca**: `?search=notebook` (case-insensitive no nome)

### 🔍 Buscar Produto por ID
```http
GET /api/products/:id
```

## 🗄️ Suporte Multi-Database

O projeto suporta dois bancos de dados através da variável `DB_TYPE`:

### MySQL (TypeORM)
- Entidade: `MySqlProduct`
- Repositório: `MySqlProductRepository`
- ORM: TypeORM com MySQL2

### MongoDB (Mongoose)
- Schema: `MongoProduct`
- Repositório: `MongoProductRepository`
- ODM: Mongoose

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` com as seguintes configurações:

```env
# Tipo de banco de dados (mysql ou mongo)
DB_TYPE=mysql

# Configurações MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=loja

# Configurações MongoDB
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USERNAME=admin
MONGO_PASSWORD=adminpass
MONGO_DB=loja

# Servidor
PORT=3000
NODE_ENV=development

# CORS (múltiplas origens separadas por vírgula)
CORS_ORIGINS=http://localhost:4200,http://127.0.0.1:4200
```

## 🛠️ Principais Dependências

### Framework & Core
- **NestJS**: Framework Node.js progressivo e escalável
- **TypeScript**: Superset tipado do JavaScript
- **Reflect Metadata**: Decorators e metadados para DI

### Banco de Dados
- **TypeORM**: ORM para TypeScript e JavaScript (MySQL)
- **Mongoose**: ODM para MongoDB e Node.js
- **MySQL2**: Driver MySQL mais rápido
- **@nestjs/typeorm**: Integração TypeORM com NestJS
- **@nestjs/mongoose**: Integração Mongoose com NestJS

### Validação & Transformação
- **Class Validator**: Validação declarativa baseada em decorators
- **Class Transformer**: Transformação de objetos plain para classes

### Documentação
- **Swagger UI Express**: Interface web para documentação da API
- **@nestjs/swagger**: Integração automática Swagger com NestJS

### Configuração
- **@nestjs/config**: Gerenciamento de configurações e variáveis de ambiente
- **Dotenv**: Carregamento de variáveis de ambiente

### Desenvolvimento
- **Jest**: Framework de testes
- **ESLint + Prettier**: Linting e formatação de código
- **Supertest**: Testes de integração HTTP

## 🏃 Como Executar

### Pré-requisitos
- Node.js 18+
- PNPM
- MySQL ou MongoDB (conforme configuração)

### Instalação
```bash
# Instalar dependências
pnpm install
```

# Configurar variáveis de ambiente `.env`

```bash
# Tipo de banco de dados (mysql ou mongo)
DB_TYPE=mysql

# Configurações MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=loja

# Configurações MongoDB
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USERNAME=admin
MONGO_PASSWORD=adminpass
MONGO_DB=loja
```

# Iniciar aplicação.
```bash
# Modo desenvolvimento (hot reload)
pnpm run start:dev

# Modo produção
pnpm run start:prod

# Build
pnpm run build
```

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação interativa:

```
http://localhost:3000/api/docs
```

A documentação Swagger é gerada automaticamente com base nos decorators dos DTOs e controladores.

## 🐳 Docker

O projeto inclui suporte completo ao Docker:

```bash
# Build da imagem
docker build -t catalogo-backend .

# Executar com docker-compose (inclui MySQL/MongoDB)
docker-compose up -d
```

## 🎯 Padrões Implementados

- **Dependency Inversion Principle (DIP)**: Inversão de dependências para alternância de repositórios
- **Repository Pattern**: Abstração da camada de dados
- **DTO Pattern**: Validação e transformação de dados
- **Module Pattern**: Organização modular do código
- **Decorator Pattern**: Validação, documentação e metadados