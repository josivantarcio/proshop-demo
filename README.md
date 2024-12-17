# ProShop

ProShop é uma aplicação de eCommerce desenvolvida com o **MERN stack** (MongoDB, Express, React, Node.js). O projeto é uma solução completa para lojas virtuais, com funcionalidades robustas de backend e frontend.

## 📋 Funcionalidades

- **Cadastro e Login de Usuários** (com autenticação JWT).
- **Gerenciamento de Produtos** (CRUD completo para produtos).
- **Carrinho de Compras**.
- **Pagamentos via PayPal**.
- **Sistema de Notificações** usando **react-toastify**.
- **Gerenciamento de Banco de Dados** com **MongoDB**.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: React, React Toastify, PayPal Integration.
- **Backend**: Node.js, Express, Mongoose, JWT para autenticação.
- **Banco de Dados**: MongoDB.
- **Ferramentas Adicionais**: bcryptjs, dotenv, cookie-parser, colors.
- **Desenvolvimento**: Nodemon e Concurrently.

---

## 📂 Estrutura do Projeto

```plaintext
proshop/
│
├── backend/
│   ├── server.js          # Arquivo principal do backend
│   ├── seeder.js          # Script para importar ou destruir dados no banco
│   ├── config/            # Configurações do banco e dotenv
│   ├── models/            # Modelos do banco de dados (Mongoose)
│   ├── routes/            # Rotas do backend
│   ├── controllers/       # Lógica de controle para rotas
│   └── utils/             # Utilitários como gerador de tokens
│
├── frontend/
│   ├── public/            # Arquivos públicos
│   ├── src/
│       ├── components/    # Componentes React reutilizáveis
│       ├── screens/       # Páginas principais da aplicação
│       ├── App.js         # Arquivo principal do React
│       └── index.js       # Ponto de entrada do frontend
│
├── .env                   # Variáveis de ambiente
├── package.json           # Configurações e dependências
└── README.md              # Documentação do projeto
```

---

## 🛠️ Instalação e Execução

### Pré-requisitos

- **Node.js** instalado (versão 14 ou superior recomendada)
- **MongoDB** instalado ou acesso a uma instância MongoDB

### Passo a Passo

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/seu-usuario/proshop.git
   cd proshop
   ```

2. **Configurar o Backend**:
   - Crie um arquivo `.env` na pasta raiz com as variáveis:
     ```env
     PORT=5000
     MONGO_URI=seu_banco_mongodb
     JWT_SECRET=seu_segredo_jwt
     PAYPAL_CLIENT_ID=seu_paypal_client_id
     ```

3. **Instalar Dependências**:
   ```bash
   npm install
   cd frontend && npm install
   ```

4. **Rodar o Projeto**:
   - **Ambiente de Desenvolvimento**:
     ```bash
     npm run dev
     ```
   - **Somente Backend**:
     ```bash
     npm run server
     ```
   - **Somente Frontend**:
     ```bash
     npm run client
     ```

5. **Importar Dados** (Opcional):
   - Carregar dados de exemplo no MongoDB:
     ```bash
     npm run data:import
     ```
   - Apagar dados do banco:
     ```bash
     npm run data:destroy
     ```

---

## 🔑 Variáveis de Ambiente

As seguintes variáveis de ambiente são usadas no projeto:

| Variável           | Descrição                              |
|--------------------|----------------------------------------|
| `PORT`            | Porta para rodar o servidor backend    |
| `MONGO_URI`       | String de conexão com MongoDB          |
| `JWT_SECRET`      | Segredo usado para assinar JWT         |
| `PAYPAL_CLIENT_ID`| Client ID da conta PayPal para pagamentos |

---

## 🧪 Testes

No momento, testes unitários não estão incluídos. Você pode adicionar ferramentas como **Jest** ou **Mocha** para testagem de backend e frontend.

---

## 📜 Licença

Este projeto é licenciado sob a licença **MIT**.

---

## 🧑‍💻 Autor

Desenvolvido por **Josevan Oliveira** - [DatalifeBrazil](https://github.com/username).

---
