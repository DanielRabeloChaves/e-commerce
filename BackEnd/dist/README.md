# Pasta `dist`

A pasta `dist` (abreviação de "distribution") contém os arquivos compilados do seu projeto TypeScript. Após a transpilação do código TypeScript para JavaScript, todos os arquivos de saída são colocados nesta pasta. Este processo é essencial para que o código possa ser executado em ambientes que suportam apenas JavaScript, como Node.js.

## BUILD
Para realizar o build é necessario executar o comando ( npm run build ).

## Estrutura da Pasta

Após a compilação, a estrutura da pasta `dist` deve refletir a estrutura do seu código fonte TypeScript. Por exemplo:
```
dist/
├── controllers/
│ ├── UserController.js
│ └── ...
├── models/
│ ├── UserModel.js
│ └── ...
├── routes/
│ ├── userRoutes.js
│ └── ...
├── services/
│ ├── userService.js
│ └── ...
├── config/
│ ├── config.js
│ └── ...
└── index.js
└── app.js
└── server.js
```
## Propósito

A pasta `dist` serve como o diretório de saída para os arquivos JavaScript transpilados, que são necessários para a execução do projeto no ambiente Node.js. Durante o desenvolvimento, você escreve código em TypeScript por causa dos benefícios adicionais que ele oferece, como tipagem estática e recursos de última geração. No entanto, para que o código possa ser executado, ele deve ser convertido em JavaScript.

## Processo de Compilação

Para compilar o seu código TypeScript para JavaScript, você geralmente usa o comando tsc mas para esse projeto em especifico esta configurado para ser executado pelo comando npm run build.
Este comando utiliza o compilador TypeScript (tsc) para transpilar todos os arquivos .ts para .js e coloca os arquivos resultantes na pasta dist, conforme especificado nas configurações do seu tsconfig.json.

O arquivo tsconfig.json contém as configurações para o compilador TypeScript. Aqui está um exemplo básico:
```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

## Uso em Produção

Na maioria dos casos, apenas a pasta dist e outras dependências necessárias são implantadas em um ambiente de produção. Isso garante que apenas o código necessário para a execução esteja presente, melhorando a segurança e a eficiência.

## Manutenção

Certifique-se de limpar e recompilar o diretório dist regularmente, especialmente antes de implantar seu aplicativo, para garantir que ele contenha apenas os arquivos mais recentes e relevantes. Isso garantirá que você esteja sempre trabalhando com a versão mais atualizada do seu código transpilado. Antes de utilizar npm start e importante compilar o projeto novamente para pegar as alterações mais recente.