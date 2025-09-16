FROM node:20-alpine AS development

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:20-alpine AS production

RUN npm install -g pnpm

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=development /app/dist ./dist

COPY --from=development /app/node_modules ./node_modules

# Alterar proprietário dos arquivos para o usuário não-root
RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 3000

CMD ["node", "dist/main"]