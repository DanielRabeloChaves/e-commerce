# Use a imagem oficial do Node.js 20.15.0 como base
FROM node:20.15.0 

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /BackEnd

# Copie os arquivos de configuração e dependências
COPY package*.json ./
COPY tsconfig.json ./
COPY nodemon.json ./
COPY jest.config.js ./
COPY .sequelizerc ./
COPY src ./src
COPY dist ./dist
COPY __tests__ ./__tests__
COPY .env ./

# Instale as dependências do npm
RUN npm install

RUN npm install -g nodemon

# # Compile o TypeScript para JavaScript e execute o migrate do sequelize
# RUN npm run db:migrate

# Exponha a porta em que o aplicativo será executado
EXPOSE 3001

# Comando para executar o aplicativo compilado
CMD ["sh", "-c", "npm run build && npm run db:migrate && npm run dev"]