# Documentação do Back-End: Arquitetura MVC com Node.js e TypeScript

## Visão Geral
Este projeto de back-end utiliza a arquitetura MVC (Model-View-Controller) com Node.js e TypeScript. A arquitetura MVC é uma abordagem de design que separa a aplicação em três componentes principais: Model, View e Controller. Isso facilita a manutenção e escalabilidade do código, permitindo uma clara separação de responsabilidades.

## src
Contém os arquivos principais de configuração e inicialização da aplicação.

### Models - Interfaces
Os Models representam a estrutura dos dados e são responsáveis por interagir diretamente com o banco de dados. Eles contêm as definições das entidades e os métodos para acessar e manipular esses dados. Alem de conter as interfaces que descrevem a estrutura dos dados usados na aplicação, facilitando o uso do TypeScript para tipagem estática.

### Services
Os Services contêm a lógica de negócios da aplicação. Eles são responsáveis por coordenar as operações entre os Controllers e os Models.

### Controllers
Os Controllers são responsáveis por lidar com as requisições do usuário, interagir com os Services e retornar a resposta apropriada. Eles atuam como intermediários entre as requisições HTTP e os serviços que contêm a lógica de negócios.

### Routes
As rotas definem os endpoints da API e associam esses endpoints aos métodos dos Controllers correspondentes.

### config
Contém arquivos de configuração que são usados em várias partes da aplicação.

![alt text](../Docs/Arquitetura/MVC.drawio.png)

## dist

A pasta `dist` (abreviação de "distribution") contém os arquivos compilados do seu projeto TypeScript. Após a transpilação do código TypeScript para JavaScript, todos os arquivos de saída são colocados nesta pasta. Este processo é essencial para que o código possa ser executado em ambientes que suportam apenas JavaScript, como Node.js. A pasta `dist` serve como o diretório de saída para os arquivos JavaScript transpilados, que são necessários para a execução do projeto no ambiente Node.js. Durante o desenvolvimento, você escreve código em TypeScript por causa dos benefícios adicionais que ele oferece, como tipagem estática e recursos de última geração. No entanto, para que o código possa ser executado, ele deve ser convertido em JavaScript.

# Como Rodar a Aplicação

## 1. Instalar as dependências:
*   npm install

## 2. Adicionar o arquivo .env na raiz do projeto do BackEnd
Esse arquivo vai conter as variaveis de ambiente para conexão com banco de dados, chaves de acesso de APIs e Hash de tokens. Segue estrutura desse arquivo:

```

DB_dialect=mysql
Ambient_Dev=true
Ambient_Language=pt-br

DB_host=mysqlDB
DB_user=docker
DB_password=docker
DB_database=ecommerceDB
DB_port=3306

EMAIL_USER=email@teste
EMAIL_PASS=password
EMAIL_HOST=host
EMAIL_PORT=465
EMAIL_SECURE=true

SECRETKEY_HASH=SECRETKEY_HASH

```

# Rodar projeto com DOCKER
*   docker-compose up --build

Este comando irá construir as imagens Docker (se necessário) e iniciar os contêineres definidos no docker-compose.yml.

# Se voce não usar o Docker utiliza os comandos abaixo:

## Compilar o TypeScript:
*   npm run build

## Executar migration para criação das tabelas no banco:
*   npm run db:migrate

## Rodar a aplicação:
*   npm run dev

## Criar Nova Migration
*   npx sequelize-cli migration:generate --name add-new-column-to-users

### Script disponiveis package.json

*   npm start: Inicia o projeto no ambiente de produção rodando somente o codigo ja copilado em JS na pasta dist.
*   npm run dev: Inicia a aplicação usando nodemon, que automaticamente reinicia o servidor sempre que há mudanças no código.
*   npm run build: Compila o código TypeScript para JavaScript usando o comando ```tsc```.
*   npm run test: Executa validação de testes unitarios e integração mostrando a cobertura de testes. 
*   npm run test-stress: Executa testes de performance utilizando o autocannon. Necessario rodar o npm start em outro terminal para rodar o test.
*   npm run db:migrate: Atualiza a base de dados com as tabelas e informações padroes para executar o projeto.
*   npm run db:rollback: Desfaz as alterações feitas no banco pelo comando acima ```db:migrate```.

## Uso em Produção

Na maioria dos casos, apenas a pasta dist e outras dependências necessárias são implantadas em um ambiente de produção. Isso garante que apenas o código necessário para a execução esteja presente, melhorando a segurança e a eficiência.

## Manutenção

Certifique-se de limpar e recompilar o diretório dist regularmente, especialmente antes de implantar seu aplicativo, para garantir que ele contenha apenas os arquivos mais recentes e relevantes. Isso garantirá que você esteja sempre trabalhando com a versão mais atualizada do seu código transpilado. Antes de utilizar npm start e importante compilar o projeto novamente para pegar as alterações mais recente.