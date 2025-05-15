# Guia de Inicialização do Sistema

Este guia fornece um passo a passo para iniciar o sistema em seu ambiente local. Siga as instruções abaixo para configurar e executar o aplicativo.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **Node.js:** (Certifique-se de ter uma versão LTS instalada)
* **npm:** (Geralmente instalado com o Node.js)
* **Yarn:** (Pode ser instalado globalmente com `npm install --global yarn`)
* **Docker:** (Certifique-se de que o Docker esteja instalado e em execução)
* **Docker Compose:** (Geralmente instalado com o Docker Desktop)

## Passo a Passo para Iniciar o Sistema

1.  **Instalar o Yarn:**
    Abra seu terminal e execute o seguinte comando para instalar o Yarn globalmente, caso ainda não o tenha:
    ```bash
    npm install --global yarn
    ```

2.  **Instalar as Dependências:**
    Navegue até o diretório raiz do projeto em seu terminal e execute o seguinte comando para instalar todas as dependências listadas no arquivo `package.json`:
    ```bash
    yarn add
    ```

3.  **Configurar o Arquivo `.env`:**
    Na raiz do projeto, você encontrará um arquivo chamado `.env.example`.
    * Duplique este arquivo e renomeie a cópia para `.env`.
    * Abra o arquivo `.env` em um editor de texto e configure as variáveis de ambiente de acordo com as necessidades do seu sistema (por exemplo, configurações de banco de dados, chaves de API, etc.).

4.  **Subir a Imagem do Docker:**
    Certifique-se de que o Docker esteja em execução em sua máquina. No terminal, ainda no diretório raiz do projeto, execute o seguinte comando para construir e iniciar os contêineres definidos no arquivo `docker-compose.yml`:
    ```bash
    docker-compose up -d
    ```
    O flag `-d` executa os contêineres em segundo plano.

5.  **Executar Migrações do Prisma:**
    Após a inicialização do Docker e do banco de dados (se aplicável), execute o seguinte comando para aplicar as migrações definidas no seu schema do Prisma ao banco de dados:
    ```bash
    npx prisma db push
    ```

6.  **Gerar o Client do Prisma:**
    Em seguida, execute o seguinte comando para gerar o Prisma Client, que é uma interface de consulta de banco de dados auto-gerada:
    ```bash
    npx prisma generate
    ```

7.  **Acessar a Documentação do Swagger:**
    Após a conclusão de todos os passos acima, o sistema deverá estar em execução. A documentação da API pode ser acessada através do Swagger na seguinte URL em seu navegador:
    ```
    http://localhost:3000/docs
    ```

Agora você pode começar a interagir com o sistema seguindo a documentação do Swagger!