# 🛍️ Catálogo de Produtos - Frontend Angular

Frontend Angular para o sistema de catálogo de produtos, desenvolvido para consumir a API RESTful do backend NestJS.

## 🚀 Características

- **Angular 20** com arquitetura standalone components
- **TypeScript** para tipagem estática
- **SCSS** para estilos responsivos
- **HttpClient** para comunicação com API
- **Router** para navegação entre páginas
- **Design responsivo** com CSS Grid e Flexbox
- **Interface moderna** com gradientes e animações

## 📋 Funcionalidades

### ✅ Componentes Implementados

- **NavbarComponent**: Menu de navegação fixo no topo
- **FooterComponent**: Rodapé com informações da aplicação
- **ProductListComponent**: Lista de produtos em grid responsivo
- **ProductDetailComponent**: Página de detalhes do produto
- **SearchBarComponent**: Barra de pesquisa com debounce

### ✅ Funcionalidades da API

- **Listagem de produtos** com paginação e ordenação
- **Busca por termo** com resultados em tempo real
- **Detalhes do produto** por ID
- **Tratamento de erros** com mensagens amigáveis
- **Estados de loading** para melhor UX

### ✅ Recursos de UX/UI

- **Design responsivo** para mobile, tablet e desktop
- **Animações suaves** e transições
- **Estados de loading** com spinners
- **Mensagens de erro** amigáveis
- **Paginação** intuitiva
- **Busca em tempo real** com debounce
- **Compartilhamento** de produtos via Web Share API

## 🛠️ Tecnologias Utilizadas

- **Angular 20.3.1** - Framework principal
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **RxJS** - Programação reativa
- **Angular Router** - Roteamento
- **Angular HttpClient** - Comunicação HTTP

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/           # Componente de navegação
│   │   ├── footer/           # Componente de rodapé
│   │   ├── product-list/     # Lista de produtos
│   │   ├── product-detail/   # Detalhes do produto
│   │   └── search-bar/       # Barra de pesquisa
│   ├── services/
│   │   └── product.ts        # Serviço para API de produtos
│   ├── models/
│   │   └── product.ts        # Interfaces TypeScript
│   ├── app.routes.ts         # Configuração de rotas
│   ├── app.config.ts         # Configuração da aplicação
│   ├── app.ts                # Componente principal
│   ├── app.html              # Template principal
│   └── app.scss              # Estilos globais
├── styles.scss               # Estilos globais
└── main.ts                   # Ponto de entrada
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- pnpm (gerenciador de pacotes)
- Backend NestJS rodando na porta 3000

### Instalação

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm start
# ou
ng serve

# Acessar no navegador
http://localhost:4200
```

### Build para Produção

```bash
# Gerar build de produção
pnpm build
# ou
ng build

# Os arquivos serão gerados em dist/
```

## 🔗 Integração com API

A aplicação consome os seguintes endpoints da API:

### Endpoints Utilizados

- `GET /products` - Lista produtos com paginação
- `GET /products/search?term=xxx` - Busca produtos
- `GET /products/:id` - Detalhes do produto

### Parâmetros Suportados

- **Paginação**: `page`, `limit`
- **Ordenação**: `sortField`, `sortDirection`
- **Busca**: `term`

### Exemplo de Uso

```typescript
// Listar produtos com paginação
GET /products?page=1&limit=12&sortField=name&sortDirection=asc

// Buscar produtos
GET /products/search?term=notebook

// Detalhes do produto
GET /products/123e4567-e89b-12d3-a456-426614174000
```

## 🎨 Design System

### Cores Principais

- **Primary**: `#667eea` (Azul)
- **Secondary**: `#764ba2` (Roxo)
- **Success**: `#28a745` (Verde)
- **Warning**: `#ffc107` (Amarelo)
- **Danger**: `#dc3545` (Vermelho)

### Tipografia

- **Fonte**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Tamanhos**: 13px (mobile) → 16px (desktop)

### Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px

## 📱 Responsividade

A aplicação é totalmente responsiva com:

- **Grid adaptativo** para produtos
- **Menu colapsável** em mobile
- **Tipografia escalável**
- **Botões touch-friendly**
- **Imagens responsivas**

## 🔧 Configuração

### Variáveis de Ambiente

Para configurar a URL da API, edite o arquivo `src/app/services/product.ts`:

```typescript
private readonly apiUrl = 'http://localhost:3000/products';
```

### Personalização de Estilos

Os estilos podem ser personalizados através das variáveis CSS em `src/styles.scss`:

```scss
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  // ... outras variáveis
}
```

## 🧪 Testes

```bash
# Executar testes unitários
pnpm test
# ou
ng test

# Executar testes e2e
pnpm e2e
# ou
ng e2e
```

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm start          # ng serve
pnpm build          # ng build
pnpm test           # ng test
pnpm e2e            # ng e2e

# Linting
pnpm lint           # ng lint
pnpm format         # ng format
```

## 🚀 Deploy

### Build de Produção

```bash
# Gerar build otimizado
ng build --configuration production

# Os arquivos estarão em dist/catalogo-produtos-frontend/
```

### Servidor Web

Os arquivos podem ser servidos por qualquer servidor web estático:

- **Nginx**
- **Apache**
- **Vercel**
- **Netlify**
- **GitHub Pages**

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através de:

- **Email**: suporte@catalogoprodutos.com
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/catalogo-produtos/issues)

---

**Desenvolvido com ❤️ usando Angular e NestJS**