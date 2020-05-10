# ForumApp

Este é um fórum para discussões

## Pré-Requisitos e Configurações

- Ter instalado o [node](https://nodejs.org/en/).
- Ter instalado o [npm](https://www.npmjs.com/).
- Ter configurado o arquivo [Config.json](https://github.com/Renan-Saraiva/forum-app/blob/master/src/assets/config/config.json) com a URL da API, abaixo segue um exemplo de configuração

```
{    
    "forumApi" : {
        "url": "http://localhost:8080/api"
    }
}
```

- A API pode ser encontrada [neste](https://github.com/Renan-Saraiva/forum-api) repositório.

## Executar

- Com o terminal de sua preferência entra na pasta raiz do projeto
- Execute o comando `npm install` para instalar todas as dependências
- Execute o comando `npm run start` para iniciar a aplicação
- Por default a aplicação estará rodando na porta [4200](http://localhost:4200/)

## Acesso

Atraves deste [link](https://renan-saraiva.github.io/forum-app/home) é possível acessar a aplicação. 

Pode ser que haja um delay no primeiro acesso, isso é devido pois o Heroku (local aonde a API está publicada) deixa a aplicação em Sleep Mode quando a mesma fica muito tempo sem receber requisições.
