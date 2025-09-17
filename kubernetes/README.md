# Kubernetes Deployment - Catálogo de Produtos

Este diretório contém os arquivos para executar a aplicação no Kubernetes.

## Arquivos

- **`catalogo-app.yaml`** - Manifests do Kubernetes (funciona em qualquer Kubernetes)
- **`deploy.sh`** - Script automatizado para build e deploy (**Linux apenas**)

## Compatibilidade

### Linux
- k3s, minikube, ou qualquer Kubernetes
- Script `deploy.sh` funciona normalmente

### Windows
- **Docker Desktop** (recomendado): Use apenas `kubectl apply -f catalogo-app.yaml`
- **WSL2 + k3s**: Use o script normalmente dentro do WSL2
- **minikube**: Use apenas os manifests YAML

## Pré-requisitos

**Linux:**
- k3s instalado e rodando
- Docker instalado
- kubectl configurado

**Windows:**
- Docker Desktop com Kubernetes habilitado OU WSL2 + k3s
- kubectl configurado

## Deploy Rápido

```bash
./deploy.sh
```

## Deploy Manual

1. Construir imagens:
```bash
docker build -t catalogo-backend:latest ../back-end/
docker build -t catalogo-frontend:latest ../front-end/
```

2. Importar para k3s:
```bash
docker save catalogo-backend:latest | sudo k3s ctr images import -
docker save catalogo-frontend:latest | sudo k3s ctr images import -
```

3. Aplicar manifests:
```bash
kubectl apply -f catalogo-app.yaml
```

## Acesso

- Frontend: http://localhost:30080

## Comandos Úteis

```bash
# Ver pods
kubectl get pods -n catalogo-produtos

# Ver logs
kubectl logs -f deployment/backend -n catalogo-produtos
kubectl logs -f deployment/frontend -n catalogo-produtos

# Deletar tudo
kubectl delete namespace catalogo-produtos
```

## Recursos Criados

- Namespace: `catalogo-produtos`
- 3 Deployments: MySQL, Backend (NestJS), Frontend (Angular)
- 3 Services: mysql-service, backend-service, frontend-service
- Secret para senhas do banco
- ConfigMap para configurações
- PersistentVolumeClaim para dados do MySQL