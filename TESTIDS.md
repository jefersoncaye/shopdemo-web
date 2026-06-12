# TESTIDS.md — Referência de data-testid do ShopDemo Web

Este arquivo lista todos os atributos `data-testid` disponíveis na aplicação, organizados por página/componente.

---

## Componentes Globais (Layout / Header)

| data-testid | Elemento | Descrição |
|---|---|---|
| `header` | `<header>` | Header principal da aplicação |
| `logo-link` | `<a>` | Link do logo que leva ao catálogo |
| `nav` | `<nav>` | Barra de navegação |
| `nav-catalogo-link` | `<a>` | Link "Catálogo" no header |
| `nav-carrinho-link` | `<a>` | Link "Carrinho" no header |
| `carrinho-badge` | `<span>` | Badge com a quantidade de itens no carrinho (só visível quando há itens) |
| `nav-usuario-nome` | `<span>` | Exibe "Olá, {PrimeiroNome}" |
| `nav-logout-button` | `<button>` | Botão de sair/logout |
| `main-content` | `<main>` | Área de conteúdo principal |
| `footer` | `<footer>` | Rodapé da aplicação |

---

## Página: Login (`/login`)

| data-testid | Elemento | Descrição |
|---|---|---|
| `login-page` | `<div>` | Container da página de login |
| `login-titulo` | `<h1>` | Título "ShopDemo" |
| `login-form` | `<form>` | Formulário de login |
| `login-email-input` | `<input type="email">` | Campo de e-mail |
| `login-senha-input` | `<input type="password">` | Campo de senha |
| `login-submit-button` | `<button type="submit">` | Botão "Entrar" |
| `login-erro-mensagem` | `<div>` | Mensagem de erro (aparece após tentativa inválida) |
| `login-dica` | `<p>` | Dica com as credenciais de acesso |

---

## Página: Catálogo (`/`)

| data-testid | Elemento | Descrição |
|---|---|---|
| `catalogo-page` | `<div>` | Container da página de catálogo |
| `catalogo-titulo` | `<h1>` | Título "Catálogo de Produtos" |
| `catalogo-filtros` | `<div>` | Container dos filtros |
| `busca-input` | `<input type="search">` | Campo de busca por nome |
| `categorias-filtro` | `<div>` | Container dos botões de categoria |
| `categoria-filtro-todas` | `<button>` | Filtro "Todas" as categorias |
| `categoria-filtro-roupas` | `<button>` | Filtro categoria "Roupas" |
| `categoria-filtro-calcados` | `<button>` | Filtro categoria "Calçados" |
| `categoria-filtro-acessorios` | `<button>` | Filtro categoria "Acessórios" |
| `produtos-grid` | `<div>` | Grid com os cards de produtos |
| `catalogo-sem-resultados` | `<p>` | Mensagem quando nenhum produto é encontrado |
| `catalogo-contagem` | `<p>` | Exibe o número de produtos encontrados |

---

## Componente: ProdutoCard (dentro do catálogo)

Substituir `{id}` pelo id real do produto (ex: `p1`, `p2`, ..., `p10`).

| data-testid | Elemento | Descrição |
|---|---|---|
| `produto-card-{id}` | `<div>` | Card completo do produto |
| `produto-card-{id}-link` | `<a>` | Link para a página de detalhe |
| `produto-card-{id}-imagem` | `<img>` | Imagem do produto |
| `produto-card-{id}-categoria` | `<span>` | Categoria do produto |
| `produto-card-{id}-nome` | `<h3>` | Nome do produto |
| `produto-card-{id}-preco` | `<p>` | Preço formatado em R$ |
| `produto-card-{id}-sem-estoque` | `<span>` | Badge "Sem estoque" (só aparece quando estoque = 0) |
| `produto-card-{id}-adicionar-button` | `<button>` | Botão "Adicionar ao carrinho" (disabled quando sem estoque) |

---

## Página: Detalhe do Produto (`/produto/:id`)

Substituir `{id}` pelo id real do produto.

| data-testid | Elemento | Descrição |
|---|---|---|
| `produto-detalhe-{id}` | `<div>` | Container da página de detalhe |
| `produto-detalhe-breadcrumb` | `<nav>` | Breadcrumb de navegação |
| `breadcrumb-catalogo-link` | `<a>` | Link "Catálogo" no breadcrumb |
| `breadcrumb-produto-nome` | `<span>` | Nome do produto no breadcrumb |
| `produto-detalhe-{id}-imagem` | `<img>` | Imagem do produto |
| `produto-detalhe-{id}-categoria` | `<span>` | Categoria |
| `produto-detalhe-{id}-nome` | `<h1>` | Nome do produto |
| `produto-detalhe-{id}-descricao` | `<p>` | Descrição do produto |
| `produto-detalhe-{id}-preco` | `<p>` | Preço formatado |
| `produto-detalhe-{id}-estoque` | `<p>` | Estoque disponível |
| `produto-detalhe-{id}-quantidade-input` | `<input type="number">` | Seletor de quantidade |
| `produto-detalhe-sucesso-mensagem` | `<div>` | Mensagem de sucesso ao adicionar |
| `produto-detalhe-erro-mensagem` | `<div>` | Mensagem de erro (ex: estoque insuficiente) |
| `produto-detalhe-aviso-estoque` | `<p>` | Aviso quando quantidade > estoque |
| `produto-detalhe-{id}-adicionar-button` | `<button>` | Botão "Adicionar ao carrinho" |
| `produto-detalhe-{id}-comprar-agora-button` | `<button>` | Botão "Comprar agora" |
| `produto-nao-encontrado` | `<div>` | Exibido quando o produto não existe |
| `voltar-catalogo-link` | `<a>` | Link para voltar ao catálogo (produto não encontrado) |

---

## Página: Carrinho (`/carrinho`)

Substituir `{id}` pelo id real do produto.

| data-testid | Elemento | Descrição |
|---|---|---|
| `carrinho-page` | `<div>` | Container da página do carrinho |
| `carrinho-titulo` | `<h1>` | Título "Meu Carrinho" |
| `carrinho-vazio` | `<div>` | Exibido quando o carrinho está vazio |
| `carrinho-lista` | `<div>` | Lista de itens do carrinho |
| `carrinho-estoque-insuficiente-mensagem` | `<div>` | Erro ao tentar adicionar quantidade acima do estoque |
| `carrinho-item-{id}` | `<div>` | Item individual no carrinho |
| `carrinho-item-{id}-imagem` | `<img>` | Imagem do produto |
| `carrinho-item-{id}-nome` | `<a>` | Nome do produto (link para detalhe) |
| `carrinho-item-{id}-preco-unitario` | `<p>` | Preço unitário |
| `carrinho-item-{id}-quantidade-input` | `<input type="number">` | Campo de quantidade editável |
| `carrinho-item-{id}-subtotal` | `<p>` | Subtotal do item (quantidade × preço) |
| `carrinho-item-{id}-remover-button` | `<button>` | Botão de remover item |
| `carrinho-total-itens` | `<p>` | Total de itens no carrinho |
| `carrinho-total` | `<p>` | Valor total da compra |
| `carrinho-continuar-comprando-link` | `<a>` | Link "Continuar comprando" |
| `carrinho-finalizar-button` | `<button>` | Botão "Finalizar compra" |

---

## Página: Checkout (`/checkout`)

| data-testid | Elemento | Descrição |
|---|---|---|
| `checkout-page` | `<div>` | Container da página de checkout |
| `checkout-titulo` | `<h1>` | Título "Checkout" |
| `checkout-carrinho-vazio` | `<p>` | Exibido quando não há itens |
| `checkout-voltar-catalogo-link` | `<a>` | Link para o catálogo (carrinho vazio) |
| `checkout-secao-resumo` | `<section>` | Seção de resumo do pedido |
| `checkout-itens` | `<div>` | Lista de itens no resumo |
| `checkout-item-{id}` | `<div>` | Item individual no resumo |
| `checkout-item-{id}-nome` | `<span>` | Nome do produto |
| `checkout-item-{id}-quantidade` | `<span>` | Quantidade (ex: x2) |
| `checkout-item-{id}-subtotal` | `<span>` | Subtotal do item |
| `checkout-subtotal` | `<p>` | Subtotal geral |
| `cupom-area` | `<div>` | Área do cupom de desconto |
| `cupom-input` | `<input type="text">` | Campo para digitar o cupom |
| `cupom-aplicar-button` | `<button>` | Botão "Aplicar" cupom |
| `cupom-mensagem` | `<p>` | Mensagem de retorno do cupom (válido/expirado/inválido) |
| `checkout-desconto-valor` | `<p>` | Valor do desconto aplicado |
| `checkout-secao-frete` | `<section>` | Seção de cálculo de frete |
| `checkout-cep-input` | `<input type="text">` | Campo de CEP |
| `checkout-calcular-frete-button` | `<button>` | Botão "Calcular" frete |
| `checkout-cep-erro-mensagem` | `<p>` | Erro de CEP inválido ou região não coberta |
| `checkout-frete-resultado` | `<div>` | Container com o resultado do frete |
| `checkout-frete-regiao` | `<p>` | Nome da região de entrega |
| `checkout-frete-prazo` | `<p>` | Prazo de entrega |
| `checkout-frete-valor` | `<p>` | Valor do frete |
| `checkout-secao-pagamento` | `<section>` | Seção de pagamento |
| `checkout-pagamento-form` | `<form>` | Formulário de dados do cartão |
| `checkout-pagamento-nome-cartao-input` | `<input type="text">` | Nome no cartão |
| `checkout-pagamento-numero-cartao-input` | `<input type="text">` | Número do cartão |
| `checkout-pagamento-validade-input` | `<input type="text">` | Validade (MM/AA) |
| `checkout-pagamento-cvv-input` | `<input type="text">` | CVV |
| `checkout-pagamento-erro-mensagem` | `<div>` | Erro de pagamento recusado |
| `checkout-total-final` | `<div>` | Container com o total final |
| `checkout-total` | `<p>` | Valor total (subtotal - desconto + frete) |
| `checkout-finalizar-button` | `<button type="submit">` | Botão "Finalizar pedido" |

---

## Página: Confirmação (`/confirmacao`)

| data-testid | Elemento | Descrição |
|---|---|---|
| `confirmacao-page` | `<div>` | Container da página de confirmação |
| `confirmacao-icone` | `<div>` | Ícone de sucesso (✓) |
| `confirmacao-titulo` | `<h1>` | Título "Pedido confirmado!" |
| `confirmacao-detalhe` | `<div>` | Container com detalhes do pedido |
| `confirmacao-numero-pedido` | `<strong>` | Número do pedido (ex: PED-1001) |
| `confirmacao-status` | `<div>` | Status do pedido ("Aguardando processamento") |
| `confirmacao-desconto` | `<p>` | Desconto aplicado (só aparece se houve desconto) |
| `confirmacao-frete` | `<p>` | Valor do frete (só aparece se calculado) |
| `confirmacao-total` | `<p>` | Total pago |
| `confirmacao-continuar-comprando-link` | `<a>` | Link "Continuar comprando" |

---

## Ids dos Produtos

| ID | Nome |
|---|---|
| `p1` | Camiseta Básica Branca |
| `p2` | Calça Jeans Slim |
| `p3` | Moletom Canguru Cinza |
| `p4` | Tênis Esportivo Runner |
| `p5` | Sandália Confort Plus (**sem estoque**) |
| `p6` | Bota de Couro Preta |
| `p7` | Mochila Executiva 30L |
| `p8` | Relógio Analógico Clássico |
| `p9` | Carteira de Couro Slim |
| `p10` | Bermuda Tactel Estampada |

> Produtos com estoque baixo (para cenários de limite): `p3` (2 unidades), `p10` (3 unidades), `p6` (5 unidades).
