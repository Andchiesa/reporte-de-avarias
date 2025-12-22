import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, Legend, LabelList
} from 'recharts';
import { 
  ChevronRight, ChevronLeft, AlertTriangle, 
  TrendingUp, TrendingDown, CheckCircle, Target, 
  Package, AlertOctagon, RotateCw, Shield, User, Users, ArrowRight,
  ThumbsUp, Award, Activity, Crown, Calendar, LogOut, Settings, Database
} from 'lucide-react';

// ==========================================
// 🗄️ BANCO DE DADOS (HISTÓRICO MENSAL)
// ==========================================

const HISTORICO_MENSAL = {
  "2025-11": {
    titulo: "Novembro 2025",
    mes: "Novembro",
    ano: "2025",
    kpis: { bruto: 211, recuperado: 137, perda: 74, taxa: "65%" },
    lideres: [
      { nome: 'Marcelo', valor: 72, turno: 'T1/T3', cor: '#DC2626' },
      { nome: 'Leonardo', valor: 70, turno: 'T3', cor: '#10B981' },
      { nome: 'Dione', valor: 68, turno: 'T1/T2', cor: '#EE4D2D' },
      { nome: 'Igor Pinto', valor: 1, turno: 'T1', cor: '#94A3B8' },
    ],
    semanas: [
      { name: 'S1', perda: 20, rec: 40 },
      { name: 'S2', perda: 25, rec: 55 },
      { name: 'S3', perda: 15, rec: 35 },
      { name: 'S4', perda: 14, rec: 7 },
    ],
    pareto: [
      { name: 'Emb.', value: 90, cor: '#10B981' },
      { name: 'Vidro', value: 45, cor: '#EE4D2D' },
      { name: 'Liquido', value: 35, cor: '#F97316' },
      { name: 'Sólida', value: 30, cor: '#94A3B8' },
      { name: 'Outros', value: 11, cor: '#E2E8F0' },
    ],
    analise: {
      tendencia: "Redução de volume na última semana do mês. Eficiência de recuperação subiu 8% vs Outubro.",
      ofensores: "Liderança de avarias dividida igualmente entre Marcelo, Leonardo e Dione. Marcelo assumiu leve liderança no T1.",
      paretoAnalysis: "Itens de Embalagem representam o maior volume, porém com 100% de recuperação. Vidro continua sendo o maior descarte.",
      acao: [
        { tipo: 'alert', txt: 'Manter foco em Segregação de Vidros', cor: 'red' },
        { tipo: 'activity', txt: 'Treinamento de Reembalagem (Time Igor)', cor: 'orange' },
        { tipo: 'shield', txt: 'Meta Dezembro: Manter taxa > 65%', cor: 'green' }
      ]
    }
  },
  "2025-10": {
    titulo: "Outubro 2025",
    mes: "Outubro",
    ano: "2025",
    kpis: { bruto: 840, recuperado: 477, perda: 363, taxa: "57%" },
    lideres: [
      { nome: 'Dione', valor: 137, turno: 'T1', cor: '#EE4D2D' },
      { nome: 'Marcelo', valor: 119, turno: 'T3', cor: '#DC2626' },
      { nome: 'Leonardo', valor: 79, turno: 'T2', cor: '#10B981' },
      { nome: 'Lorran', valor: 28, turno: 'T3/T4', cor: '#94A3B8' },
    ],
    semanas: [
      { name: 'S1', perda: 26, rec: 38 },
      { name: 'S2', perda: 65, rec: 91 },
      { name: 'S3', perda: 59, rec: 139 },
      { name: 'S4', perda: 113, rec: 97 },
      { name: 'S5', perda: 100, rec: 112 },
    ],
    pareto: [
      { name: 'Vidro', value: 185, cor: '#EE4D2D' },
      { name: 'Líquido', value: 99, cor: '#F97316' },
      { name: 'Sólida', value: 36, cor: '#94A3B8' },
      { name: 'Emb.', value: 22, cor: '#CBD5E1' },
      { name: 'Outros', value: 21, cor: '#E2E8F0' },
    ],
    analise: {
      tendencia: "Agravamento nas semanas 4 e 5. Volume de perdas superou a recuperação.",
      ofensores: "Dione (T1) é o maior ofensor individual. Turno 3 tem maior soma total.",
      paretoAnalysis: "O problema não é embalagem (recuperamos). O problema é quebra de material frágil.",
      acao: [
        { tipo: 'alert', txt: 'Blitz T1 e T3 - Foco Vidros', cor: 'red' },
        { tipo: 'activity', txt: 'Auditoria Semana 4 (Peak)', cor: 'orange' },
        { tipo: 'shield', txt: 'Padronizar processos do T2', cor: 'green' }
      ]
    }
  }
};

// ==========================================
// 🧩 COMPONENTES DE INTERFACE
// ==========================================

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 ${className}`}>
    {children}
  </div>
);

// --- TELA INICIAL: PORTAL DE SELEÇÃO ---
const DashboardHome = ({ onSelect }) => {
  const mesesDisponiveis = Object.keys(HISTORICO_MENSAL).sort().reverse();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center md:text-left">
          <div className="space-y-2">
            <img src="https://i.imgur.com/b7GK1hW.png" alt="Shopee" className="h-12 mx-auto md:mx-0" />
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Portal de Resultados <span className="text-[#EE4D2D]">Inventory</span></h1>
            <p className="text-slate-500 font-medium">Selecione o relatório mensal para apresentação</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-bold border border-orange-100 flex items-center gap-2">
                <Database size={16} /> {mesesDisponiveis.length} Relatórios Salvos
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mesesDisponiveis.map(key => {
            const data = HISTORICO_MENSAL[key];
            return (
              <button 
                key={key}
                onClick={() => onSelect(data)}
                className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-orange-500 hover:shadow-2xl transition-all duration-500 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Calendar size={80} />
                </div>
                <div className="bg-orange-50 text-orange-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{data.mes}</h3>
                <p className="text-slate-400 font-bold mb-6">{data.ano}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>Perda Real</span>
                    <span className="text-slate-800">{data.kpis.perda} itens</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#EE4D2D] h-full" style={{ width: `${(data.kpis.perda / data.kpis.bruto) * 100}%` }}></div>
                  </div>
                  <p className="text-[10px] text-green-600 font-bold">{data.kpis.taxa} Eficiência (Recuperados)</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-orange-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Abrir Apresentação</span>
                  <ChevronRight className="text-slate-300 group-hover:text-orange-500" />
                </div>
              </button>
            )
          })}
          
          {/* Card de Novo Mês (Placeholder) */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center opacity-60">
             <div className="bg-slate-200 text-slate-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Settings size={24} />
             </div>
             <p className="text-slate-500 font-bold text-sm">Dezembro 2025</p>
             <p className="text-slate-400 text-xs">Aguardando fechamento</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APRESENTAÇÃO (SISTEMA DE SLIDES) ---
const PresentationView = ({ data, onBack }) => {
  const [slide, setSlide] = useState(0);

  const getActionIcon = (tipo) => {
    switch (tipo) {
      case 'alert': return <AlertOctagon size={32}/>;
      case 'activity': return <Activity size={32}/>;
      default: return <Shield size={32}/>;
    }
  };

  const slides = [
    // Slide 1: Capa
    <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-orange-500 blur-[60px] opacity-20 animate-blob"></div>
        <img src="https://i.imgur.com/b7GK1hW.png" alt="Logo" className="relative h-24 md:h-40 object-contain" />
      </div>
      <h1 className="text-4xl md:text-7xl font-black text-slate-800">Relatório de <span className="text-[#EE4D2D]">Avarias</span></h1>
      <p className="text-xl md:text-3xl text-slate-400 font-medium mt-4">{data.mes} de {data.ano}</p>
      <div className="mt-12 bg-white px-8 py-3 rounded-full shadow-sm border border-slate-100 text-slate-500 font-bold uppercase tracking-widest text-xs">Inventory Team • HUB Operations</div>
    </div>,

    // Slide 2: Eficiência
    <div className="h-full flex flex-col p-6 md:p-12 overflow-y-auto">
      <h2 className="text-3xl font-black text-slate-800 mb-12 border-l-8 border-[#EE4D2D] pl-6 uppercase">Eficiência Operacional</h2>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center flex-1 pb-10">
        <Card className="w-full md:w-1/3 text-center border-t-4 border-slate-300 h-64 flex flex-col justify-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Ocorrências</p>
            <p className="text-5xl font-black text-slate-400">{data.kpis.bruto}</p>
        </Card>
        <ArrowRight className="hidden md:block text-slate-200" size={40} />
        <Card className="w-full md:w-1/3 text-center border-t-4 border-green-500 h-72 flex flex-col justify-center bg-green-50/30">
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Recuperados</p>
            <p className="text-6xl font-black text-green-600">{data.kpis.recuperado}</p>
            <p className="mt-4 inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-black">{data.kpis.taxa} Eficiência</p>
        </Card>
        <ArrowRight className="hidden md:block text-slate-200" size={40} />
        <Card className="w-full md:w-1/3 text-center border-t-8 border-[#EE4D2D] h-80 flex flex-col justify-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Target size={100} /></div>
            <p className="text-xs font-bold text-[#EE4D2D] uppercase tracking-widest mb-2">Perda Real</p>
            <p className="text-7xl font-black text-slate-800">{data.kpis.perda}</p>
        </Card>
      </div>
    </div>,

    // Slide 3: Tendência Semanal
    <div className="h-full flex flex-col p-6 md:p-12">
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase">Evolução Semanal</h2>
        <p className="text-slate-400 font-bold mb-8 italic">Comparativo entre itens recuperados e descarte real</p>
        <div className="flex-1 bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.semanas} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                    <Legend verticalAlign="top" height={40} iconType="circle" />
                    <Bar name="Recuperados" dataKey="rec" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={40} />
                    <Bar name="Perda Real" dataKey="perda" stackId="a" fill="#EE4D2D" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="mt-6 flex items-center gap-4 bg-orange-50 p-4 rounded-2xl border border-orange-100">
            <AlertTriangle className="text-orange-600 shrink-0" size={28} />
            <p className="text-sm font-bold text-orange-800">{data.analise.tendencia}</p>
        </div>
    </div>,

    // Slide 4: Líderes
    <div className="h-full flex flex-col p-6 md:p-12 overflow-y-auto">
        <h2 className="text-3xl font-black text-slate-800 mb-8 text-center uppercase tracking-tighter">Ranking de Ofensores (Gestão)</h2>
        <div className="max-w-3xl mx-auto w-full space-y-4 pb-12">
            {data.lideres.map((l, idx) => (
                <div key={idx} className="flex items-center bg-white p-5 rounded-2xl shadow-sm border-l-8 transition-transform hover:scale-[1.02]" style={{borderColor: l.cor}}>
                    <div className="text-2xl font-black text-slate-200 mr-6 w-8 italic">#{idx+1}</div>
                    <div className={`p-3 rounded-full mr-4 ${idx === 0 ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-400'}`}>
                        {idx === 0 ? <Crown size={24} /> : <User size={24} />}
                    </div>
                    <div className="flex-1">
                        <p className="text-xl font-black text-slate-800 leading-tight">{l.nome}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{l.turno}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-slate-800">{l.valor}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Avarias</p>
                    </div>
                </div>
            ))}
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center text-sm font-bold text-blue-800 mt-6 italic">
               "{data.analise.ofensores}"
            </div>
        </div>
    </div>,

    // Slide 5: Pareto
    <div className="h-full flex flex-col p-6 md:p-12 overflow-y-auto">
        <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase border-l-8 border-orange-500 pl-6">O que estamos perdendo?</h2>
        <div className="flex flex-col md:flex-row gap-8 flex-1">
            <div className="flex-1 h-[350px] bg-white rounded-3xl p-6 border border-slate-50 shadow-inner">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data.pareto} margin={{ top: 5, right: 60, left: 0, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={60} axisLine={false} tickLine={false} tick={{fontWeight: 'bold', fontSize: 12}} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={35}>
                            {data.pareto.map((e, i) => <Cell key={i} fill={e.cor} />)}
                            <LabelList dataKey="value" position="right" formatter={(v) => `${v} (${((v/data.kpis.bruto)*100).toFixed(0)}%)`} style={{fontWeight: 'bold', fontSize: 12}} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="md:w-1/3 flex flex-col justify-center gap-6">
                <div className="bg-red-50 p-6 rounded-3xl border border-red-100 text-center">
                    <AlertOctagon size={40} className="text-red-600 mx-auto mb-4" />
                    <p className="text-4xl font-black text-red-700">{(( (data.pareto[1]?.value || 0) + (data.pareto[2]?.value || 0) ) / data.kpis.perda * 100).toFixed(0)}%</p>
                    <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Vidro + Líquido</p>
                </div>
                <p className="text-slate-500 font-medium italic leading-relaxed text-sm">"{data.analise.paretoAnalysis}"</p>
            </div>
        </div>
    </div>,

    // Slide 6: Plano de Ação
    <div className="h-full flex flex-col p-6 md:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-black text-slate-800 uppercase italic">Plano de Ação <span className="text-orange-600">Sequencial</span></h2>
            <ThumbsUp size={40} className="text-green-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.analise.acao.map((item, idx) => (
                <div key={idx} className={`p-8 rounded-3xl border-l-8 bg-white shadow-xl flex flex-col items-center text-center gap-4 transition-transform hover:scale-105 ${item.cor === 'red' ? 'border-red-500' : item.cor === 'orange' ? 'border-orange-500' : 'border-green-500'}`}>
                    <div className={`p-4 rounded-full ${item.cor === 'red' ? 'bg-red-50 text-red-600' : item.cor === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                        {getActionIcon(item.tipo)}
                    </div>
                    <p className="text-lg font-black text-slate-800 leading-tight">{item.txt}</p>
                </div>
            ))}
        </div>
        <div className="mt-auto pt-12 text-center">
            <p className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Vamos com tudo!</p>
            <p className="text-slate-400 font-bold mt-2">Inventory Team Shopee Xpress</p>
        </div>
    </div>
  ];

  return (
    <div className="h-screen w-full bg-slate-100 flex items-center justify-center p-0 md:p-6 font-sans">
      <div className="w-full max-w-6xl h-full md:h-[650px] bg-white md:rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative border-4 border-white">
        
        {/* Barra de Topo */}
        <div className="h-14 flex items-center justify-between px-8 border-b border-slate-50 shrink-0 z-20">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-600 font-bold text-xs uppercase transition-colors">
                <LogOut size={16} /> Voltar ao Portal
            </button>
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{slide + 1} / {slides.length}</div>
        </div>

        {/* Área do Slide */}
        <div className="flex-1 relative bg-slate-50/30 overflow-hidden">
            {slides[slide]}
        </div>

        {/* Controles de Navegação */}
        <div className="h-20 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md shrink-0 border-t border-slate-50 z-20 pb-safe">
            <button 
                onClick={() => slide > 0 && setSlide(s => s - 1)}
                disabled={slide === 0}
                className="p-3 rounded-2xl hover:bg-slate-100 text-slate-400 disabled:opacity-10 transition-all"
            >
                <ChevronLeft size={32} />
            </button>

            <div className="flex gap-2">
                {slides.map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all duration-500 ${slide === i ? 'w-10 bg-orange-600' : 'w-2 bg-slate-200'}`} />
                ))}
            </div>

            <button 
                onClick={() => slide < slides.length - 1 && setSlide(s => s + 1)}
                disabled={slide === slides.length - 1}
                className="bg-orange-600 p-3 rounded-2xl text-white shadow-lg shadow-orange-200 hover:bg-orange-700 disabled:opacity-10 transition-all"
            >
                <ChevronRight size={32} />
            </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
        @keyframes blob { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1) rotate(5deg); } }
        .animate-blob { animation: blob 10s infinite alternate ease-in-out; }
      `}</style>
    </div>
  );
};

// --- CONTROLLER PRINCIPAL ---
export default function App() {
  const [activeData, setActiveData] = useState(null);

  if (activeData) {
    return <PresentationView data={activeData} onBack={() => setActiveData(null)} />;
  }

  return <DashboardHome onSelect={setActiveData} />;
}
