
# Search Frontend - Desafio

Este projeto é uma interface de busca de produtos que consome a API do Mercado Livre, desenvolvida como parte de um desafio. A aplicação permite que os usuários pesquisem por produtos, vejam uma lista de resultados paginada e cliquem em um produto para ver mais detalhes.


## 🚀 Como Executar a Aplicação

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Um gerenciador de pacotes como npm ou yarn

### Instalação e Configuração

Clone o repositório e instale as dependências:

```bash
# Clone o repositório
git clone https://github.com/julio-cesar96/search-frontend

# Navegue até a pasta do projeto
cd search-frontend

# Instale as dependências
npm install
# ou
yarn install
```

### Configure as Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto, copiando o conteúdo abaixo:

```env
# Define se a aplicação deve usar dados mockados (ótimo para desenvolvimento offline)
# Mude para "false" para usar a API real do Mercado Livre
VITE_USE_MOCKS=true
```

> Por padrão, o projeto está configurado para usar dados mockados (`VITE_USE_MOCKS=true`). Isso permite que a aplicação seja executada sem a necessidade de um token de acesso válido, facilitando a avaliação e os testes.

## ▶️ Executando o Projeto

Após a instalação e configuração, inicie o servidor de desenvolvimento com o comando:

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:5173.

---
## Rodando os testes do projeto

```bash
npm run test
```


## 🛠️ Decisões de Arquitetura e Tecnologia

Aqui estão algumas das principais decisões técnicas tomadas durante o desenvolvimento e as razões por trás delas.

### Stack Principal: React, TypeScript e Vite

- **React com TypeScript:** Optei por esta combinação para criar uma interface de usuário reativa e componentizada, com a segurança e a manutenibilidade que a tipagem estática do TypeScript oferece.
- **Vite:** Foi escolhido como a ferramenta de build pela sua incrível velocidade de desenvolvimento (HMR - Hot Module Replacement) e configuração simplificada, o que acelera significativamente o ciclo de desenvolvimento.

### Gerenciamento de Estado do Servidor com TanStack Query

Para gerenciar o estado que vem da API (buscas, detalhes de produtos), optei por usar o **TanStack Query (React Query)**.  
Em vez de controlar manualmente estados de `loading`, `error` e `data` com `useState` e `useEffect`, a biblioteca abstrai essa complexidade.  
Ela simplifica o cache de dados, a invalidação e o refetching automático, tornando o código mais limpo, declarativo e resiliente, como pode ser visto nos hooks customizados em `src/hooks/useProducts.ts`.

### Estilização com Tailwind CSS

A decisão de usar **Tailwind CSS** foi para agilizar a estilização.  
Por ser um framework utility-first, ele me permitiu construir layouts complexos diretamente no JSX, sem a necessidade de escrever CSS customizado.  
Isso aumenta a produtividade e mantém a consistência visual.  
A função utilitária `cn` (`src/utils/cn.ts`) foi criada para facilitar a aplicação de classes condicionais de forma limpa e organizada.

### Abstração da API e Mocking

Criei uma camada de abstração para a comunicação com a API do Mercado Livre.  
Existem duas implementações: `MercadoLivreApi` (real) e `MercadoLivreApiMock` (mock).  
Um "cliente" (`src/api/mercadoLivreApi.client.ts`) decide qual implementação usar com base na variável de ambiente `VITE_USE_MOCKS`.

Essa arquitetura foi pensada para:

- **Facilitar o desenvolvimento:** Permitir o trabalho no frontend sem depender da API externa.
- **Acelerar os testes:** Os testes unitários e de integração rodam contra os mocks, tornando-os mais rápidos e previsíveis.
- **Melhorar a manutenibilidade:** Isolar a lógica de acesso a dados, facilitando futuras alterações.

### Estrutura de Componentes UI

Os componentes foram divididos em `ui` e `shared`.  
- A pasta `src/components/ui` contém componentes de base, atômicos e genéricos (como `Button`, `Card`, `Input`), que são blocos de construção para o restante da aplicação.
- A pasta `src/components/shared` contém componentes que podem ser compartilhados (como `ImageCarousel`, `SearchForm`).

Essa abordagem promove o reuso e a consistência em toda a interface.

### Padrões Populares que usei do React

#### File-based design pattern
Organizei os meus arquivos por responsabilidade.

```
/src
  /components
    /ui
      /Box
        Box.tsx
        ...
    /shared
      SearchForm.tsx
  /hooks
  /__tests__
    useDocumentTitle.ts
    useProducts.ts
  /pages
  ...
  /routes
    AppRoutes.tsx
 ```

#### Separation of Concerns (SoC)

SeparEI componentes de UI de lógica (hooks personalizados), criando hooks como `useDocumentTitle` e `useProducts`. O hook `useProducts` quem questão encapsula o uso do React Query, o que deixa os componentes mais limpos.

#### Colocação de estado o mais próximo possível de quem usa
Evitei globalizar estado (como resultados da busca ou produto atual) desnecessariamente, como por exemplo, o resultado da busca pode estar somente na página de listagem e a descrição pode ser carregada via id na URL, sem precisar guardar estado global.

#### Controlled Components + Form Handling
- Input controlado;
- Submissão por tecla Enter ou botão;
- Redirecionamento via navigate('/search?query=xxx');

#### URL-driven state
Usei `React Router` para refletir o estado da busca na URL:

`/search?query=iphone`

Dessa forma, isso permite compartilhamento de links e reload sem perder o contexto. Por exemplo:

`/search?query=notebook` → React Query busca os resultados

`/product/MLB12345` → React Query busca o detalhe

React Query já cuida de cache, loading, error. E por isso optei por não usar `Zustand` ou `Context API`, pois o estado da aplicação está totalmente refletido na URL, o que torna a navegação mais previsível e simplifica o gerenciamento de estado. O `React Query` já cuida do cache e revalidação automática.


## 🚧 Nota Técnica sobre Autenticação e Consumo da API do Mercado Livre

Durante o desenvolvimento desta aplicação, encontrei um desafio técnico relacionado ao consumo da API pública do Mercado Livre.

### Contexto

- Configurei o fluxo de autenticação OAuth conforme documentado no [Mercado Livre Developers](https://developers.mercadolivre.com.br/pt_br/crie-uma-aplicacao-no-mercado-livre), incluindo:
  - Criação da aplicação no Dev Center.
  - Configuração de uma URL temporária de redirecionamento via ngrok.
  - Troca do código de autorização pelo access token usando Postman.
  - Envio do token no cabeçalho `Authorization` nas requisições.

### Problema encontrado

Apesar de obter o token de acesso corretamente, as chamadas para o endpoint de busca `/sites/MLB/search` retornam consistentemente o erro HTTP `403 Forbidden`. Algumas investigações e testes realizados:

- Verifiquei que o token está sendo enviado corretamente no cabeçalho `Authorization`.
- Testei o token via curl e Postman, obtendo sucesso em chamadas específicas, o que indica que o token é válido.
- Identifiquei que a API parece aplicar restrições de CORS e bloqueia requisições originadas de localhost ou via proxy durante o desenvolvimento local.
- Notei também que, embora o endpoint permita requisições públicas sem autenticação, no meu caso, a API está exigindo token, possivelmente devido a políticas de segurança.

### Alternativas tentadas

- Configurei proxy reverso via Vite, sem sucesso — o problema persistiu.
- Desenvolvi um backend básico com Next.js para realizar chamadas server-side, porém o erro se manteve mesmo após refazer configurações de token e criar múltiplas aplicações no Dev Center.
- Em ambos os casos, as requisições são bloqueadas por políticas da API relacionadas à origem e autenticação.

### Considerações finais

Devido às restrições técnicas relacionadas à autenticação e políticas de CORS da API do Mercado Livre, não foi possível consumir diretamente o endpoint de busca `/sites/MLB/search` durante o desenvolvimento.

Para contornar essa limitação, criei arquivos de mock internos à aplicação que simulam as respostas esperadas da API, baseados no contrato e estrutura oficial fornecidos pela documentação do Mercado Livre. Essa abordagem permitiu o desenvolvimento e teste completo da aplicação, garantindo consistência e independência da disponibilidade da API externa.

Em um cenário real de produção, a solução recomendada seria implementar um backend intermediário responsável pelas chamadas autenticadas à API do Mercado Livre, respeitando as regras de segurança e autenticação exigidas.
