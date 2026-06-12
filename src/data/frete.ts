export interface FaixaFrete {
  nome: string;
  valor: number;
  prazo: string;
  prefixos: string[];
}

export const FAIXAS_FRETE: FaixaFrete[] = [
  {
    nome: 'Sudeste / Sul',
    valor: 12.9,
    prazo: '3 a 5 dias úteis',
    prefixos: ['01', '02', '03', '04', '05', '06', '07', '08', '09', // SP capital
               '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', // SP interior
               '20', '21', '22', '23', '24', '25', '26', '27', '28', // RJ / ES
               '29', // ES
               '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', // MG
               '80', '81', '82', '83', '84', '85', '86', '87', // PR
               '88', '89', // SC
               '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', // RS
    ],
  },
  {
    nome: 'Centro-Oeste',
    valor: 19.9,
    prazo: '5 a 7 dias úteis',
    prefixos: ['70', '71', '72', '73', // DF
               '74', '75', '76', // GO
               '77', // TO (parte)
               '78', '79', // MT / MS
    ],
  },
  {
    nome: 'Norte / Nordeste',
    valor: 29.9,
    prazo: '7 a 12 dias úteis',
    prefixos: ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49', // BA
               '50', '51', '52', '53', '54', '55', '56', // PE / AL / SE
               '57', '58', '59', // PB / RN / CE (parte)
               '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', // CE / PI / MA / PA / AP / AM
    ],
  },
];

const CEP_REGEX = /^\d{5}-?\d{3}$/;

export type ResultadoFrete =
  | { tipo: 'valido'; faixa: FaixaFrete }
  | { tipo: 'cep_invalido' }
  | { tipo: 'regiao_nao_coberta' };

export function calcularFrete(cep: string): ResultadoFrete {
  const cepLimpo = cep.replace('-', '').trim();
  if (!CEP_REGEX.test(cep) && !/^\d{8}$/.test(cepLimpo)) {
    return { tipo: 'cep_invalido' };
  }
  const prefixo = cepLimpo.substring(0, 2);
  const faixa = FAIXAS_FRETE.find((f) => f.prefixos.includes(prefixo));
  if (!faixa) return { tipo: 'regiao_nao_coberta' };
  return { tipo: 'valido', faixa };
}
