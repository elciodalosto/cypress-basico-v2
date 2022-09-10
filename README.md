# cypress-basico-v2

Este projeto é um fork do curso de nível básico do professor Walmyr Filho, que utilizamos para estudar os recursos básicos do framework de testes Cypress, para realizar testes end to end em uma aplicação web simples, tanto em desktop quanto em versão mobile(repsonsiva).

O curso encontra-se disponível na Udemy a um valor bem acessível. Recomendo fortemente para quem for estudante de teste de software. 

Comprei este curso há meses atrás e deixei ele parado, sem iniciar por achar que não tinha tempo livre para o curso, então passei alguns meses tentando estudar sozinho, pegando material solto na internet e quando finalmente parei para iniciar o curso, percebi que eu poderia ter poupado muito mais do meu tempo se eu tivesse realizado este curso antes, pois as dicas dadas aqui são valiosíssimas e resolvem vários problemas do dia-a-dia para quem atua como QA e utiliza o Cypress como framework de testes.

## Pré-requisitos

Para instalar o projeto, é necessário ter o Node.js instalado em seu dispositivo. 
A instalação do Node.js já traz consigo o gerenciador de pacotes NPM, que é utilizado para gerenciar/instalar/desinstalar os pacotes de bibliotecas de dependências do projeto.

> Neste projeto foi utilizado a versão `v16.16.2` do Node.js e `8.15.0` do npm.

## Instalação

Após clonar o projeto do github, acesse a raíz do projeto pelo seu terminal, no nível onde se encontram os arquivos package.json, cypress.json, README.md e outros...

Digite: `npm install` (ou simplesmente `npm i`) para o NPM instalar as dependências necessárias.
Como o NPM sabe quais são as dependências?
Elas estão descritas dentro do arquivo package.json do projeto, dentro do atributo "devDependencies".

## Testes

Para finalmente executar os testes, você pode digitar no seu terminal os seguintes comandos:

Digite: `npm run test` ou somente `npm test` (ou `npm t`) para executar o projeto em 'headless mode', ou seja, sem a interface visual dos testes, somente via terminal.
ou
Digite `npm run cy:open` to open Cypress in interactive mode.
Para executar o projeto na versão mobile (410x860):
Digite: `npm run open:mobile` para executar o projeto com interface gráfica em modo Mobile(responsivo)
Digite: `npm run run:mobile` para executar o projeto sem interface gráfica em modo Headless


Todos os créditos deste projeto são do autor do projeto original, Walmyr Filho.

___

This project was created with 💚 by [Walmyr](https://walmyr.dev).