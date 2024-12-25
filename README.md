# Documented API

Este é um exemplo de API utilizando Fastify com documentação Swagger.

## Estrutura do Projeto

```
documented-api/ 
    ├── package.json 
    ├── pnpm-lock.yaml 
    ├── src/ 
    │   ├── server.ts 
    |   └── sumRoute.ts 
    └── tsconfig.json
```

## Instalação

1. Clone o repositório:
    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd documented-api
    ```

2. Instale as dependências:
    ```sh
    pnpm install
    ```

## Executando o Servidor

Para iniciar o servidor em modo de desenvolvimento, execute:

```sh
pnpm run dev
```

O servidor estará rodando em http://localhost:3333.

Endpoints

/sum

Endpoint para somar dois números.

- Método: GET
- Query Parameters:
    - a (number): Primeiro número.
    - b (number): Segundo número.
- Resposta:
    - 200 OK: Retorna um objeto com o resultado da soma.

Documentação da API

/docs

A documentação da API está disponível em http://localhost:3333/docs.

Tecnologias Utilizadas
- Fastify
- Swagger
- Zod

Licença

Este projeto está licenciado sob a licença ISC.

## Executar os testes (com coverage)

```sh
pnpm run test
```
