# 🛍️ Catálogo de Produtos - Frontend

Frontend Angular responsivo para o sistema de catálogo de produtos, desenvolvido com arquitetura moderna e standalone components.

## 🏗️ Arquitetura

Este frontend Angular implementa uma arquitetura limpa e modular com componentes standalone, services tipados e interceptors para comunicação com a API.

### 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/           # Componentes da aplicação
│   │   ├── navbar/          # Menu de navegação responsivo
│   │   ├── footer/          # Rodapé da aplicação
│   │   ├── product-list/    # Lista paginada de produtos
│   │   └── product-detail/  # Detalhes do produto individual
│   ├── services/            # Serviços de comunicação
│   │   └── product.ts       # Service para API de produtos
│   ├── models/              # Interfaces TypeScript
│   │   └── product.ts       # Modelos de dados
│   ├── interceptors/        # Interceptors HTTP
│   │   └── api-base-url.interceptor.ts # Configura URL base da API
│   ├── app.config.ts        # Configuração da aplicação
│   ├── app.routes.ts        # Definição de rotas
│   └── app.ts               # Componente raiz
├── environments/            # Configurações por ambiente
│   ├── environment.ts       # Desenvolvimento
│   └── environment.prod.ts  # Produção
└── nginx.conf               # Configuração Nginx para Docker
```

## 🚀 Funcionalidades

### ✅ Componentes Implementados

- **NavbarComponent**: Menu de navegação fixo no topo
- **FooterComponent**: Rodapé com informações da aplicação
- **ProductListComponent**: Lista responsiva com paginação, busca e ordenação
- **ProductDetailComponent**: Página detalhada do produto com compartilhamento

### ✅ Features da API

- **Listagem paginada** com controles de página
- **Busca em tempo real** com debounce
- **Ordenação** por nome, preço e estoque
- **Detalhes do produto** por ID
- **Estados de loading** e tratamento de erros

### ✅ Recursos de UX/UI

- **Design responsivo** para mobile, tablet e desktop
- **Paginação intuitiva** com navegação
- **Estados visuais** de loading e erro
- **Animações suaves** e transições CSS

## 🛠️ Tecnologias

### Core
- **Angular 20.3.0** - Framework principal
- **TypeScript 5.9.2** - Linguagem tipada
- **RxJS 7.8.0** - Programação reativa
- **SCSS** - Estilização avançada

### Arquitetura
- **Standalone Components** - Componentes independentes
- **HTTP Interceptors** - Interceptação de requisições
- **Environment Variables** - Configuração por ambiente
- **Services & DI** - Injeção de dependências

## ⚙️ Configuração de Ambiente

### Variáveis de Ambiente

**Desenvolvimento** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

**Produção** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: '/back-end'  // Proxy reverso via Nginx
};
```

### Interceptor de API

O `ApiBaseUrlInterceptor` automaticamente adiciona a URL base configurada em `environment.apiUrl` às requisições que começam com `/`:

```typescript
// Service faz requisição para '/products'
// Interceptor converte para 'http://localhost:3000/products'
```

## 🗄️ Integração com Backend

### Endpoints Consumidos

- `GET /products` - Lista produtos (paginação, ordenação)
- `GET /products/search?term=xxx` - Busca produtos
- `GET /products/:id` - Detalhes do produto

### Parâmetros Suportados

- **Paginação**: `page`, `limit`
- **Ordenação**: `sortField`, `sortDirection`
- **Busca**: `term`

### Modelos de Dados

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
}

interface PaginatedProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}
```

### Desenvolvimento

```bash
ng serve
```

## 🐳 Docker & Nginx

### Configuração Nginx

O arquivo `nginx.conf` configura:

- **Servidor estático** para arquivos Angular
- **Proxy reverso** para `/back-end/` → `backend:3000`
- **Compressão gzip** para performance
- **Headers de segurança** (XSS, CSRF, etc.)
- **Cache otimizado** para assets estáticos

### Proxy Configuration

```nginx
location /back-end/ {
    proxy_pass http://backend:3000/;
    # Headers e configurações de proxy
}
```

## 🚀 Opções deploy

- **Docker** com Nginx (configurado)
- **Vercel** / **Netlify** (estático)
- **AWS S3** + CloudFront
- **GitHub Pages**
