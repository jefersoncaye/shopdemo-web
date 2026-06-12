import React, { createContext, useContext, useState } from 'react';
import { type Produto, getProdutoPorId } from '../data/produtos';

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  adicionarItem: (produtoId: string, quantidade?: number) => 'ok' | 'estoque_insuficiente' | 'produto_nao_encontrado';
  removerItem: (produtoId: string) => void;
  alterarQuantidade: (produtoId: string, quantidade: number) => 'ok' | 'estoque_insuficiente';
  limparCarrinho: () => void;
  totalItens: number;
  subtotal: number;
}

const CarrinhoContext = createContext<CarrinhoContextType | null>(null);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  function adicionarItem(
    produtoId: string,
    quantidade: number = 1
  ): 'ok' | 'estoque_insuficiente' | 'produto_nao_encontrado' {
    const produto = getProdutoPorId(produtoId);
    if (!produto) return 'produto_nao_encontrado';

    const existente = itens.find((i) => i.produto.id === produtoId);
    const quantidadeAtual = existente ? existente.quantidade : 0;
    const novaQuantidade = quantidadeAtual + quantidade;

    if (novaQuantidade > produto.estoque) {
      return 'estoque_insuficiente';
    }

    if (existente) {
      setItens((prev) =>
        prev.map((i) =>
          i.produto.id === produtoId ? { ...i, quantidade: novaQuantidade } : i
        )
      );
    } else {
      setItens((prev) => [...prev, { produto, quantidade }]);
    }
    return 'ok';
  }

  function removerItem(produtoId: string) {
    setItens((prev) => prev.filter((i) => i.produto.id !== produtoId));
  }

  function alterarQuantidade(
    produtoId: string,
    quantidade: number
  ): 'ok' | 'estoque_insuficiente' {
    const produto = getProdutoPorId(produtoId);
    if (!produto) return 'estoque_insuficiente';

    if (quantidade > produto.estoque) {
      return 'estoque_insuficiente';
    }

    if (quantidade <= 0) {
      removerItem(produtoId);
      return 'ok';
    }

    setItens((prev) =>
      prev.map((i) =>
        i.produto.id === produtoId ? { ...i, quantidade } : i
      )
    );
    return 'ok';
  }

  function limparCarrinho() {
    setItens([]);
  }

  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);
  const subtotal = itens.reduce((acc, i) => acc + i.produto.preco * i.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionarItem, removerItem, alterarQuantidade, limparCarrinho, totalItens, subtotal }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho(): CarrinhoContextType {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) throw new Error('useCarrinho must be used within CarrinhoProvider');
  return ctx;
}
