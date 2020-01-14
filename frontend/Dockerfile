# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:latest as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

ARG configuration=prod

RUN npm run build -- --${configuration} --output-path=./dist/out

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf
