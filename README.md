### Como testar a API

1. Clone o repositório, entre em cada pasta e execute o seguinte comando:

```
yarn install
```

2. Insira o comando do docker para criar a imagem e depois execute a query (segunda linha) para a criação do banco de dados

```
docker run -i --name gympoint -d -p 127.0.0.1:3306:3306 -e MYSQL_ROOT_PASSWORD=root -t cytopia/mariadb-10.2

CREATE DATABASE `gympoint_development`
```

3. Ao entrar no backend execute:

```
yarn sequelize db:migrate
yarn sequelize db:seed:all
```

### Endpoints disponíveis

```
-Privates

 /students - POST;
 /students - GET;
 /students/:id - GET;
 /students/:id - DELETE;
 /students/:id - PUT

 /planos - POST
 /planos - GET
 /planos/:id - GET
 /planos/:id - DELETE
 /planos/:id - PUT

 /matriculas - POST
 /matriculas - GET
 /matriculas/:id - GET
 /matriculas/:id - DELETE
 /matriculas/:id - PUT

 /help-orders/:id/answer - POST
 /help-orders - GET
 /help-orders/:id - GET

-Publics

/users/authenticate - POST
/students/mobile-authenticate/:id - POST

/students/:id/checkins - POST
/students/:id/checkins - GET

/students/:id/help-orders - POST
/students/:id/help-orders - GET
/students/:id/help-orders/:idHelpOrder - GET
```
