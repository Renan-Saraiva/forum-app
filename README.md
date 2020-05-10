# ForumApp

Este é um forum para discussões

## Pré-Requisitos e Configurações

- Ter instalado o node.
- Ter instalado o npm.
- Ter configurado o arquivo ./src/assets/config/config.json com a URL da API, abaixo segue um exemplo de configuração

```
{    
    "forumApi" : {
        "url": "http://localhost:8080/api"
    }
}
```

- A API pode ser encontrada neste repositório.

## Executar

- Com o terminal de sua preferencia entra na pasta raiz do projeto
- Execute o comando `npm install` para instalar todas as dependencias
- Execute o comando `npm run start` para iniciar a aplicação
- Por default a aplicação estará rodando na porta 4200 (http://localhost:4200/)