# CENARIOS-DE-TESTE.md — Manual de Cenários do ShopDemo Web

Este arquivo documenta todos os valores especiais (credenciais, cupons, CEPs, cartões, produtos) e o comportamento exato que cada um produz na aplicação. Use como referência para escrever os arquivos `.feature` do BDD.

---

## 1. Login

### Credenciais válidas

| E-mail | Senha | Resultado |
|---|---|---|
| `cliente@shopdemo.com` | `senha123` | Login realizado, redirecionado para `/` |
| `joao@shopdemo.com` | `senha456` | Login realizado, redirecionado para `/` |

### Credenciais inválidas

| E-mail | Senha | Resultado |
|---|---|---|
| Qualquer e-mail não cadastrado | Qualquer | Mensagem de erro em `[data-testid="login-erro-mensagem"]`: "E-mail ou senha inválidos. Tente novamente." |
| `cliente@shopdemo.com` | Senha incorreta | Mensagem de erro em `[data-testid="login-erro-mensagem"]` |
| Campo vazio | Campo vazio | Validação HTML nativa impede o submit |

---

## 2. Catálogo — Busca e Filtros

### Busca por nome

- A busca é **case insensitive** e **ignora acentos** (normalização NFD).
- A busca filtra em tempo real enquanto o usuário digita.

| Termo de busca | Resultado esperado |
|---|---|
| `camiseta` | Exibe "Camiseta Básica Branca" |
| `CAMISETA` | Exibe "Camiseta Básica Branca" (case insensitive) |
| `tenis` | Exibe "Tênis Esportivo Runner" (ignora acento) |
| `xyz_nao_existe` | `[data-testid="catalogo-sem-resultados"]` exibido, grid vazio |
| `` (vazio) | Todos os produtos exibidos |

### Filtros de categoria

| Botão (`data-testid`) | Produtos exibidos |
|---|---|
| `categoria-filtro-todas` | Todos os 10 produtos |
| `categoria-filtro-roupas` | p1 (Camiseta), p2 (Calça Jeans), p3 (Moletom), p10 (Bermuda) |
| `categoria-filtro-calcados` | p4 (Tênis), p5 (Sandália), p6 (Bota) |
| `categoria-filtro-acessorios` | p7 (Mochila), p8 (Relógio), p9 (Carteira) |

---

## 3. Produtos — Estoque

### Produto sem estoque (`p5`)

- **Produto:** Sandália Confort Plus
- **Estoque:** 0
- **Efeitos:**
  - Badge `[data-testid="produto-card-p5-sem-estoque"]` visível no card
  - Botão `[data-testid="produto-card-p5-adicionar-button"]` está **disabled** com texto "Indisponível"
  - Na página de detalhe: `[data-testid="produto-detalhe-p5-estoque"]` exibe "Sem estoque"
  - Botões adicionar e comprar agora estão **disabled**

### Produtos com estoque baixo (para cenários de limite)

| Produto | ID | Estoque |
|---|---|---|
| Moletom Canguru Cinza | `p3` | 2 unidades |
| Bermuda Tactel Estampada | `p10` | 3 unidades |
| Bota de Couro Preta | `p6` | 5 unidades |

### Cenário: Estoque insuficiente no carrinho

- Acesse o detalhe de `p3` (Moletom, estoque = 2)
- Tente adicionar **3 ou mais** unidades
- **Resultado:** `[data-testid="produto-detalhe-erro-mensagem"]` exibe: "Estoque insuficiente. Disponível: 2 unidade(s)."

### Cenário: Estoque insuficiente via edição de quantidade no carrinho

- Adicione `p3` ao carrinho (1 unidade)
- No carrinho, altere `[data-testid="carrinho-item-p3-quantidade-input"]` para 3
- **Resultado:** `[data-testid="carrinho-estoque-insuficiente-mensagem"]` exibe: "Estoque insuficiente para "Moletom Canguru Cinza". Máximo disponível: 2."

---

## 4. Cupons de Desconto

### Tabela de cupons

| Código | Tipo | Valor | Status | Mensagem esperada em `[data-testid="cupom-mensagem"]` |
|---|---|---|---|---|
| `DESCONTO10` | Percentual | 10% | **Válido** | "Cupom aplicado: 10% de desconto em toda a compra" |
| `PROMO20` | Percentual | 20% | **Válido** | "Cupom aplicado: 20% de desconto em toda a compra" |
| `FRETE30` | Fixo | R$ 30,00 | **Válido** | "Cupom aplicado: R$ 30,00 de desconto" |
| `PROMOANTIGA` | Percentual | 15% | **Expirado** | "Cupom expirado. Não é mais válido para uso." |
| `BLACKFRIDAY` | Percentual | 25% | **Expirado** | "Black Friday encerrada" → mensagem: "Cupom expirado. Não é mais válido para uso." |
| Qualquer outro código | — | — | **Inválido** | "Cupom inválido. Verifique o código e tente novamente." |

> **Atenção:** O campo `cupom-input` converte automaticamente para maiúsculas. `desconto10`, `DESCONTO10`, `Desconto10` são equivalentes.

### Cálculo do desconto

- **DESCONTO10** sobre subtotal de R$ 200,00 → desconto de R$ 20,00 → total R$ 180,00 (+ frete)
- **PROMO20** sobre subtotal de R$ 200,00 → desconto de R$ 40,00 → total R$ 160,00 (+ frete)
- **FRETE30** sobre qualquer valor → desconto fixo de R$ 30,00 (se subtotal < R$ 30,00, desconto = subtotal)

---

## 5. Frete por CEP

### Regiões e valores

| Região | Valor | Prazo | Exemplos de CEP |
|---|---|---|---|
| Sudeste / Sul | R$ 12,90 | 3 a 5 dias úteis | `01310-100` (SP), `20040-020` (RJ), `30130-110` (MG), `80010-020` (PR), `90010-150` (RS) |
| Centro-Oeste | R$ 19,90 | 5 a 7 dias úteis | `70040-010` (DF), `74110-010` (GO), `78010-050` (MT) |
| Norte / Nordeste | R$ 29,90 | 7 a 12 dias úteis | `40010-000` (BA), `50010-000` (PE), `60010-000` (CE) |

### CEPs inválidos (formato incorreto)

| Entrada | Resultado |
|---|---|
| `1234` | `[data-testid="checkout-cep-erro-mensagem"]`: "CEP inválido. Use o formato 00000-000 ou 00000000." |
| `abc-defg` | Mesmo erro |
| `00000-000` | Região não coberta → `[data-testid="checkout-cep-erro-mensagem"]`: "Não realizamos entregas para este CEP no momento." |

### CEPs para uso em testes

| CEP | Região | Frete esperado |
|---|---|---|
| `01310-100` | Sudeste / Sul | R$ 12,90 |
| `01310100` | Sudeste / Sul | R$ 12,90 (sem hífen também funciona) |
| `70040-010` | Centro-Oeste | R$ 19,90 |
| `40010-000` | Norte / Nordeste | R$ 29,90 |
| `1234` | — | Erro: CEP inválido |

---

## 6. Pagamento por Cartão de Crédito

### Regra geral

- Qualquer número de cartão com **16 dígitos** cujos **4 últimos dígitos NÃO sejam `0000`** → pagamento **aprovado**.
- Cartão terminado em `0000` → pagamento **recusado**.

### Cartões documentados

| Número do cartão | Resultado | Mensagem / Ação |
|---|---|---|
| `4111 1111 1111 1111` | **Aprovado** | Redireciona para `/confirmacao` com número do pedido |
| `5500 0000 0000 0004` | **Aprovado** | Redireciona para `/confirmacao` |
| `1234 5678 9012 3456` | **Aprovado** | Redireciona para `/confirmacao` |
| `4000 0000 0000 0000` | **Recusado** | `[data-testid="checkout-pagamento-erro-mensagem"]`: "Pagamento recusado. Verifique os dados do cartão e tente novamente." |
| `1234 0000` | **Recusado** | Mesmo erro (sufixo `0000`) |

> O campo aceita espaços e hífens — eles são removidos antes da verificação. O único critério é o **sufixo dos últimos 4 dígitos**.

---

## 7. Confirmação do Pedido

- Após pagamento aprovado, a aplicação redireciona para `/confirmacao`.
- O número do pedido é gerado sequencialmente, começando em `PED-1001`.
- `[data-testid="confirmacao-numero-pedido"]` exibe o número no formato `PED-XXXX`.
- `[data-testid="confirmacao-status"]` exibe: "Aguardando processamento".

> **Nota:** O contador de pedidos reinicia a cada recarga da página (estado em memória). Para testes determinísticos, sempre garanta que o teste executa o fluxo completo de compra em uma única sessão de navegador.

---

## 8. Fluxo Completo — Resumo dos Valores de Teste Recomendados

Para o fluxo E2E completo de uma compra bem-sucedida, use:

```
Login:       cliente@shopdemo.com / senha123
Produto:     p1 (Camiseta Básica Branca, R$ 49,90, estoque 15)
Cupom:       DESCONTO10 (10% de desconto)
CEP:         01310-100 (frete R$ 12,90)
Cartão:      4111 1111 1111 1111 (aprovado)
Validade:    12/28
CVV:         123
```

**Resultado esperado:**
- Subtotal: R$ 49,90
- Desconto (10%): -R$ 4,99
- Frete: R$ 12,90
- **Total: R$ 57,81**
- Número do pedido: `PED-1001` (primeira compra da sessão)

Para o fluxo de pagamento **recusado**:
```
Cartão: 4000 0000 0000 0000
```
Resultado: `[data-testid="checkout-pagamento-erro-mensagem"]` visível, sem redirecionamento.
