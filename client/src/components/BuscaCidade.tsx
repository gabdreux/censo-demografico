import { useState, useEffect } from 'react';
import { Search, MapPin, PieChart, Users } from 'lucide-react';
import { api } from '../services/api';
import type { MunicipioBusca, MunicipioDetalhe } from '../services/api';

export function BuscaCidade() {
    const [busca, setBusca] = useState('');
    const [sugestoes, setSugestoes] = useState<MunicipioBusca[]>([]);
    const [municipioSelecionado, setMunicipioSelecionado] = useState<MunicipioDetalhe | null>(null);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (busca.length >= 2) {
                api.get<MunicipioBusca[]>(`/municipios/busca?q=${busca}`)
                    .then(res => setSugestoes(res.data))
                    .catch(console.error);
            } else {
                setSugestoes([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [busca]);

    const selecionarMunicipio = async (cd_mun: string) => {
        setCarregando(true);
        setSugestoes([]);
        try {
            const response = await api.get<MunicipioDetalhe>(`/municipios/${cd_mun}`);
            setMunicipioSelecionado(response.data);
            setBusca(`${response.data.nm_mun} - ${response.data.nm_uf}`);
        } catch (err) {
            console.error(err);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="relative max-w-xl mx-auto">
                <label className="block text-sm font-semibold mb-2 text-slate-700">Digite o nome do município:</label>
                <div className="relative">
                    <input
                        type="text"
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                        placeholder="Ex: São Paulo, Cruzeiro, Campinas..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>

                {sugestoes.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {sugestoes.map(s => (
                            <li
                                key={s.cd_mun}
                                onClick={() => selecionarMunicipio(s.cd_mun)}
                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b last:border-0 border-slate-100"
                            >
                                <span className="font-medium text-slate-700">{s.nm_mun}</span>
                                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-semibold">{s.nm_uf}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {carregando && <div className="text-center py-8 text-slate-500">Carregando dados do município...</div>}

            {municipioSelecionado && !carregando && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
                    <div className="border-b pb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">{municipioSelecionado.nm_mun}</h2>
                            <p className="text-slate-500 text-sm">{municipioSelecionado.nm_uf} - Código IBGE: {municipioSelecionado.cd_mun}</p>
                        </div>
                        <MapPin className="h-8 w-8 text-blue-600" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <p className="text-sm text-slate-500 font-medium">População Total</p>
                            <p className="text-2xl font-bold text-blue-700 mt-1">{municipioSelecionado.populacao_total.toLocaleString('pt-BR')} hab</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <p className="text-sm text-slate-500 font-medium">Área Territorial</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">{municipioSelecionado.area_total.toFixed(2)} km²</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <p className="text-sm text-slate-500 font-medium">Densidade Demográfica</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">{municipioSelecionado.densidade_demografica.toFixed(2)} hab/km²</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="border p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                <PieChart className="h-5 w-5 text-blue-600" /> Setores Censitários ({municipioSelecionado.total_setores})
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Setores Urbanos:</span>
                                    <span className="font-semibold">{municipioSelecionado.setores_urbanos}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Setores Rurais:</span>
                                    <span className="font-semibold">{municipioSelecionado.setores_rurais}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" /> Distribuição por Sexo
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Homens:</span>
                                    <span className="font-semibold">{municipioSelecionado.total_homens.toLocaleString('pt-BR')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Mulheres:</span>
                                    <span className="font-semibold">{municipioSelecionado.total_mulheres.toLocaleString('pt-BR')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}