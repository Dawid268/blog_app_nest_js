FROM node:14 AS development
WORKDIR /blog_app_api/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
