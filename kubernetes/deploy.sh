#!/bin/bash

# ===========================================
# SCRIPT DE DEPLOY PARA K3S - CATÁLOGO DE PRODUTOS
# ===========================================

echo "🚀 Iniciando deploy da aplicação Catálogo de Produtos no k3s..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para verificar se comando foi executado com sucesso
check_command() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ Erro: $1${NC}"
        exit 1
    fi
}

# 1. Verificar se k3s está rodando
echo -e "${YELLOW}📋 Verificando se k3s está rodando...${NC}"
kubectl cluster-info > /dev/null 2>&1
check_command "k3s está rodando"

# 2. Construir as imagens Docker
echo -e "${YELLOW}🔨 Construindo imagens Docker...${NC}"

# Backend
echo "Construindo imagem do backend..."
docker build -t catalogo-backend:latest ../back-end/
check_command "Imagem do backend construída"

# Frontend
echo "Construindo imagem do frontend..."
docker build -t catalogo-frontend:latest ../front-end/
check_command "Imagem do frontend construída"

# 3. Importar imagens para k3s
echo -e "${YELLOW}📦 Importando imagens para k3s...${NC}"
docker save catalogo-backend:latest | sudo k3s ctr images import -
check_command "Imagem backend importada para k3s"

docker save catalogo-frontend:latest | sudo k3s ctr images import -
check_command "Imagem frontend importada para k3s"

# 4. Aplicar manifests do Kubernetes
echo -e "${YELLOW}⚙️  Aplicando manifests do Kubernetes...${NC}"
kubectl apply -f catalogo-app.yaml
check_command "Manifests aplicados"

# 5. Aguardar pods ficarem prontos
echo -e "${YELLOW}⏳ Aguardando pods ficarem prontos...${NC}"
kubectl wait --for=condition=ready pod -l app=mysql -n catalogo-produtos --timeout=120s
check_command "MySQL está pronto"

kubectl wait --for=condition=ready pod -l app=backend -n catalogo-produtos --timeout=120s
check_command "Backend está pronto"

kubectl wait --for=condition=ready pod -l app=frontend -n catalogo-produtos --timeout=120s
check_command "Frontend está pronto"

# 6. Mostrar status final
echo -e "${GREEN}🎉 Deploy concluído com sucesso!${NC}"
echo ""
echo -e "${YELLOW}📊 Status dos pods:${NC}"
kubectl get pods -n catalogo-produtos

echo ""
echo -e "${YELLOW}🌐 Serviços disponíveis:${NC}"
kubectl get services -n catalogo-produtos

echo ""
echo -e "${GREEN}🔗 Acesse a aplicação em: http://localhost:30080${NC}"
echo ""
echo -e "${YELLOW}📝 Comandos úteis:${NC}"
echo "  - Ver logs do backend: kubectl logs -f deployment/backend -n catalogo-produtos"
echo "  - Ver logs do frontend: kubectl logs -f deployment/frontend -n catalogo-produtos"
echo "  - Ver logs do MySQL: kubectl logs -f deployment/mysql -n catalogo-produtos"
echo "  - Deletar tudo: kubectl delete namespace catalogo-produtos"