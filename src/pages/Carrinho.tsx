import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';

export function Carrinho() {
  const { itens, removerItem, alterarQuantidade, subtotal, totalItens } = useCarrinho();
  const navigate = useNavigate();
  const [erroEstoque, setErroEstoque] = useState<string | null>(null);

  function handleQuantidade(produtoId: string, novaQtd: number) {
    setErroEstoque(null);
    const resultado = alterarQuantidade(produtoId, novaQtd);
    if (resultado === 'estoque_insuficiente') {
      const item = itens.find((i) => i.produto.id === produtoId);
      setErroEstoque(
        `Estoque insuficiente para "${item?.produto.nome}". Máximo disponível: ${item?.produto.estoque}.`
      );
    }
  }

  if (itens.length === 0) {
    return (
      <div className="carrinho-page" data-testid="carrinho-page">
        <h1 data-testid="carrinho-titulo">Meu Carrinho</h1>
        <div className="carrinho-vazio" data-testid="carrinho-vazio">
          <p>Seu carrinho está vazio.</p>
          <Link to="/" className="btn-primary" data-testid="carrinho-continuar-comprando-link">
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="carrinho-page" data-testid="carrinho-page">
      <h1 data-testid="carrinho-titulo">Meu Carrinho</h1>

      {erroEstoque && (
        <div className="erro-mensagem" role="alert" data-testid="carrinho-estoque-insuficiente-mensagem">
          {erroEstoque}
        </div>
      )}

      <div className="carrinho-lista" data-testid="carrinho-lista">
        {itens.map((item) => (
          <div
            key={item.produto.id}
            className="carrinho-item"
            data-testid={`carrinho-item-${item.produto.id}`}
          >
            <img
              src={item.produto.imagemUrl}
              alt={item.produto.nome}
              className="carrinho-item-img"
              data-testid={`carrinho-item-${item.produto.id}-imagem`}
            />
            <div className="carrinho-item-info">
              <Link
                to={`/produto/${item.produto.id}`}
                className="carrinho-item-nome"
                data-testid={`carrinho-item-${item.produto.id}-nome`}
              >
                {item.produto.nome}
              </Link>
              <p
                className="carrinho-item-preco-unitario"
                data-testid={`carrinho-item-${item.produto.id}-preco-unitario`}
              >
                {item.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / un.
              </p>
            </div>

            <div className="carrinho-item-quantidade">
              <label htmlFor={`qty-${item.produto.id}`} className="sr-only">
                Quantidade
              </label>
              <input
                id={`qty-${item.produto.id}`}
                type="number"
                min={1}
                max={item.produto.estoque}
                value={item.quantidade}
                onChange={(e) => handleQuantidade(item.produto.id, parseInt(e.target.value) || 1)}
                className="quantidade-input"
                data-testid={`carrinho-item-${item.produto.id}-quantidade-input`}
              />
            </div>

            <p
              className="carrinho-item-subtotal"
              data-testid={`carrinho-item-${item.produto.id}-subtotal`}
            >
              {(item.produto.preco * item.quantidade).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>

            <button
              className="btn-remover"
              onClick={() => {
                setErroEstoque(null);
                removerItem(item.produto.id);
              }}
              aria-label={`Remover ${item.produto.nome}`}
              data-testid={`carrinho-item-${item.produto.id}-remover-button`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="carrinho-rodape">
        <div className="carrinho-resumo">
          <p data-testid="carrinho-total-itens">
            {totalItens} item(s) no carrinho
          </p>
          <p className="carrinho-total" data-testid="carrinho-total">
            Total:{' '}
            <strong>
              {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </strong>
          </p>
        </div>
        <div className="carrinho-acoes">
          <Link to="/" className="btn-secondary" data-testid="carrinho-continuar-comprando-link">
            Continuar comprando
          </Link>
          <button
            className="btn-primary"
            onClick={() => navigate('/checkout')}
            data-testid="carrinho-finalizar-button"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
