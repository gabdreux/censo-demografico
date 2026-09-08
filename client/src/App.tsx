import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { BuscaCidade } from './components/BuscaCidade';
import { BuscaEstado } from './components/BuscaEstado';

export function App() {
  const [abaAtiva, setAbaAtiva] = useState<'cidade' | 'estado'>('cidade');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-blue-700 text-white shadow-md py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-blue-200" />
            <h1 className="text-2xl font-bold">Censo Demográfico 2022</h1>
          </div>
          <nav className="flex bg-blue-800 p-1 rounded-lg">
            <button
              onClick={() => setAbaAtiva('cidade')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition ${
                abaAtiva === 'cidade' ? 'bg-white text-blue-800 shadow' : 'text-blue-100 hover:text-white'
              }`}
            >
              Busca por Cidade
            </button>
            <button
              onClick={() => setAbaAtiva('estado')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition ${
                abaAtiva === 'estado' ? 'bg-white text-blue-800 shadow' : 'text-blue-100 hover:text-white'
              }`}
            >
              Busca por Estado
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 py-8">
        {abaAtiva === 'cidade' ? <BuscaCidade /> : <BuscaEstado />}
      </main>
    </div>
  );
}

export default App;