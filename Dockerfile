FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
ENV NODE_ENV=production
ENV NEXT_PUBLIC_TAXLY_API=https://master.dev.taxly.com.br

COPY --from=builder /usr/src/app/.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start"]