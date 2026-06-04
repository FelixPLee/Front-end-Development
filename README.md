# 🎬 Estrelando

O **Estrelando** é uma aplicação web (Single Page Application) desenvolvida em React para o registro e organização de séries assistidas. O sistema permite que o usuário gerencie seu catálogo pessoal, adicionando detalhes sobre cada série, como categoria e um histórico dinâmico de temporadas com dados de direção, produtora e datas de visualização.

---

## 🎓 Identificação do Aluno

* **Nome:** Felix Pinheiro Lee
* **Curso:** Análise e Desenvolvimento de Sistemas
* **Instituição:** PUCRS (Pontifícia Universidade Católica do Rio Grande do Sul)
* **Disciplina:** Desenvolvimento de Sistemas frontend

---

## 🚀 Como Rodar a Aplicação

Para executar este projeto localmente na sua máquina, siga os passos abaixo. Você precisará ter o [Node.js](https://nodejs.org/) instalado.

1. **Abra o terminal** e navegue até a pasta raiz do projeto.
2. **Instale as dependências** do projeto (incluindo o `react-router-dom`) executando o comando:
    ```bash
    npm install
    ```
3. **Inicie o servidor de desenvolvimento** com o comando:
    ```bash
    npm start
    ```
4. A aplicação será aberta automaticamente no seu navegador padrão no endereço `http://localhost:3000`.

---

## 🧩 Descrição dos Componentes

A aplicação foi componentizada seguindo as melhores práticas do React, dividida nas seguintes estruturas principais:

* **`App` (Principal):** Responsável por abrigar o `BrowserRouter` e gerenciar as rotas (`Routes` e `Route`) da aplicação, definindo qual página deve ser renderizada de acordo com a URL.
* **`NavBar`:** Elemento de navegação global, renderizado no topo de todas as páginas. Fornece links instantâneos (`react-router-dom Link`) para a Home, Sobre, Lista e Formulário.
* **`Home`:** Página de apresentação inicial. Contém uma mensagem de boas-vindas e atalhos rápidos (botões estilizados) para as principais ações do usuário.
* **`Sobre`:** Componente informativo que detalha o propósito da aplicação. Utiliza um layout alternado com imagens explicativas sobre o funcionamento do `SerieForm` e do `SerieList`.
* **`SerieForm`:** O núcleo de entrada e visualização de dados. Gerencia estados complexos, permitindo registrar a série e aninhar dinamicamente campos de temporadas. Opera em três modos distintos baseados em parâmetros de URL (`useSearchParams`):
  * **Criação:** Formulário limpo para nova inserção.
  * **Edição (`?edit=id`):** Carrega os dados da série para atualização.
  * **Visualização (`?view=id`):** Carrega os dados em modo *somente leitura* (disabled), protegendo as informações contra edições acidentais, com um botão dedicado para transitar para o estado de edição.
* **`SerieList`:** Interface de visualização do catálogo. Lê os dados persistidos no `localStorage` e os renderiza em uma tabela. Fornece botões interativos para visualizar os detalhes da série, acessar a edição ou deletá-la através de um modal de confirmação.

---

## 🛠️ Tecnologias Utilizadas

* **React (Create React App):** Biblioteca base para a construção das interfaces.
* **React Router Dom:** Gerenciamento das rotas internas e manipulação de Search Params (Query Strings).
* **LocalStorage API:** Persistência de dados local diretamente no navegador do usuário.
* **CSS3:** Estilização desenvolvida do zero, utilizando Flexbox para responsividade e uma paleta de cores personalizada.

---

## 📸 Prints da Aplicação

*(Substitua os caminhos abaixo pelas imagens reais da sua aplicação rodando)*

### 1. Página Inicial (Home)
![Print da Home](./src/assets/figures/print_home.png)
*Tela de boas-vindas com atalhos para as funcionalidades principais.*

### 2. Tabela de Coleção (SerieList)
![Print da Lista](./src/assets/figures/print_lista.png)
*Gerenciamento das séries com opções de visualização, edição e exclusão de registros.*

### 3. Visualização e Registro (SerieForm)
![Print do Formulário](./src/assets/figures/print_form.png)
*Interface adaptável que atua tanto para o cadastro de múltiplas temporadas quanto para a leitura segura dos dados salvos.*

### 4. Sobre o Projeto
![Print do Sobre](./src/assets/figures/print_sobre.png)
*Página descritiva demonstrando a arquitetura da plataforma.*