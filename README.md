# Teste Full Stack(Nestjs/Nextjs) - Caixa Eletrônico

## Objetivo

Desenvolva um programa que simule a entrega de notas quando um cliente efetuar um saque em um caixa eletrônico.

## Requisitos  

- Entregar o menor número de notas;
- É possível sacar o valor solicitado com as notas disponíveis;
- Saldo do cliente  R$ 10.000;
- Quantidade de notas infinito (pode-se colocar um valor finito de cédulas para aumentar a dificuldade do problema);
- Notas disponíveis de  R$ 100,00;  R$ 50,00;  R$ 20,00 e  R$ 10,00;
- Validação de saldo disponível;
- Gerenciamento da conta (saldo e saques).

## Exemplos

- Valor do Saque:  R$ 30,00 – Resultado Esperado: Entregar 1 nota de R$ 20,00 e 1 nota de R$ 10,00.
- Valor do Saque:  R$ 80,00 – Resultado Esperado: Entregar 1 nota de R$ 50,00 1 nota de R$ 20,00 e 1 nota de   10,00.


## Requisitos


- Desenvolver um programa conforme o desafio detalhado acima;
- Considere a criação de uma arquivo readme.md para descrever como implantar e executar a aplicação;
- Considere utilizar boas práticas de desenvolvimento de software como TDD;
- Criar uma API em NodeJS com MongoDB;
- Criar um Cliente com a tecnologia de livre escolha;
- Requerido Implementar tudo em ES6;
- Colocar o código no GITHUB e nos mandar a URL;
- Arquitetura, Frameworks, organização de arquivos e Endpoints da API estão livres para
implementar conforme julgar mais adequado;

### Itens a serem avaliados:
- Cobertura dos testes unitários;
- Organização das responsabilidade;
- Estrutura do Código;
- Código Limpo.


## Instalação

```bash
# dentro da pasta backend e depois frontend
$ npm install
```

## Subir aplicação

```bash
# dentro da pasta backend
$ docker-compose up -d
 
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

```bash
# dentro da pasta frontend
npm run dev 
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```