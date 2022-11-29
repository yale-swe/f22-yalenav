FROM node:16.14
RUN mkdir -p /home/app
WORKDIR /home/app
COPY server ./server
COPY package.json .
RUN yarn install:server
EXPOSE 4000
WORKDIR /home/app/server
