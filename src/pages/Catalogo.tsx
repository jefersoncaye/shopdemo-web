import { useState, useMemo } from 'react';
import { PRODUTOS } from '../data/produtos';
import { ProdutoCard } from '../components/ProdutoCard';

const CATEGORIAS = ['Todas', ...Array.from(new Set(PRODUTOS.map((p) => p.categoria))).sort()];

export function Catalogo() {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const produtosFiltrados = useMemo(() => {
    return PRODUTOS.filter((p) => {
      const matchBusca = p.nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .includes(
          busca
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
        );
      const matchCategoria =
        categoriaAtiva === 'Todas' || p.categoria === categoriaAtiva;
      return matchBusca && matchCategoria;
    });
  }, [busca, categoriaAtiva]);

  return (
    <div className="catalogo-page" data-testid="catalogo-page">
      <div className="catalogo-header">
        <h1 data-testid="catalogo-titulo">Catálogo de Produtos</h1>

        <div className="catalogo-filtros" data-testid="catalogo-filtros">
          <input
            type="search"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="busca-input"
            data-testid="busca-input"
          />

          <div className="categorias" data-testid="categorias-filtro">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                className={`btn-categoria ${categoriaAtiva === cat ? 'ativo' : ''}`}
                onClick={() => setCategoriaAtiva(cat)}
                data-testid={`categoria-filtro-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {produtosFiltrados.length === 0 ? (
        <p className="sem-resultados" data-testid="catalogo-sem-resultados">
          Nenhum produto encontrado para "{busca}".
        </p>
      ) : (
        <div className="produtos-grid" data-testid="produtos-grid">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}

      <p className="catalogo-contagem" data-testid="catalogo-contagem">
        {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
