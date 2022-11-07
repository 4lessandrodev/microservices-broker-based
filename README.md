# Microservice

Testando a feature de microservice nestjs.
Este é um projeto simples com uma api cliente, um broker message e um microservice.
Existem apenas dois endpoints disponíveis. Um para criar uma mensagem e outro para obter todas as mensagens.

## Broker Based

![](docs/microservice-doc.png)


### Como rodar esse projeto

**Requisitos para rodar este projeto**

- docker
- docker-compose
- nodejs v14+
- npm
- yarn
- build essentials
- linux, gitbash ou wsl

---

Existe um arquivo Makefile com todos os comandos necessários 

Primeiro instale as dependências

```sh

$ make install

```

Em seguida faça o build

```sh

$ make build

```

Execute o projeto

```sh

$ make start

```

Caso deseje ver os logs execute o comando

```sh

$ make logs

# Or

$ make monit

```

Para parar a aplicação basta executar

```sh

$ make stop

```

---

## Objetivo

Demonstrar o uso de microservice em um modelo de pipeline

> Modelo teórico 

 Request --> [Api cliente] --> [Step 1] --> [Gateway] --> [Step 2] --> [Gateway] --> [Step 3] --> Response

---
### Recursos do projeto

É possível criar uma mensagem com o endpoint 

`POST` criar uma mensagem

```sh

$ curl --location --request POST 'http://localhost:3000/gateway/buy' \
--header 'Content-Type: application/json' \
--data-raw '{
    "product": "My item",
    "price": 999,
    "user": "Jane"
}
'

```

---

`GET` listar todos os pagamentos

```sh

$ curl --location --request GET 'http://localhost:3000/gateway/payments' \
--header 'Content-Type: application/json' \
--data-raw ''

```

`GET` listar todos as notas

```sh

$ curl --location --request GET 'http://localhost:3000/gateway/invoices' \
--header 'Content-Type: application/json' \
--data-raw ''

```

`GET` listar todos os pacientes

```sh

$ curl --location --request GET 'http://localhost:3000/gateway/patients' \
--header 'Content-Type: application/json' \
--data-raw ''

```

`GET` obter status do pagamento

```sh

$ curl --location --request GET 'http://localhost:3000/gateway/step/408354c9-1540-4e8f-889b-0d4b64116740' \
--header 'Content-Type: application/json' \
--data-raw ''

```
