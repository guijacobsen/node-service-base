## Node servvice base

Serviço node com estrutura padrão para projetos

Código sem typescript, o mesmo será disponibilizado em outro repositório posteriormente.

#

O objetivo principal é obter de forma simples um serviço em node contendo uma estrutura básica, poupando tempo em novos projetos.

O projeto contém:

- [Express](https://expressjs.com/pt-br/)
- ORM com [sequelize](https://sequelize.org/)
- JWT
- .env básico
- [Docker](https://www.docker.com/) para instância de banco de dados

### Executando

Para rodar o servço, será necessário ter o docker instalado no sistema
Em sequida:

1. Rode no termindal `docker-compose up -d` para criação do banco de dados
2. Veja as opções de execução do sequelize no arquivo `package.json`, para inicar do zero você pode rodar `npm run db:reset`
   - Esse comando irá zerar a base de dados, rodar as migrations e as seeds.
3. `npm run dev` para rodar em modo desenvolvimento com [Nodemon](https://www.npmjs.com/package/nodemon) OU `npm start` para executar build do projeto

Obs: Se preferir pode utilizar o `yarn` (https://yarnpkg.com/) no lugar de `npm run`.
