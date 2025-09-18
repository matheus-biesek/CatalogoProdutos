# 🛒 Catálogo de Produtos

Sistema completo de catálogo de produtos com backend NestJS, frontend Angular e suporte a múltiplos bancos de dados (MySQL e MongoDB).

## 📁 Estrutura do Projeto

```
📁 CatalogoProdutos/
├── 🚀 back-end/          # API NestJS com DIP (Dependency Inversion Principle)
├── 🎨 front-end/         # SPA Angular com interface responsiva
├── 🗄️ database/          # Scripts de inicialização e migração
└── 🐳 docker-compose.yml # Orquestração completa dos serviços
```

> 📖 **Cada pasta possui seu próprio README** com documentação detalhada e instruções específicas.

## 🔧 Visão Geral Técnica

### Backend (NestJS)
- **Arquitetura**: DIP implementado - permite alternar entre MySQL e MongoDB sem alteração de código
- **API**: RESTful com endpoints para busca de produtos
- **Documentação**: Swagger automático disponível em `/api/docs`
- **Validação**: DTOs com class-validator para entrada de dados

### Frontend (Angular)
- **Compatibilidade**: ✅ 100% funcional com MySQL e MongoDB
- **Interface**: Responsiva com Bootstrap, paginação, busca em tempo real
- **Funcionalidades**: Listagem, detalhes.

### Database
- **Scripts**: Inicialização automática com dados de exemplo para ambos os bancos
- **Migração**: Scripts para popular bancos com dados de teste

### Kubernetes
- **Deploy**: Orquestração completa com k3s/Kubernetes
- **Manifests**: Configuração para MySQL, backend e frontend
- **Compatibilidade**: Linux (k3s) e Windows (Docker Desktop)

## 🚀 Execução Rápida

### Pré-requisitos
- Docker e Docker Compose instalados
- Portas 80, 3000, 3306, 27017, 8080, 8081 disponíveis

### Iniciando a aplicação

```bash
# Clonar o repositório
git clone https://github.com/matheus-biesek/CatalogoProdutos.git
cd CatalogoProdutos

# Subir toda a stack
docker compose up -d

# Verificar status dos serviços
docker compose ps
```

### Acessos da aplicação
- **Frontend**: http://localhost - Interface principal do catálogo
- **API**: http://localhost:3000 - Endpoints da API REST
- **Swagger**: http://localhost:3000/api/docs - Documentação interativa da API
- **phpMyAdmin**: http://localhost:8080 - Interface web para MySQL
- **Mongo Express**: http://localhost:8081 - Interface web para MongoDB

## 🐳 Arquitetura dos Serviços

O `docker-compose.yml` orquestra **6 serviços integrados**:

| Serviço | Tecnologia | Porta | Descrição |
|---------|------------|-------|-----------|
| **backend** | NestJS + TypeScript | 3000 | API REST com DIP para múltiplos bancos |
| **frontend** | Angular + Nginx | 80 | SPA responsiva com interface moderna |
| **db** | MySQL 8.0 | 3306 | Banco relacional principal |
| **mongodb** | MongoDB 7.0 | 27017 | Banco NoSQL alternativo |
| **phpmyadmin** | phpMyAdmin | 8080 | Interface web para administração MySQL |
| **mongo-express** | Mongo Express | 8081 | Interface web para administração MongoDB |

### ⚙️ Configuração de Banco de Dados

Para alternar entre MySQL e MongoDB, modifique a variável `DB_TYPE` no `docker-compose.yml`:

```yaml
services:
  backend:
    environment:
      DB_TYPE: mysql    # Opções: 'mysql' ou 'mongo'
```

**Reinicie o backend após a alteração:**
```bash
docker compose restart backend
```

## 🛠️ Comandos Úteis

```bash
# Logs dos serviços
docker compose logs -f backend
docker compose logs -f frontend

# Parar todos os serviços
docker compose down

# Rebuild completo
docker compose down
docker compose build --no-cache
docker compose up -d

# Limpar volumes (remove dados dos bancos)
docker compose down -v
```

## 🔧 Desenvolvimento Local

Para desenvolvimento sem Docker, consulte os READMEs específicos:
- `back-end/README.md` - Configuração e execução do backend
- `front-end/README.md` - Configuração e execução do frontend
- `kubernetes/README.md` - Deploy com Kubernetes/k3s
- `database/README.md` - Configurações e esquema do MySql e Mongo

## 🎯 Funcionalidades Implementadas

- ✅ **Busca**: Pesquisa em tempo real por filtros
- ✅ **Paginação**: Navegação eficiente entre grandes datasets
- ✅ **Documentação**: Swagger automático com todos os endpoints
- ✅ **Multi-banco**: Suporte transparente para MySQL e MongoDB
- ✅ **Docker**: Ambiente completo containerizado
- ✅ **Kubernets**: Orquestração do front end, back end e MySql.

---

📚 **Para instruções detalhadas de desenvolvimento**, consulte o README de cada pasta.