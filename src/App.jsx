import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell, Legend, LabelList
} from 'recharts';
import { 
  ChevronRight, ChevronLeft, AlertTriangle, 
  TrendingUp, TrendingDown, CheckCircle, Target, 
  Package, AlertOctagon, Box, RotateCw, Shield, User, Users, ArrowRight,
  ThumbsUp, Award, Activity, Crown, Calendar, LayoutGrid, LogOut
} from 'lucide-react';

// ==========================================
// 🗄️ BANCO DE DADOS (EDITE AQUI MENSALMENTE)
// ==========================================

const DATABASE = {
  // --- DADOS DE OUTUBRO (JÁ PREENCHIDOS) ---
  "2025-10": {
    monthName: "Outubro",
    year: "2025",
    leaders: [
      { name: 'Dione', value: 137, shift: 'T1', color: '#EE4D2D' },
      { name: 'Marcelo', value: 119, shift: 'T3', color: '#DC2626' },
      { name: 'Leonardo', value: 79, shift: 'T2', color: '#10B981' },
      { name: 'Lorran', value: 28, shift: 'T3/T4', color: '#94A3B8' },
    ],
    types: [
      { name: 'Vidro', value: 185, color: '#EE4D2D' }, 
      { name: 'Líquido', value: 99, color: '#F97316' },
      { name: 'Sólida', value: 36, color: '#94A3B8' },
      { name: 'Emb.', value: 22, color: '#CBD5E1' }, 
      { name: 'Outros', value: 21, color: '#E2E8F0' },
    ],
    weeks: [
      { name: 'S1', perda: 26, recuperados: 38 },
      { name: 'S2', perda: 65, recuperados: 91 },
      { name: 'S3', perda: 59, recuperados: 139 },
      { name: 'S4', perda: 113, recuperados: 97 },
      { name: 'S5', perda: 100, recuperados: 112 }, 
    ],
    shifts: [
      { name: 'T1', value: 139, color: '#EE4D2D', leader: 'Dione' },
      { name: 'T2', value: 76, color: '#10B981', leader: 'Leonardo' },
      { name: 'T3', value: 144, color: '#DC2626', leader: 'Marcelo/Lorran' },
      { name: 'T4', value: 4, color: '#94A3B8', leader: '-' },
    ],
    kpis: {
      bruto: 840,
      recuperado: 477,
      perda: 363,
      percentualSalvo: "57%"
    },
    conclusions: {
      trendText: "Nas semanas 4 e 5, o volume de Perdas superou ou igualou os Recuperados.",
      leaderAnalysis: "O Turno 1 (Dione) é o maior ofensor individual (137). T3 somado é o maior turno.",
      paretoAnalysis: "O problema não é embalagem (recuperamos). O problema é quebra de material frágil.",
      planItems: [
        { icon: 'alert', text: "Blitz T1 e T3 (Foco Vidros)", color: "red" },
        { icon: 'activity', text: "Investigar Aumento Semanas 4 e 5", color: "orange" },
        { icon: 'shield', text: "Manter alta recuperação", color: "green" }
      ]
    }
  },

  // --- DADOS DE NOVEMBRO (MODELO PARA PREENCHER) ---
  "2025-11": {
    monthName: "Novembro",
    year: "2025",
    leaders: [
      { name: 'Líder A', value: 0, shift: 'T1', color: '#EE4D2D' },
      { name: 'Líder B', value: 0, shift: 'T3', color: '#DC2626' },
      { name: 'Líder C', value: 0, shift: 'T2', color: '#10B981' },
      { name: 'Líder D', value: 0, shift: 'T4', color: '#94A3B8' },
    ],
    types: [
      { name: 'Vidro', value: 0, color: '#EE4D2D' }, 
      { name: 'Líquido', value: 0, color: '#F97316' },
      { name: 'Sólida', value: 0, color: '#94A3B8' },
      { name: 'Emb.', value: 0, color: '#CBD5E1' }, 
      { name: 'Outros', value: 0, color: '#E2E8F0' },
    ],
    weeks: [
      { name: 'S1', perda: 0, recuperados: 0 },
      { name: 'S2', perda: 0, recuperados: 0 },
      { name: 'S3', perda: 0, recuperados: 0 },
      { name: 'S4', perda: 0, recuperados: 0 },
    ],
    shifts: [
      { name: 'T1', value: 0, color: '#EE4D2D', leader: 'Nome' },
      { name: 'T2', value: 0, color: '#10B981', leader: 'Nome' },
      { name: 'T3', value: 0, color: '#DC2626', leader: 'Nome' },
      { name: 'T4', value: 0, color: '#94A3B8', leader: '-' },
    ],
    kpis: {
      bruto: 0,
      recuperado: 0,
      perda: 0,
      percentualSalvo: "0%"
    },
    conclusions: {
      trendText: "Texto sobre a tendência do mês...",
      leaderAnalysis: "Texto sobre os líderes...",
      paretoAnalysis: "Texto sobre os tipos de avaria...",
      planItems: [
        { icon: 'alert', text: "Ação 1", color: "red" },
        { icon: 'activity', text: "Ação 2", color: "orange" },
        { icon: 'shield', text: "Ação 3", color: "green" }
      ]
    }
  }
};

// ==========================================
// 🧩 COMPONENTES DO SISTEMA
// ==========================================

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 ${className}`}>
    {children}
  </div>
);

// --- TELA DE DASHBOARD (MENU) ---
const DashboardMenu = ({ onSelectMonth }) => {
  const availableMonths = Object.keys(DATABASE).sort().reverse(); // Mais recente primeiro

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-fadeIn">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 space-y-4">
          <div className="relative inline-block group">
             <div className="absolute inset-0 bg-orange-500 blur-[30px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
             <img src="https://i.imgur.com/b7GK1hW.png" alt="Shopee" className="h-20 relative z-10" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800">Portal de Resultados</h1>
          <p className="text-slate-500">Selecione o período para visualizar a apresentação</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableMonths.map(key => {
            const item = DATABASE[key];
            const isFuture = item.kpis.bruto === 0; // Se estiver zerado, consideramos não preenchido

            return (
              <button
                key={key}
                onClick={() => onSelectMonth(key)}
                className={`group relative overflow-hidden p-6 rounded-2xl border transition-all duration-300 text-left ${
                   isFuture 
                   ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed' 
                   : 'bg-white border-slate-200 hover:border-orange-500 hover:shadow-xl cursor-pointer'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${isFuture ? 'bg-slate-200' : 'bg-orange-50 text-orange-600'}`}>
                    <Calendar size={24} />
                  </div>
                  {!isFuture && <ChevronRight className="text-slate-300 group-hover:text-orange-500 transition-colors" />}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{item.monthName}</h3>
                <p className="text-slate-500 font-medium">{item.year}</p>

                {!isFuture && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex gap-4 text-xs text-slate-400">
                    <span>{item.kpis.perda} Perdas</span>
                    <span>•</span>
                    <span>{item.kpis.percentualSalvo} Recup.</span>
                  </div>
                )}
                
                {isFuture && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                    <span className="bg-slate-200 text-slate-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Em Breve
                    </span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

// --- APRESENTAÇÃO (SLIDES) ---
const Presentation = ({ data, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mapeamento dos ícones para o plano de ação
  const getIcon = (type) => {
    if (type === 'alert') return <AlertOctagon size={20} className="text-[#EE4D2D]" />;
    if (type === 'activity') return <Activity size={20} className="text-orange-500" />;
    return <Shield size={20} className="text-green-500" />;
  };

  const slides = [
    // 1. CAPA
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 md:space-y-8 animate-fadeIn p-4">
      <div className="relative w-full max-w-[200px] md:max-w-md group cursor-pointer">
        <div className="absolute inset-0 bg-orange-500 blur-[50px] rounded-full animate-blob opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <img src="https://i.imgur.com/b7GK1hW.png" alt="Shopee Xpress" className="relative z-10 mx-auto h-24 md:h-40 object-contain drop-shadow-2xl transform transition-transform duration-700 ease-in-out group-hover:scale-105" />
      </div>
      <div className="space-y-2 z-10">
        <h1 className="text-3xl md:text-6xl font-extrabold text-slate-800 tracking-tight">
          Relatório de <span className="text-[#EE4D2D]">Avarias</span>
        </h1>
        <div className="h-1.5 w-16 md:w-24 bg-[#EE4D2D] mx-auto rounded-full"></div>
        <h2 className="text-lg md:text-2xl text-slate-500 font-medium">{data.monthName} {data.year}</h2>
      </div>
      <div className="mt-8 bg-white/90 backdrop-blur-sm border border-slate-200 px-6 py-3 rounded-full shadow-sm animate-pulse-slow">
        <p className="text-slate-600 font-semibold text-sm md:text-base">Foco: Ocorrências HUB</p>
      </div>
    </div>,

    // 2. FUNIL
    <div className="h-full flex flex-col px-4 md:px-12 py-4 overflow-y-auto">
      <div className="shrink-0 mb-6 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800 border-l-8 border-[#EE4D2D] pl-4">Eficiência Operacional</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:justify-center h-auto md:h-full pb-20 md:pb-0">
        <Card className="w-full md:w-1/3 flex flex-row md:flex-col justify-between items-center min-h-[120px] md:h-64 border-t-4 border-slate-300">
          <div className="text-left md:text-center">
            <div className="flex items-center md:justify-center gap-2 text-slate-500 mb-1">
              <Package size={20} /><span className="font-bold text-xs uppercase tracking-wider">Total Bruto</span>
            </div>
            <div className="text-3xl md:text-5xl font-bold text-slate-400">{data.kpis.bruto}</div>
          </div>
          <div className="text-right md:text-center text-xs text-slate-400">Itens segregados.</div>
        </Card>
        <ArrowRight className="hidden md:block text-slate-300" size={48} /><TrendingDown className="md:hidden text-slate-300 my-2" size={32} />
        <Card className="w-full md:w-1/3 flex flex-row md:flex-col justify-between items-center min-h-[120px] md:h-72 border-t-4 border-green-500 bg-green-50">
          <div className="text-left md:text-center">
            <div className="flex items-center md:justify-center gap-2 text-green-700 mb-1">
              <RotateCw size={20} /><span className="font-bold text-xs uppercase tracking-wider">Recuperados</span>
            </div>
            <div className="text-4xl md:text-6xl font-bold text-green-600">{data.kpis.recuperado}</div>
            <div className="mt-1 md:mt-2 inline-block bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs font-bold">{data.kpis.percentualSalvo} Salvos</div>
          </div>
          <div className="text-right md:text-center text-xs text-green-700">Reintegrados.</div>
        </Card>
        <ArrowRight className="hidden md:block text-slate-300" size={48} /><TrendingDown className="md:hidden text-slate-300 my-2" size={32} />
        <Card className="w-full md:w-1/3 flex flex-row md:flex-col justify-between items-center min-h-[120px] md:h-80 border-t-8 border-[#EE4D2D] shadow-xl">
          <div className="text-left md:text-center">
            <div className="flex items-center md:justify-center gap-2 text-[#EE4D2D] mb-1">
              <Target size={20} /><span className="font-bold text-xs uppercase tracking-wider">Perda Real</span>
            </div>
            <div className="text-5xl md:text-8xl font-extrabold text-slate-800">{data.kpis.perda}</div>
          </div>
          <div className="text-right md:text-center bg-orange-50 p-2 rounded md:w-full"><p className="text-xs text-orange-800 font-medium">Itens descartados.</p></div>
        </Card>
      </div>
    </div>,

    // 3. TENDÊNCIA
    <div className="h-full flex flex-col px-4 md:px-12 py-4 overflow-y-auto">
      <div className="mb-4 shrink-0">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Evolução Semanal</h2>
        <p className="text-sm md:text-base text-slate-500">Comparativo: Perda vs Recuperação</p>
      </div>
      <div className="w-full h-[300px] bg-white rounded-2xl p-2 md:p-4 shadow-sm border border-slate-100 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.weeks} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip contentStyle={{borderRadius: '12px'}} />
            <Legend verticalAlign="top" height={36} iconType="circle"/>
            <Bar name="Recuperados" dataKey="recuperados" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={40} />
            <Bar name="Perda Real" dataKey="perda" stackId="a" fill="#EE4D2D" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100 flex items-center gap-3 shrink-0">
        <AlertTriangle className="text-orange-600 shrink-0" size={24} />
        <p className="text-xs md:text-sm text-orange-800"><strong>Análise:</strong> {data.conclusions.trendText}</p>
      </div>
    </div>,

    // 4. LÍDERES
    <div className="h-full flex flex-col px-4 md:px-12 py-4 overflow-y-auto">
      <div className="shrink-0 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center">Ranking de Ofensores</h2>
        <p className="text-slate-500 text-center text-sm">Gestão de Turno</p>
      </div>
      <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full pb-20 md:pb-0">
        {data.leaders.map((leader, index) => (
          <div key={index} className={`relative flex items-center p-4 bg-white rounded-xl border-l-8 shadow-sm ${index === 0 ? 'border-[#EE4D2D] ring-1 ring-orange-100' : 'border-slate-200'}`} style={{ borderLeftColor: leader.color }}>
            <div className="w-12 text-2xl font-bold text-slate-300">#{index + 1}</div>
            <div className={`p-3 rounded-full mr-4 ${index === 0 ? 'bg-orange-100 text-[#EE4D2D]' : 'bg-slate-100 text-slate-500'}`}>
              {index === 0 ? <Crown size={24} /> : <User size={24} />}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800">{leader.name}</h3>
              <p className="text-xs text-slate-500 font-semibold uppercase">{leader.shift}</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-extrabold ${index === 0 ? 'text-[#EE4D2D]' : 'text-slate-700'}`}>{leader.value}</div>
              <div className="text-xs text-slate-400">avarias</div>
            </div>
          </div>
        ))}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
          <p className="text-sm text-blue-800">{data.conclusions.leaderAnalysis}</p>
        </div>
      </div>
    </div>,

    // 5. PARETO (TIPOS)
    <div className="h-full flex flex-col px-4 md:px-12 py-4 overflow-y-auto">
      <div className="mb-4 shrink-0">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">O que está quebrando?</h2>
        <p className="text-sm text-slate-500">Pareto de Perdas Reais</p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 pb-20 md:pb-0 shrink-0">
        <div className="w-full h-[300px] bg-white rounded-xl p-2 shadow-sm border border-slate-100">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={data.types} margin={{ top: 5, right: 60, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={50} tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                {data.types.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                <LabelList dataKey="value" position="right" style={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} formatter={(val) => `${val} (${((val / data.kpis.perda) * 100).toFixed(0)}%)`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-center gap-4">
          <Card className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex items-center gap-3 mb-2"><AlertOctagon className="text-red-600" size={24} /><h3 className="text-lg font-bold text-red-800">Vidro + Líquido</h3></div>
            <div className="text-3xl font-extrabold text-red-700 mb-1">{(( (data.types[0].value + data.types[1].value) / data.kpis.perda ) * 100).toFixed(0)}%</div>
            <p className="text-xs text-red-800 leading-tight">Do total das perdas.</p>
          </Card>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{data.conclusions.paretoAnalysis}</p>
        </div>
      </div>
    </div>,

    // 6. SUCESSO
    <div className="h-full flex flex-col px-4 md:px-12 py-4 justify-center text-center overflow-y-auto">
      <div className="mb-8 shrink-0">
        <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4"><ThumbsUp size={48} className="text-green-600" /></div>
        <h2 className="text-3xl md:text-5xl font-bold text-green-700 mb-2">Está Funcionando!</h2>
        <p className="text-lg md:text-xl text-slate-500">Avarias de "Embalagem" não viram perda.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full pb-20 md:pb-0 shrink-0">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none shadow-xl">
          <div className="text-6xl font-extrabold mb-2">{data.kpis.recuperado}</div>
          <div className="text-green-100 font-medium text-lg uppercase tracking-widest">Pacotes Salvos</div>
        </Card>
        <Card className="flex flex-col justify-center items-start text-left pl-8">
          <div className="flex items-center gap-3 mb-4"><CheckCircle className="text-green-600" size={28} /><span className="text-slate-700 font-bold text-lg">Triagem Eficiente</span></div>
          <div className="flex items-center gap-3 mb-4"><CheckCircle className="text-green-600" size={28} /><span className="text-slate-700 font-bold text-lg">Reembalagem Ágil</span></div>
          <div className="flex items-center gap-3"><CheckCircle className="text-green-600" size={28} /><span className="text-slate-700 font-bold text-lg">Foco no Cliente</span></div>
        </Card>
      </div>
    </div>,

    // 7. CONCLUSÃO
    <div className="h-full flex flex-col px-4 md:px-12 py-4 overflow-y-auto">
      <div className="shrink-0 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Plano de Ação</h2>
        <p className="text-slate-500">Próximos Passos</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 h-full pb-20 md:pb-0 shrink-0">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 uppercase tracking-wider border-b pb-2">O Cenário</h3>
          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div><p className="text-xs text-slate-500 uppercase">Volume Processado</p><p className="text-xl font-bold text-slate-800">Crescimento</p></div>
            <TrendingUp className="text-green-500" size={28} />
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
            <div className="flex items-start gap-3"><Award className="text-blue-600 mt-1" size={24} /><div><h4 className="font-bold text-blue-800">Eficiência</h4><p className="text-sm text-blue-700 mt-1">Foco total em reduzir o descarte.</p></div></div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 uppercase tracking-wider border-b pb-2">Ações Prioritárias</h3>
          <ul className="space-y-3">
            {data.conclusions.planItems.map((item, idx) => (
              <li key={idx} className={`flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg border-l-4 ${item.color === 'red' ? 'border-[#EE4D2D]' : item.color === 'orange' ? 'border-orange-500' : 'border-green-500'}`}>
                {getIcon(item.icon)}
                <span className="text-sm font-medium text-slate-700">{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <div className="text-2xl md:text-4xl font-bold text-slate-800">Vamos com tudo!</div>
            <div className="text-sm text-slate-400 mt-1">Inventory Team</div>
          </div>
        </div>
      </div>
    </div>
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 font-sans text-slate-800 p-0 md:p-4">
      <div className="w-full max-w-5xl bg-white md:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-screen md:h-[600px] md:min-h-[600px] relative">
        <div className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 z-20">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors">
            <LogOut size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Voltar ao Menu</span>
          </button>
          <div className="text-[10px] md:text-xs font-medium text-slate-400">{currentSlide + 1} / {slides.length}</div>
        </div>
        <div className="flex-1 relative bg-slate-50/50 overflow-y-auto md:overflow-hidden">{slides[currentSlide]}</div>
        <div className="h-16 bg-white border-t border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 z-20 pb-safe">
          <button onClick={() => currentSlide > 0 && setCurrentSlide(c => c - 1)} disabled={currentSlide === 0} className="flex items-center gap-2 text-slate-600 disabled:opacity-30 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"><ChevronLeft size={24} /><span className="hidden md:inline text-sm font-medium">Anterior</span></button>
          <div className="flex gap-1">{slides.map((_, idx) => <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-4 md:w-8 bg-[#EE4D2D]' : 'w-1.5 md:w-2 bg-slate-200'}`} />)}</div>
          <button onClick={() => currentSlide < slides.length - 1 && setCurrentSlide(c => c + 1)} disabled={currentSlide === slides.length - 1} className="flex items-center gap-2 bg-[#EE4D2D] text-white px-4 py-2 rounded-lg hover:bg-[#d03e1f] shadow-md disabled:opacity-50 disabled:shadow-none transition-colors"><span className="hidden md:inline text-sm font-medium">Próximo</span><ChevronRight size={24} /></button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(10px, -10px) scale(1.1); } 66% { transform: translate(-10px, 10px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        .animate-blob { animation: blob 7s infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
        .animate-pulse-slow { animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
};

// --- APP PRINCIPAL (CONTROLE) ---
export default function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard' ou 'presentation'
  const [selectedData, setSelectedData] = useState(null);

  const handleSelectMonth = (monthKey) => {
    // Só abre se tiver dados (kpis.bruto > 0)
    if (DATABASE[monthKey].kpis.bruto > 0) {
      setSelectedData(DATABASE[monthKey]);
      setView('presentation');
    }
  };

  const handleBack = () => {
    setView('dashboard');
    setSelectedData(null);
  };

  if (view === 'dashboard') {
    return <DashboardMenu onSelectMonth={handleSelectMonth} />;
  }

  return <Presentation data={selectedData} onBack={handleBack} />;
}
