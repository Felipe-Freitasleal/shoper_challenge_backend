# **SHOPPER BACK END**

## **Front End**

https://github.com/Felipe-Freitasleal/shoper_challenge_frontend

## **Descrição**

Página desenvolvida como front-end como teste técnico para a empresa Shopper.

Este teste consiste no desenvolvimento de uma aplicação FullStack, com a criação de um banco de dados MySQL, consumo e consulta desse banco de dados com NodeJs, desenvolvimento de uma API para interação com o front-end e uma página no front-end.

Nesta página são renderizados os dados do banco de dados em tabelas, e é possível ao usuário atualizar o valor de algum produto pela entrada de seu código e novo valor em campos textuais, e clicando no botão "VERIFICAR".

Neste ponta é gerado uma requisição, através da API, para o banco de dados. Nesse processo, é feito a verificação dos dados inseridos. Caso esteja tudo correto, é renderizado um botão chamado "ATUALIZAR". Clicando neste botão a página será carregada e os dados atualizados serão renderizados na tabela. Caso algum dado esteja errado, uma mensagem de erro aparecerá na tela.

Para o Back-end, é necessário configurar sua variável de ambiente. Neste projeto foi usado a biblioteca dotenv(.env). Sâo usadas as variáveis "PORT", para sua porta de acesso de hospedagem local (localhost), e a "MYSQL_KEY", que é a sua senha de acesso ao ambiente do MySQL. A primeira variável é usada para indicar o localhost pelo Express, ela deve ser o número da porta de acesso local. A segunda é usada como a senha necessária para a conexão do NodeJs com o ambiente do banco de dados do MySQL.

## **Tecnologias utilizadas**

- Typescript
- SQL
- MySQL
- Express
- Node.js

## **Funcionalidades do Projeto**

- Acessar ao banco de dados do MySQL
- Ler as tabelas "products" e "packs"
- Modificar valores da coluna "sales_price" de algum item da tabela "products"
- Encontrar um produto específico a partir de sua PRIMARY KEY "code"
- Permitir ao cliente (front-end) fazer requisições para leitura e modificação do bando de dados

## **Como executar este Projeto**

```bash
 # Copie o link deste repositório e o clone em seu máquina usando o comando "git clone" em seu terminal.
 $ git clone link

 # Acesse o diretório deste projeto com o comando "cd" em seu terminal e instale as dependências necessárias com o comando "npm install".
 $ cd nome-do-diretório
 $ npm install

 # Crie na raiz do projeto o arquivo .env e faça as configurações indicadas na descrição deste projeto.
 $ //.env.example
 PORT= //seu localhost
 MYSQL_KEY="sua_senha_mysql"

 # Execute este projeto com o comando "npm run start" em seu terminal.
 $ npm run dev
```

## **Autor**

 <img style="height:250px" src="./src/assets/WhatsApp Image 2023-04-03 at 13.26.01.jpeg" alt="foto autor"/>

Felipe Freitas Leal

<a href="https://www.linkedin.com/in/felipe-freitas-leal/">Linkedin</a>
