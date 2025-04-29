FROM node:22.14.0 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate

FROM base AS api
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

FROM base AS migration
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed"]