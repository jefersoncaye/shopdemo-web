export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  descricao: string;
  imagemUrl: string;
  estoque: number;
}

export const PRODUTOS: Produto[] = [
  {
    id: 'p1',
    nome: 'Camiseta Básica Branca',
    categoria: 'Roupas',
    preco: 49.9,
    descricao: 'Camiseta de algodão premium, corte reto, disponível em tamanho único.',
    imagemUrl: 'https://placehold.co/300x300/e2e8f0/475569?text=Camiseta',
    estoque: 15,
  },
  {
    id: 'p2',
    nome: 'Calça Jeans Slim',
    categoria: 'Roupas',
    preco: 129.9,
    descricao: 'Calça jeans de corte slim com elastano para maior conforto.',
    imagemUrl: 'https://placehold.co/300x300/dbeafe/1e40af?text=Calca+Jeans',
    estoque: 8,
  },
  {
    id: 'p3',
    nome: 'Moletom Canguru Cinza',
    categoria: 'Roupas',
    preco: 89.9,
    descricao: 'Moletom com capuz e bolso canguru, tecido macio e quentinho.',
    imagemUrl: 'https://placehold.co/300x300/f1f5f9/64748b?text=Moletom',
    estoque: 2,
  },
  {
    id: 'p4',
    nome: 'Tênis Esportivo Runner',
    categoria: 'Calçados',
    preco: 219.9,
    descricao: 'Tênis leve e confortável para corrida e caminhada, solado antiderrapante.',
    imagemUrl: 'https://placehold.co/300x300/dcfce7/166534?text=Tenis',
    estoque: 12,
  },
  {
    id: 'p5',
    nome: 'Sandália Confort Plus',
    categoria: 'Calçados',
    preco: 79.9,
    descricao: 'Sandália com palmilha anatômica e tiras reguláveis.',
    imagemUrl: 'https://placehold.co/300x300/fef9c3/854d0e?text=Sandalia',
    estoque: 0,
  },
  {
    id: 'p6',
    nome: 'Bota de Couro Preta',
    categoria: 'Calçados',
    preco: 299.9,
    descricao: 'Bota de couro legítimo com cano médio, forro macio e sola de borracha.',
    imagemUrl: 'https://placehold.co/300x300/1e293b/e2e8f0?text=Bota',
    estoque: 5,
  },
  {
    id: 'p7',
    nome: 'Mochila Executiva 30L',
    categoria: 'Acessórios',
    preco: 149.9,
    descricao: 'Mochila com compartimento para notebook até 15", bolsos organizadores e alças acolchoadas.',
    imagemUrl: 'https://placehold.co/300x300/ede9fe/5b21b6?text=Mochila',
    estoque: 7,
  },
  {
    id: 'p8',
    nome: 'Relógio Analógico Clássico',
    categoria: 'Acessórios',
    preco: 189.9,
    descricao: 'Relógio de pulso com pulseira de couro, mostrador analógico e resistente à água.',
    imagemUrl: 'https://placehold.co/300x300/fce7f3/9d174d?text=Relogio',
    estoque: 10,
  },
  {
    id: 'p9',
    nome: 'Carteira de Couro Slim',
    categoria: 'Acessórios',
    preco: 59.9,
    descricao: 'Carteira fina com múltiplos compartimentos para cartões e cédulas.',
    imagemUrl: 'https://placehold.co/300x300/ffedd5/9a3412?text=Carteira',
    estoque: 20,
  },
  {
    id: 'p10',
    nome: 'Bermuda Tactel Estampada',
    categoria: 'Roupas',
    preco: 69.9,
    descricao: 'Bermuda de tactel com estampa tropical, bolsos laterais e cadarço ajustável.',
    imagemUrl: 'https://placehold.co/300x300/cffafe/155e75?text=Bermuda',
    estoque: 3,
  },
];

export function getProdutoPorId(id: string): Produto | undefined {
  return PRODUTOS.find((p) => p.id === id);
}
