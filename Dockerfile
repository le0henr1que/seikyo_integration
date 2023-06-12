FROM node:latest

WORKDIR /src

RUN npm install prisma -g

COPY . .

RUN npm install

RUN npm run build

run 

CMD ["npm", "start"]

# Adicione um script de inicialização personalizado
COPY wait-for-db.sh /src/wait-for-db.sh
RUN chmod +x /src/wait-for-db.sh

CMD ["/bin/bash", "-c", "/src/wait-for-db.sh && npm start"]