# 🛒 Catálogo de Produtos

Sistema completo de catálogo de produtos com backend NestJS, frontend Angular e suporte a múltiplos bancos de dados.

## 📁 Estrutura do Projeto

```
📁 CatalogoProdutos/
├── 🚀 back-end/          # API NestJS com DIP
├── 🎨 front-end/         # SPA Angular
├── 🗄️ database/          # Scripts de inicialização
└── 🐳 docker-compose.yml # Orquestração completa
```

> 📖 **Cada pasta possui seu próprio README** com documentação detalhada e instruções específicas.

## 🔧 Visão Geral Técnica

### Backend (NestJS)
- **Arquitetura**: DIP implementado - permite alternar entre MySQL e MongoDB
- **API**: RESTful com 3 endpoints principais
- **Documentação**: Swagger automático

### Frontend (Angular)
- **Status**: ✅ 100% funcional com MySQL
- **Limitação**: ⚠️ **DIP não implementado** - MongoDB retorna produtos sem parse correto dos atributos
- **Interface**: Responsiva com paginação, busca e detalhes

### Database
- **MySQL**: Totalmente compatível
- **MongoDB**: Backend funciona, frontend tem limitações de parsing
- **Scripts**: Inicialização automática com dados de exemplo

## 🚀 Execução Rápida

```bash
# Stack completa
docker-compose up -d

# Acessar:
# Frontend: http://localhost
# API: http://localhost:3000
# Swagger: http://localhost:3000/api
```

## 🐳 Docker Compose Principal

O `docker-compose.yml` orquestra **todos os serviços**:

- **backend**: API NestJS (porta 3000)
- **frontend**: Angular + Nginx (porta 80)
- **db**: MySQL 8.0 (porta 3306)
- **mongodb**: MongoDB 7.0 (porta 27017)
- **phpmyadmin**: Interface MySQL (porta 8080)
- **mongo-express**: Interface MongoDB (porta 8081)

### Configuração de Banco

Altere a variável `DB_TYPE` no `docker-compose.yml`:

```yaml
environment:
  DB_TYPE: mysql    # ou 'mongo'
```

## ⚠️ Limitação Conhecida

**Frontend + MongoDB**: Os produtos aparecem na lista, mas os atributos não são parseados corretamente devido à falta de DIP no Angular. O backend funciona perfeitamente com ambos os bancos.

## 🎯 Próximos Passos

- **DIP no Frontend**: Implementar adapters para compatibilidade completa com MongoDB
- **Kubernetes**: Migração da orquestração Docker para Kubernetes

---

📚 **Para instruções detalhadas**, consulte o README de cada pasta.