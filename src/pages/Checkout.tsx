import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import { validarCupom, calcularDesconto, type Cupom } from '../data/cupons';
import { calcularFrete, type FaixaFrete } from '../data/frete';
import { processarPagamento, gerarNumeroPedido } from '../data/pagamento';

export function Checkout() {
  const { itens, subtotal, limparCarrinho } = useCarrinho();
  const navigate = useNavigate();

  // Cupom
  const [codigoCupom, setCodigoCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState<Cupom | null>(null);
  const [cupomMensagem, setCupomMensagem] = useState('');
  const [cupomMensagemTipo, setCupomMensagemTipo] = useState<'sucesso' | 'erro' | ''>('');

  // Frete
  const [cep, setCep] = useState('');
  const [faixaFrete, setFaixaFrete] = useState<FaixaFrete | null>(null);
  const [cepErro, setCepErro] = useState('');

  // Pagamento
  const [nomeCartao, setNomeCartao] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [pagamentoErro, setPagamentoErro] = useState('');
  const [processando, setProcessando] = useState(false);

  if (itens.length === 0) {
    return (
      <div className="checkout-page" data-testid="checkout-page">
        <h1>Checkout</h1>
        <p data-testid="checkout-carrinho-vazio">
          Seu carrinho está vazio.{' '}
          <Link to="/" data-testid="checkout-voltar-catalogo-link">Ir ao catálogo</Link>
        </p>
      </div>
    );
  }

  const desconto = cupomAplicado ? calcularDesconto(subtotal, cupomAplicado) : 0;
  const valorFrete = faixaFrete ? faixaFrete.valor : 0;
  const total = subtotal - desconto + valorFrete;

  function handleAplicarCupom() {
    if (!codigoCupom.trim()) return;
    const resultado = validarCupom(codigoCupom);
    if (resultado.tipo === 'valido') {
      setCupomAplicado(resultado.cupom);
      setCupomMensagem(`Cupom aplicado: ${resultado.cupom.descricao}`);
      setCupomMensagemTipo('sucesso');
    } else if (resultado.tipo === 'expirado') {
      setCupomAplicado(null);
      setCupomMensagem('Cupom expirado. Não é mais válido para uso.');
      setCupomMensagemTipo('erro');
    } else {
      setCupomAplicado(null);
      setCupomMensagem('Cupom inválido. Verifique o código e tente novamente.');
      setCupomMensagemTipo('erro');
    }
  }

  function handleCalcularFrete() {
    setCepErro('');
    setFaixaFrete(null);
    const resultado = calcularFrete(cep);
    if (resultado.tipo === 'cep_invalido') {
      setCepErro('CEP inválido. Use o formato 00000-000 ou 00000000.');
    } else if (resultado.tipo === 'regiao_nao_coberta') {
      setCepErro('Não realizamos entregas para este CEP no momento.');
    } else {
      setFaixaFrete(resultado.faixa);
    }
  }

  function handleFinalizarPedido(e: FormEvent) {
    e.preventDefault();
    setPagamentoErro('');
    setProcessando(true);

    const resultado = processarPagamento(numeroCartao);
    setProcessando(false);

    if (resultado === 'recusado') {
      setPagamentoErro('Pagamento recusado. Verifique os dados do cartão e tente novamente.');
      return;
    }

    const numeroPedido = gerarNumeroPedido();
    limparCarrinho();
    navigate('/confirmacao', {
      state: {
        numeroPedido,
        total,
        frete: valorFrete,
        desconto,
      },
    });
  }

  return (
    <div className="checkout-page" data-testid="checkout-page">
      <h1 data-testid="checkout-titulo">Checkout</h1>

      {/* ETAPA 1: Resumo e Cupom */}
      <section className="checkout-secao" data-testid="checkout-secao-resumo">
        <h2>Resumo do pedido</h2>
        <div className="checkout-itens" data-testid="checkout-itens">
          {itens.map((item) => (
            <div key={item.produto.id} className="checkout-item" data-testid={`checkout-item-${item.produto.id}`}>
              <span data-testid={`checkout-item-${item.produto.id}-nome`}>{item.produto.nome}</span>
              <span data-testid={`checkout-item-${item.produto.id}-quantidade`}>x{item.quantidade}</span>
              <span data-testid={`checkout-item-${item.produto.id}-subtotal`}>
                {(item.produto.preco * item.quantidade).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
          ))}
        </div>

        <p className="checkout-subtotal" data-testid="checkout-subtotal">
          Subtotal: <strong>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
        </p>

        {/* Cupom */}
        <div className="cupom-area" data-testid="cupom-area">
          <h3>Cupom de desconto</h3>
          <div className="cupom-controles">
            <input
              type="text"
              value={codigoCupom}
              onChange={(e) => {
                setCodigoCupom(e.target.value.toUpperCase());
                setCupomMensagem('');
                setCupomMensagemTipo('');
                if (!e.target.value) setCupomAplicado(null);
              }}
              placeholder="Digite seu cupom"
              className="cupom-input"
              data-testid="cupom-input"
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={handleAplicarCupom}
              data-testid="cupom-aplicar-button"
            >
              Aplicar
            </button>
          </div>
          {cupomMensagem && (
            <p
              className={`cupom-mensagem cupom-mensagem-${cupomMensagemTipo}`}
              role="alert"
              data-testid="cupom-mensagem"
            >
              {cupomMensagem}
            </p>
          )}
          {cupomAplicado && (
            <p className="cupom-desconto" data-testid="checkout-desconto-valor">
              Desconto: -{desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          )}
        </div>
      </section>

      {/* ETAPA 2: Frete */}
      <section className="checkout-secao" data-testid="checkout-secao-frete">
        <h2>Calcular frete</h2>
        <div className="frete-controles">
          <input
            type="text"
            value={cep}
            onChange={(e) => {
              setCep(e.target.value);
              setCepErro('');
              setFaixaFrete(null);
            }}
            placeholder="00000-000"
            maxLength={9}
            className="cep-input"
            data-testid="checkout-cep-input"
          />
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCalcularFrete}
            data-testid="checkout-calcular-frete-button"
          >
            Calcular
          </button>
        </div>

        {cepErro && (
          <p className="erro-mensagem" role="alert" data-testid="checkout-cep-erro-mensagem">
            {cepErro}
          </p>
        )}

        {faixaFrete && (
          <div className="frete-resultado" data-testid="checkout-frete-resultado">
            <p data-testid="checkout-frete-regiao">Região: {faixaFrete.nome}</p>
            <p data-testid="checkout-frete-prazo">Prazo: {faixaFrete.prazo}</p>
            <p data-testid="checkout-frete-valor">
              Frete:{' '}
              <strong>
                {faixaFrete.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </strong>
            </p>
          </div>
        )}
      </section>

      {/* ETAPA 3: Pagamento */}
      <section className="checkout-secao" data-testid="checkout-secao-pagamento">
        <h2>Pagamento</h2>
        <form onSubmit={handleFinalizarPedido} data-testid="checkout-pagamento-form">
          <div className="form-group">
            <label htmlFor="nome-cartao">Nome no cartão</label>
            <input
              id="nome-cartao"
              type="text"
              value={nomeCartao}
              onChange={(e) => setNomeCartao(e.target.value)}
              placeholder="Como aparece no cartão"
              required
              data-testid="checkout-pagamento-nome-cartao-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="numero-cartao-label">Número do cartão</label>
            <input
              id="numero-cartao"
              type="text"
              value={numeroCartao}
              onChange={(e) => {
                setPagamentoErro('');
                setNumeroCartao(e.target.value);
              }}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              required
              data-testid="checkout-pagamento-numero-cartao-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="validade">Validade</label>
              <input
                id="validade"
                type="text"
                value={validade}
                onChange={(e) => setValidade(e.target.value)}
                placeholder="MM/AA"
                maxLength={5}
                required
                data-testid="checkout-pagamento-validade-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="000"
                maxLength={4}
                required
                data-testid="checkout-pagamento-cvv-input"
              />
            </div>
          </div>

          {pagamentoErro && (
            <div className="erro-mensagem" role="alert" data-testid="checkout-pagamento-erro-mensagem">
              {pagamentoErro}
            </div>
          )}

          {/* Total final */}
          <div className="checkout-total-final" data-testid="checkout-total-final">
            <p>Subtotal: {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            {cupomAplicado && (
              <p>Desconto: -{desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            )}
            <p>Frete: {valorFrete > 0 ? valorFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Não calculado'}</p>
            <p className="total-linha" data-testid="checkout-total">
              <strong>
                Total: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </strong>
            </p>
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={processando}
            data-testid="checkout-finalizar-button"
          >
            {processando ? 'Processando...' : 'Finalizar pedido'}
          </button>
        </form>
      </section>
    </div>
  );
}
