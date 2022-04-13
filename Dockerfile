FROM node:14.7-slim AS builder

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "run", "start:dev"]