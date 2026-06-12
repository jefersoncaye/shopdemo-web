import { useState, type FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { login, estaLogado } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  if (estaLogado) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    const sucesso = login(email, senha);
    setCarregando(false);
    if (sucesso) {
      navigate('/');
    } else {
      setErro('E-mail ou senha inválidos. Tente novamente.');
    }
  }

  return (
    <div className="login-page" data-testid="login-page">
      <div className="login-box">
        <h1 className="login-titulo" data-testid="login-titulo">
          ShopDemo
        </h1>
        <p className="login-subtitulo">Entre na sua conta para continuar</p>

        <form onSubmit={handleSubmit} data-testid="login-form">
          <div className="form-group">
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
              data-testid="login-email-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-senha">Senha</label>
            <input
              id="login-senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              data-testid="login-senha-input"
            />
          </div>

          {erro && (
            <div className="erro-mensagem" role="alert" data-testid="login-erro-mensagem">
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={carregando}
            data-testid="login-submit-button"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="login-dica" data-testid="login-dica">
          Use: <strong>cliente@shopdemo.com</strong> / <strong>senha123</strong>
        </p>
      </div>
    </div>
  );
}
