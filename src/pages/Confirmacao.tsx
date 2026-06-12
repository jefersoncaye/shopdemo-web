import { useLocation, Link, Navigate } from 'react-router-dom';

interface ConfirmacaoState {
  numeroPedido: string;
  total: number;
  frete: number;
  desconto: number;
}

export function Confirmacao() {
  const location = useLocation();
  const state = location.state as ConfirmacaoState | null;

  if (!state || !state.numeroPedido) {
    return <Navigate to="/" replace />;
  }

  const { numeroPedido, total, frete, desconto } = state;

  return (
    <div className="confirmacao-page" data-testid="confirmacao-page">
      <div className="confirmacao-box">
        <div className="confirmacao-icone" data-testid="confirmacao-icone" aria-hidden="true">
          ✓
        </div>

        <h1 className="confirmacao-titulo" data-testid="confirmacao-titulo">
          Pedido confirmado!
        </h1>

        <p className="confirmacao-subtitulo">
          Obrigado pela sua compra. Seu pedido foi recebido e está sendo processado.
        </p>

        <div className="confirmacao-detalhe" data-testid="confirmacao-detalhe">
          <div className="confirmacao-numero-wrap">
            <span className="confirmacao-numero-label">Número do pedido:</span>
            <strong className="confirmacao-numero-pedido" data-testid="confirmacao-numero-pedido">
              {numeroPedido}
            </strong>
          </div>

          <div
            className="confirmacao-status"
            data-testid="confirmacao-status"
          >
            Aguardando processamento
          </div>

          <div className="confirmacao-valores">
            {desconto > 0 && (
              <p data-testid="confirmacao-desconto">
                Desconto aplicado:{' '}
                {desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            )}
            {frete > 0 && (
              <p data-testid="confirmacao-frete">
                Frete:{' '}
                {frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            )}
            <p className="confirmacao-total" data-testid="confirmacao-total">
              <strong>
                Total pago:{' '}
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </strong>
            </p>
          </div>
        </div>

        <Link to="/" className="btn-primary" data-testid="confirmacao-continuar-comprando-link">
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}
