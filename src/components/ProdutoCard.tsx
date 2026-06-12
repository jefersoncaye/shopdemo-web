import { Link } from 'react-router-dom';
import type { Produto } from '../data/produtos';
import { useCarrinho } from '../context/CarrinhoContext';

interface ProdutoCardProps {
  produto: Produto;
}

export function ProdutoCard({ produto }: ProdutoCardProps) {
  const { adicionarItem } = useCarrinho();

  function handleAdicionar() {
    adicionarItem(produto.id, 1);
  }

  const semEstoque = produto.estoque === 0;

  return (
    <div className="produto-card" data-testid={`produto-card-${produto.id}`}>
      <Link to={`/produto/${produto.id}`} data-testid={`produto-card-${produto.id}-link`}>
        <img
          src={produto.imagemUrl}
          alt={produto.nome}
          className="produto-card-img"
          data-testid={`produto-card-${produto.id}-imagem`}
        />
        <div className="produto-card-body">
          <span className="produto-card-categoria" data-testid={`produto-card-${produto.id}-categoria`}>
            {produto.categoria}
          </span>
          <h3 className="produto-card-nome" data-testid={`produto-card-${produto.id}-nome`}>
            {produto.nome}
          </h3>
          <p className="produto-card-preco" data-testid={`produto-card-${produto.id}-preco`}>
            {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          {semEstoque && (
            <span className="badge-sem-estoque" data-testid={`produto-card-${produto.id}-sem-estoque`}>
              Sem estoque
            </span>
          )}
        </div>
      </Link>
      <button
        className="btn-adicionar"
        onClick={handleAdicionar}
        disabled={semEstoque}
        data-testid={`produto-card-${produto.id}-adicionar-button`}
      >
        {semEstoque ? 'Indisponível' : 'Adicionar ao carrinho'}
      </button>
    </div>
  );
}
