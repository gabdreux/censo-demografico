import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { UF, EstadoDetalhe } from '../services/api';

export function BuscaEstado() {
  const [ufs, setUfs] = useState<UF[]>([]);
  const [ufSelecionada, setUfSelecionada] = useState<string>('');
  const [dadosEstado, setDadosEstado] = useState<EstadoDetalhe | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    api.get<UF[]>('/ufs').then(res => setUfs(res.data)).catch(console.error);
  }, []);

  const selecionarEstado = async (cd_uf: string) => {
    setUfSelecionada(cd_uf);
    if (!cd_uf) {
      setDadosEstado(null);
      return;
    }
    setCarregando(true);
    try {
      const response = await api.get<EstadoDetalhe>(`/ufs/${cd_uf}`);
      setDadosEstado(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-xl mx-auto">
        <label className="block text-sm font-semibold mb-2 text-slate-700">Selecione uma Unidade Federativa (UF):</label>
        <select
          value={ufSelecionada}
          onChange={e => selecionarEstado(e.target.value)}
          className="w-full py-3 px-4 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o Estado...</option>
          {ufs.map(uf => (
            <option key={uf.cd_uf} value={uf.cd_uf}>
              {uf.nm_uf} ({uf.cd_uf})
            </option>
          ))}
        </select>
      </div>

      {carregando && <div className="text-center py-8 text-slate-500">Carregando dados do estado...</div>}

      {dadosEstado && !carregando && (
        <div className="space-y-6">
          <div className="bg-blue-900 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">{dadosEstado.estado.nm_uf}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-100">
              <div>
                <span className="text-xs text-blue-200 block uppercase tracking-wider font-semibold">População Total</span>
                <span className="text-2xl font-bold">{dadosEstado.estado.populacao_total.toLocaleString('pt-BR')}</span>
              </div>
              <div>
                <span className="text-xs text-blue-200 block uppercase tracking-wider font-semibold">Área Total</span>
                <span className="text-2xl font-bold">{dadosEstado.estado.area_total.toFixed(2)} km²</span>
              </div>
              <div>
                <span className="text-xs text-blue-200 block uppercase tracking-wider font-semibold">Densidade Média</span>
                <span className="text-2xl font-bold">{dadosEstado.estado.densidade_demografica.toFixed(2)} hab/km²</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-800">Municípios Ranqueados por Densidade Demográfica</h3>
              <p className="text-xs text-slate-500">Do mais denso para o menos denso ({dadosEstado.municipios.length} municípios)</p>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500 sticky top-0">
                  <tr>
                    <th className="px-6 py-3">Posição</th>
                    <th className="px-6 py-3">Município</th>
                    <th className="px-6 py-3 text-right">População</th>
                    <th className="px-6 py-3 text-right">Área (km²)</th>
                    <th className="px-6 py-3 text-right">Densidade (hab/km²)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dadosEstado.municipios.map((m, index) => (
                    <tr key={m.cd_mun} className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-semibold text-slate-400">#{index + 1}</td>
                      <td className="px-6 py-3 font-medium text-slate-800">{m.nm_mun}</td>
                      <td className="px-6 py-3 text-right">{m.populacao_total.toLocaleString('pt-BR')}</td>
                      <td className="px-6 py-3 text-right">{m.area_total.toFixed(2)}</td>
                      <td className="px-6 py-3 text-right font-semibold text-blue-700">
                        {m.densidade_demografica.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}