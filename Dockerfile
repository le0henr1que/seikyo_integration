FROM node:latest

WORKDIR /src

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]