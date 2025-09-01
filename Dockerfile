FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:20-alpine AS build
WORKDIR /app
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
COPY . .
COPY --from=deps /app/node_modules /app/node_modules
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
CMD ["npm", "run", "start"]
