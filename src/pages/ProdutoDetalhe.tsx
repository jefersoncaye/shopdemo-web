import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProdutoPorId } from '../data/produtos';
import { useCarrinho } from '../context/CarrinhoContext';

export function ProdutoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { adicionarItem } = useCarrinho();
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  const produto = id ? getProdutoPorId(id) : undefined;

  if (!produto) {
    return (
      <div className="produto-nao-encontrado" data-testid="produto-nao-encontrado">
        <h2>Produto não encontrado</h2>
        <Link to="/" data-testid="voltar-catalogo-link">Voltar ao catálogo</Link>
      </div>
    );
  }

  const semEstoque = produto.estoque === 0;
  const estoqueInsuficiente = quantidade > produto.estoque;

  function handleAdicionar() {
    const resultado = adicionarItem(produto!.id, quantidade);
    if (resultado === 'ok') {
      setMensagem({ tipo: 'sucesso', texto: 'Produto adicionado ao carrinho!' });
    } else if (resultado === 'estoque_insuficiente') {
      setMensagem({
        tipo: 'erro',
        texto: `Estoque insuficiente. Disponível: ${produto!.estoque} unidade(s).`,
      });
    }
  }

  function handleComprarAgora() {
    const resultado = adicionarItem(produto!.id, quantidade);
    if (resultado === 'ok') {
      navigate('/carrinho');
    } else if (resultado === 'estoque_insuficiente') {
      setMensagem({
        tipo: 'erro',
        texto: `Estoque insuficiente. Disponível: ${produto!.estoque} unidade(s).`,
      });
    }
  }

  return (
    <div className="produto-detalhe-page" data-testid={`produto-detalhe-${produto.id}`}>
      <nav className="breadcrumb" data-testid="produto-detalhe-breadcrumb">
        <Link to="/" data-testid="breadcrumb-catalogo-link">Catálogo</Link>
        <span> / </span>
        <span data-testid="breadcrumb-produto-nome">{produto.nome}</span>
      </nav>

      <div className="produto-detalhe-conteudo">
        <div className="produto-detalhe-imagem-wrap">
          <img
            src={produto.imagemUrl}
            alt={produto.nome}
            className="produto-detalhe-imagem"
            data-testid={`produto-detalhe-${produto.id}-imagem`}
          />
        </div>

        <div className="produto-detalhe-info">
          <span className="produto-detalhe-categoria" data-testid={`produto-detalhe-${produto.id}-categoria`}>
            {produto.categoria}
          </span>
          <h1 className="produto-detalhe-nome" data-testid={`produto-detalhe-${produto.id}-nome`}>
            {produto.nome}
          </h1>
          <p className="produto-detalhe-descricao" data-testid={`produto-detalhe-${produto.id}-descricao`}>
            {produto.descricao}
          </p>
          <p className="produto-detalhe-preco" data-testid={`produto-detalhe-${produto.id}-preco`}>
            {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>

          <p className="produto-detalhe-estoque" data-testid={`produto-detalhe-${produto.id}-estoque`}>
            {semEstoque
              ? 'Sem estoque'
              : `Em estoque: ${produto.estoque} unidade(s)`}
          </p>

          {!semEstoque && (
            <div className="produto-detalhe-quantidade">
              <label htmlFor="quantidade-input">Quantidade:</label>
              <input
                id="quantidade-input"
                type="number"
                min={1}
                max={produto.estoque}
                value={quantidade}
                onChange={(e) => {
                  setMensagem(null);
                  setQuantidade(Math.max(1, parseInt(e.target.value) || 1));
                }}
                className="quantidade-input"
                data-testid={`produto-detalhe-${produto.id}-quantidade-input`}
              />
            </div>
          )}

          {mensagem && (
            <div
              className={`mensagem-${mensagem.tipo}`}
              role="alert"
              data-testid={
                mensagem.tipo === 'sucesso'
                  ? 'produto-detalhe-sucesso-mensagem'
                  : 'produto-detalhe-erro-mensagem'
              }
            >
              {mensagem.texto}
            </div>
          )}

          {estoqueInsuficiente && !mensagem && (
            <p className="aviso-estoque" data-testid="produto-detalhe-aviso-estoque">
              Quantidade solicitada excede o estoque disponível ({produto.estoque}).
            </p>
          )}

          <div className="produto-detalhe-acoes">
            <button
              className="btn-primary"
              onClick={handleAdicionar}
              disabled={semEstoque}
              data-testid={`produto-detalhe-${produto.id}-adicionar-button`}
            >
              Adicionar ao carrinho
            </button>
            <button
              className="btn-secondary"
              onClick={handleComprarAgora}
              disabled={semEstoque}
              data-testid={`produto-detalhe-${produto.id}-comprar-agora-button`}
            >
              Comprar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
