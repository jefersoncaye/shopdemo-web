import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrinho } from '../context/CarrinhoContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { usuario, logout, estaLogado } = useAuth();
  const { totalItens } = useCarrinho();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="layout">
      <header className="header" data-testid="header">
        <div className="header-inner">
          <Link to="/" className="logo" data-testid="logo-link">
            ShopDemo
          </Link>
          <nav className="nav" data-testid="nav">
            {estaLogado && (
              <>
                <Link to="/" data-testid="nav-catalogo-link">Catálogo</Link>
                <Link to="/carrinho" className="nav-carrinho" data-testid="nav-carrinho-link">
                  Carrinho
                  {totalItens > 0 && (
                    <span className="badge" data-testid="carrinho-badge">
                      {totalItens}
                    </span>
                  )}
                </Link>
                <span className="nav-usuario" data-testid="nav-usuario-nome">
                  Olá, {usuario?.nome.split(' ')[0]}
                </span>
                <button
                  className="btn-sair"
                  onClick={handleLogout}
                  data-testid="nav-logout-button"
                >
                  Sair
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="main" data-testid="main-content">
        {children}
      </main>
      <footer className="footer" data-testid="footer">
        <p>ShopDemo &copy; — App para fins educacionais</p>
      </footer>
    </div>
  );
}
