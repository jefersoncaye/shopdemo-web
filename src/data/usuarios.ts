export interface Usuario {
  id: string;
  email: string;
  senha: string;
  nome: string;
}

export const USUARIOS: Usuario[] = [
  {
    id: 'u1',
    email: 'cliente@shopdemo.com',
    senha: 'senha123',
    nome: 'Maria Silva',
  },
  {
    id: 'u2',
    email: 'joao@shopdemo.com',
    senha: 'senha456',
    nome: 'João Souza',
  },
];
