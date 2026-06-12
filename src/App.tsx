import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CarrinhoProvider } from './context/CarrinhoContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Catalogo } from './pages/Catalogo';
import { ProdutoDetalhe } from './pages/ProdutoDetalhe';
import { Carrinho } from './pages/Carrinho';
import { Checkout } from './pages/Checkout';
import { Confirmacao } from './pages/Confirmacao';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarrinhoProvider>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Catalogo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/produto/:id"
                element={
                  <ProtectedRoute>
                    <ProdutoDetalhe />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/carrinho"
                element={
                  <ProtectedRoute>
                    <Carrinho />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/confirmacao"
                element={
                  <ProtectedRoute>
                    <Confirmacao />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </CarrinhoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
