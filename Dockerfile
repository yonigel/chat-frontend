
FROM node:11.1.0-alpine

WORKDIR /server

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD npm start

