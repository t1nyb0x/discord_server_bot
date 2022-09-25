FROM node:16.17.0-alpine3.16

WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm ci

EXPOSE 8080
CMD ["npm", "start"]
