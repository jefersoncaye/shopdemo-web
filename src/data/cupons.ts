export type TipoCupom = 'percentual' | 'fixo';

export interface Cupom {
  codigo: string;
  tipo: TipoCupom;
  valor: number;
  descricao: string;
  expirado: boolean;
}

export const CUPONS: Cupom[] = [
  {
    codigo: 'DESCONTO10',
    tipo: 'percentual',
    valor: 10,
    descricao: '10% de desconto em toda a compra',
    expirado: false,
  },
  {
    codigo: 'PROMO20',
    tipo: 'percentual',
    valor: 20,
    descricao: '20% de desconto em toda a compra',
    expirado: false,
  },
  {
    codigo: 'FRETE30',
    tipo: 'fixo',
    valor: 30,
    descricao: 'R$ 30,00 de desconto',
    expirado: false,
  },
  {
    codigo: 'PROMOANTIGA',
    tipo: 'percentual',
    valor: 15,
    descricao: 'Promoção encerrada',
    expirado: true,
  },
  {
    codigo: 'BLACKFRIDAY',
    tipo: 'percentual',
    valor: 25,
    descricao: 'Black Friday encerrada',
    expirado: true,
  },
];

export type ResultadoCupom =
  | { tipo: 'valido'; cupom: Cupom }
  | { tipo: 'expirado' }
  | { tipo: 'invalido' };

export function validarCupom(codigo: string): ResultadoCupom {
  const cupom = CUPONS.find(
    (c) => c.codigo.toUpperCase() === codigo.toUpperCase().trim()
  );
  if (!cupom) return { tipo: 'invalido' };
  if (cupom.expirado) return { tipo: 'expirado' };
  return { tipo: 'valido', cupom };
}

export function calcularDesconto(subtotal: number, cupom: Cupom): number {
  if (cupom.tipo === 'percentual') {
    return (subtotal * cupom.valor) / 100;
  }
  return Math.min(cupom.valor, subtotal);
}
