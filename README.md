# ShopDemo Web

Aplicação de e-commerce fictícia criada como app de apoio para um **curso de BDD com Playwright e TypeScript** (Cucumber / playwright-bdd).

O foco é ser **previsível, determinístico e fácil de automatizar**: todos os elementos interativos têm `data-testid` estáveis, não há chamadas de rede externas, e o comportamento é controlado por dados mockados estáticos.

---

## Tecnologias

- **React 18** + **Vite**
- **TypeScript** (strict mode)
- **React Router v6**
- CSS puro (sem framework de UI)
- Estado: Context API
- Persistência: `localStorage` (sessão de login)

---

## Instalação e execução

### Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

### Instalar dependências

```bash
npm install
```

### Rodar em modo de desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

### Gerar build de produção

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist/`, prontos para deploy em Vercel, Netlify ou GitHub Pages.

### Verificar o build localmente

```bash
npm run preview
```

---

## Credenciais de acesso (mock)

| E-mail | Senha |
|---|---|
| `cliente@shopdemo.com` | `senha123` |
| `joao@shopdemo.com` | `senha456` |

---

## Páginas e rotas

| Rota | Página | Descrição |
|---|---|---|
| `/login` | Login | Autenticação (rota pública) |
| `/` | Catálogo | Lista de produtos com busca e filtro por categoria |
| `/produto/:id` | Detalhe do produto | Informações completas e adição ao carrinho |
| `/carrinho` | Carrinho | Gerenciamento dos itens, quantidades e remoção |
| `/checkout` | Checkout | Cupom, cálculo de frete e pagamento por cartão |
| `/confirmacao` | Confirmação | Número do pedido e resumo pós-compra |

Todas as rotas exceto `/login` são protegidas — o usuário é redirecionado para o login se não estiver autenticado.

---

## Documentação para automação de testes

| Arquivo | Descrição |
|---|---|
| [TESTIDS.md](./TESTIDS.md) | Lista completa de `data-testid` por página, para uso nos seletores Playwright |
| [CENARIOS-DE-TESTE.md](./CENARIOS-DE-TESTE.md) | Valores especiais (cupons, CEPs, cartões, produtos) e comportamento esperado de cada um |

---

## Estrutura do projeto

```
src/
├── context/
│   ├── AuthContext.tsx       # Autenticação (login/logout)
│   └── CarrinhoContext.tsx   # Estado do carrinho
├── data/
│   ├── cupons.ts             # Cupons mockados e lógica de validação
│   ├── frete.ts              # Faixas de frete por prefixo de CEP
│   ├── pagamento.ts          # Simulação de processamento de cartão
│   ├── produtos.ts           # Catálogo de produtos
│   └── usuarios.ts           # Usuários para login
├── components/
│   ├── Layout.tsx            # Header, footer e estrutura da página
│   ├── ProtectedRoute.tsx    # Guard de rota autenticada
│   └── ProdutoCard.tsx       # Card do produto no catálogo
├── pages/
│   ├── Login.tsx
│   ├── Catalogo.tsx
│   ├── ProdutoDetalhe.tsx
│   ├── Carrinho.tsx
│   ├── Checkout.tsx
│   └── Confirmacao.tsx
├── App.tsx                   # Roteamento principal
├── main.tsx                  # Entry point React
└── index.css                 # Estilos globais
```

---

## Notas para automação

- **Sem delays artificiais** — elementos aparecem imediatamente, sem animações ou loading states que possam exigir waits extras.
- **Dados determinísticos** — o catálogo, cupons, frete e regras de pagamento são fixos a cada execução.
- **Estoque** — `p5` (Sandália) tem estoque 0. `p3` (Moletom) tem estoque 2. Use esses produtos para testar cenários de indisponibilidade.
- **Contador de pedidos** — reinicia em `PED-1001` a cada reload da página. Garanta que cada teste executa o fluxo completo sem depender de pedidos anteriores.
