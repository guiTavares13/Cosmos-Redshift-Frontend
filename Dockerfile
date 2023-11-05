# Use a imagem base do Python
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /front

# Copie os arquivos do seu projeto para o contêiner
COPY public/ /front/public
COPY src/ /front/src
COPY package.json/ /front

RUN npm install

# Comando para executar aplicação
CMD ["npm", "start"]