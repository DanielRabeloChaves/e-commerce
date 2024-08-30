# E-COMMERCE

# Inicializar projeto:

## Documentação do Projeto com Docker Compose

Este projeto utiliza Docker Compose para gerenciar e orquestrar contêineres Docker para o banco de dados MySQL, backend e FrontEnd da aplicação. Assim permitindo definir e rodar aplicativos Docker multi-contêiner. O arquivo docker-compose.yml especifica a configuração dos serviços necessários para o projeto.

Estrutura do Arquivo ```docker-compose.yml```

```
version: '3.8'

services:
  mysqlDB:
    image: mysql:8.2
    environment:
      MYSQL_HOST: mysqlDB
      MYSQL_ROOT_PASSWORD: docker
      MYSQL_DATABASE: ecommerceDB
      MYSQL_USER: docker
      MYSQL_PASSWORD: docker
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build:
      context: ./BackEnd
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    volumes:
      - ./BackEnd:/BackEnd
      - /BackEnd/node_modules
    env_file:
      - ./BackEnd/.env
    depends_on:
      - mysqlDB
      
volumes:
  mysql_data:

```

## Como Utilizar Docker no Projeto

### Pré-requisitos
Docker e Docker Compose instalados na máquina.
*   [Download Docker-desktop](https://www.docker.com/products/docker-desktop/)

## Passos para Iniciar o Projeto

*   Clone o Repositório

```
git clone https://github.com/DanielRabeloChaves/e-commerce.git
cd e-commerce
```

*   Inicie os Contêineres com Docker Compose
Na raiz do projeto, execute o comando:
```
docker-compose up --build
```
Este comando irá construir as imagens Docker (se necessário) e iniciar os contêineres definidos no docker-compose.yml.

Acessar os Serviços
*   MySQL: O banco de dados estará acessível na porta 3306 da máquina host.
*   Backend: A aplicação backend estará acessível na porta 3001 da máquina host.

## Comandos Úteis

*   Parar os Contêineres
```docker-compose down```

*   Reiniciar os Contêineres
```docker-compose restart```

*   Verificar os Logs dos Contêineres
```docker-compose logs```

## Solução de Problemas
*   Erros de Conexão com o MySQL: Verifique se o contêiner do MySQL está rodando e se as variáveis de ambiente estão corretas.
*   Dependências do Backend: Certifique-se de que o volume node_modules está corretamente montado e que todas as dependências estão instaladas.
*   Logs de Erro: Utilize docker-compose logs para verificar mensagens de erro e depurar problemas.