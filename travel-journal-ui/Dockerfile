FROM node:18-alpine AS builder
WORKDIR /travel-journal-ui
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /travel-journal-ui/dist .
COPY nginx.conf /etc/nginx/
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
