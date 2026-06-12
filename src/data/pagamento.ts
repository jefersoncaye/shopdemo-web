export type ResultadoPagamento = 'aprovado' | 'recusado';

const CARTOES_RECUSADOS = ['0000'];

export function processarPagamento(numeroCartao: string): ResultadoPagamento {
  const numLimpo = numeroCartao.replace(/\s/g, '').replace(/-/g, '');
  const sufixo = numLimpo.slice(-4);
  if (CARTOES_RECUSADOS.includes(sufixo)) {
    return 'recusado';
  }
  return 'aprovado';
}

let contadorPedido = 1000;

export function gerarNumeroPedido(): string {
  contadorPedido += 1;
  return `PED-${contadorPedido}`;
}
