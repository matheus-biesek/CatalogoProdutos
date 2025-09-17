FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build --configuration=production

FROM nginx:alpine

COPY --from=build /app/dist/catalogo-produtos-frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]