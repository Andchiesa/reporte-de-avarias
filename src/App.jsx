import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell, Legend, LabelList
} from 'recharts';
import { 
  ChevronRight, ChevronLeft, AlertTriangle, 
  TrendingUp, TrendingDown, CheckCircle, Target, 
  Package, AlertOctagon, Box, RotateCw, Shield, User, Users, ArrowRight,
  ThumbsUp, Award, Activity, Crown
} from 'lucide-react';

// --- DADOS REAIS (Cruzamento Realizado) ---
// T1 (139) ~= Dione (137)
// T2 (76) ~= Leonardo (79)
// T3+T4 (148) ~= Marcelo (119) + Lorran (28)

const LEADERS_RANKING = [
  { name: 'Dione', value: 137, shift: 'T1', color: '#EE4D2D' }, // Maior Ofensor Individual
  { name: 'Marcelo', value: 119, shift: 'T3', color: '#DC2626' },
  { name: 'Leonardo', value: 79, shift: 'T2', color: '#10B981' },
  { name: 'Lorran', value: 28, shift: 'T3/T4', color: '#94A3B8' },
];

const dataTypes = [
  { name: 'Vidro', value: 185, color: '#EE4D2D' }, 
  { name: 'Líquido', value: 99, color: '#F97316' },
  { name: 'Sólida', value: 36, color: '#94A3B8' },
  { name: 'Emb.', value: 22, color: '#CBD5E1' }, 
  { name: 'Outros', value: 21, color: '#E2E8F0' },
];

const dataWeeks = [
  { name: 'S1', perda: 26, recuperados: 38 },
  { name: 'S2', perda: 65, recuperados: 91 },
  { name: 'S3', perda: 59, recuperados: 139 },
  { name: 'S4', perda: 113, recuperados: 97 },
  { name: 'S5', perda: 100, recuperados: 112 }, 
];

const dataShifts = [
  { name: 'T1', value: 139, color: '#EE4D2D', leader: 'Dione' },
  { name: 'T2', value: 76, color: '#10B981', leader: 'Leonardo' },
  { name: 'T3', value: 144, color: '#DC2626', leader: 'Marcelo/Lorran' },
  { name: 'T4', value: 4, color: '#94A3B8', leader: '-' },
];

// --- COMPONENTES UI ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 ${className}`}>
    {children}
  </div>
);

// --- SLIDES ---

const SlideCover = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-6 md:space-y-8 animate-fadeIn p-4">
    {/* LOGO ANIMADA */}
    <div className="relative w-full max-w-[200px] md:max-w-md group cursor-pointer">
      <div className="absolute inset-0 bg-orange-500 blur-[50px] rounded-full animate-blob opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
      <img 
        src="https://i.imgur.com/b7GK1hW.png" 
        alt="Shopee Xpress" 
        className="relative z-10 mx-auto h-24 md:h-40 object-contain drop-shadow-2xl transform transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
    </div>
    
    <div className="space-y-2 z-10">
      <h1 className="text-3xl md:text-6xl font-extrabold text-slate-800 tracking-tight">
        Relatório de <span className="text-[#EE4D2D]">Avarias</span>
      </h1>
      <div className="h-1.5 w-16 md:w-24 bg-[#EE4D2D] mx-auto rounded-full"></div>
      <h2 className="text-lg md:text-2xl text-slate-500 font-medium">
        Outubro 2025
      </h2>
    </div>

    <div className="mt-8 bg-white/90 backdrop-blur-sm border border-slate-200 px-6 py-3 rounded-full shadow-sm animate-pulse-slow">
      <p className="text-slate-600 font-semibold text-sm md:text-base">Foco: Ocorrências HUB</p>
    </div>
  </div>
);

const SlideFunnel = () => (
  <div className="h-full flex flex-col px-4 md:px-12 py-4 overflow-y-auto">
    <div className="shrink-0 mb-6 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800 border-l-8 border-[#EE4D2D] pl-4">
        Eficiência Operacional
        </h2>
    </div>

    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:justify-center h-auto md:h-full pb-20 md:pb-0">
      
      <Card className="w-full md:w-1/3 flex flex-row md:flex-col justify-between items-center min-h-[120px] md:h-64 border-t-4 border-slate-300">
        <div className="text-left md:text-center">
          <div className="flex items-center md:justify-center gap-2 text-slate-500 mb-1">
            <Package size={20} />
            <span className="font-bold text-xs uppercase tracking-wider">Total Bruto</span>
          </div>
          <div className="text-3xl md:text-5xl font-bold text-slate-400">840</div>
        </div>
        <div className="text-right md:text-center text-xs text-slate-400 max-w-[120px] md:max-w-none">
          Itens segregados inicialmente.
        </div>
      </Card>

      <ArrowRight className="hidden md:block text-slate-300" size={48} />
      <TrendingDown className="md:hidden text-slate-300 my-2" size={32} />

      <Card className="w-full md:w-1/3 flex flex-row md:flex-col justify-between items-center min-h-[120px] md:h-72 border-t-4 border-green-500 bg-green-50">
        <div className="text-left md:text-center">
          <div className="flex items-center md:justify-center gap-2 text-green-700 mb-1">
            <RotateCw size={20} />
            <span className="font-bold text-xs uppercase tracking-wider">Recuperados</span>
          </div>
          <div className="text-4xl md:text-6xl font-bold text-green-600">477</div>
          <div className="mt-1 md:mt-2 inline-block bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs font-bold">
            57% Salvos
          </div>
        </div>
         <div className="text-right md:text-center text-xs text-green-700 max-w-[120px] md:max-w-none">
          Reintegrados ao fluxo.
        </div>
      </Card>

      <ArrowRight className="hidden md:block text-slate-300" size={48} />
      <TrendingDown className="md:hidden text-slate-300 my-2" size={32} />

      <Card className="w-full md:w-1/3 flex flex-row md:flex-col justify-between items-center min-h-[120px] md:h-80 border-t-8 border-[#EE4D2D] shadow-xl">
        <div className="text-left md:text-center">
          <div className="flex items-center md:justify-center gap-2 text-[#EE4D2D] mb-1">
            <Target size={20} />
            <span className="font-bold text-xs uppercase tracking-wider">Perda Real</span>
          </div>
          <div className="text-5xl md:text-8xl font-extrabold text-slate-800">363</div>
        </div>
        <div className="text-right md:text-center bg-orange-50 p-2 rounded md:w-full">
          <p className="text-xs text-orange-800 font-medium">
            Itens descartados (Vidro/Líquido).
          </p>
        </div>
      </Card>
    </div>
  </div>
);

const SlideTrend = () => (
  <div className="h-full flex flex-col px-4 md:px-12 py-4 overflow-y-auto">
    <div className="mb-4 shrink-0">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Evolução Semanal</h2>
        <p className="text-sm md:text-base text-slate-500">Comparativo: Perda vs Recuperação</p>
    </div>

    <div className="w-full h-[300px] bg-white rounded-2xl p-2 md:p-4 shadow-sm border border-slate-100 shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataWeeks} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
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
      <p className="text-xs md:text-sm text-orange-800">
        <strong>Atenção:</strong> Nas semanas 4 e 5, o volume de Perdas superou ou igualou os Recuperados.
      </p>
    </div>
  </div>
);

const SlideLeaderBoard = () => (
  <div className="h-full flex flex-col px-4 md:px-12 py-4 overflow-y-auto">
    <div className="shrink-0 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center">
            Ranking de Ofensores (Líderes)
        </h2>
        <p className="text-slate-500 text-center text-sm">
            Quem teve o maior número de avarias sob sua gestão?
        </p>
    </div>

    <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full pb-20 md:pb-0">
        {LEADERS_RANKING.map((leader, index) => (
            <div 
                key={index}
                className={`relative flex items-center p-4 bg-white rounded-xl border-l-8 shadow-sm transition-transform hover:scale-[1.02] ${index === 0 ? 'border-[#EE4D2D] ring-1 ring-orange-100' : 'border-slate-200'}`}
                style={{ borderLeftColor: leader.color }}
            >
                {/* Posição */}
                <div className="w-12 text-2xl font-bold text-slate-300">#{index + 1}</div>
                
                {/* Avatar/Icone */}
                <div className={`p-3 rounded-full mr-4 ${index === 0 ? 'bg-orange-100 text-[#EE4D2D]' : 'bg-slate-100 text-slate-500'}`}>
                    {index === 0 ? <Crown size={24} /> : <User size={24} />}
                </div>

                {/* Dados */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800">{leader.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold uppercase">{leader.shift}</p>
                </div>

                {/* Valor */}
                <div className="text-right">
                    <div className={`text-2xl font-extrabold ${index === 0 ? 'text-[#EE4D2D]' : 'text-slate-700'}`}>
                        {leader.value}
                    </div>
                    <div className="text-xs text-slate-400">avarias</div>
                </div>

                {index === 0 && (
                    <div className="absolute -top-3 -right-2 bg-[#EE4D2D] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                        MAIOR IMPACTO INDIVIDUAL
                    </div>
                )}
            </div>
        ))}
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
            <p className="text-sm text-blue-800">
                <span className="font-bold">Análise de Rodízio:</span> O Turno 1 (Dione) é o turno com o líder individual que mais gerou avarias (137). O Turno 3 somou mais (144), mas é dividido entre Marcelo e Lorran.
            </p>
        </div>
    </div>
  </div>
);

const SlidePareto = () => {
    const totalAvarias = dataTypes.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className="h-full flex flex-col px-4 md:px-12 py-4 overflow-y-auto">
            <div className="mb-4 shrink-0">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">O que está quebrando?</h2>
            <p className="text-sm text-slate-500">Pareto de Perdas Reais (Não Recuperadas)</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 pb-20 md:pb-0 shrink-0">
            <div className="w-full h-[300px] bg-white rounded-xl p-2 shadow-sm border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={dataTypes} margin={{ top: 5, right: 60, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={50} 
                    tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} 
                    axisLine={false}
                    tickLine={false}
                    />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                    {dataTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList 
                        dataKey="value" 
                        position="right" 
                        style={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                        formatter={(val) => `${val} (${((val / totalAvarias) * 100).toFixed(0)}%)`}
                    />
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="w-full md:w-1/3 flex flex-col justify-center gap-4">
                <Card className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex items-center gap-3 mb-2">
                    <AlertOctagon className="text-red-600" size={24} />
                    <h3 className="text-lg font-bold text-red-800">Vidro + Líquido</h3>
                </div>
                <div className="text-3xl font-extrabold text-red-700 mb-1">
                    {(( (dataTypes[0].value + dataTypes[1].value) / totalAvarias ) * 100).toFixed(0)}%
                </div>
                <p className="text-xs text-red-800 leading-tight">Do total das perdas.</p>
                </Card>
                
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                O problema não é embalagem amassada (que recuperamos). O problema é <strong>quebra de material frágil</strong>.
                </p>
            </div>
            </div>
        </div>
    );
};

const SlideSuccess = () => (
  <div className="h-full flex flex-col px-4 md:px-12 py-4 justify-center text-center overflow-y-auto">
    <div className="mb-8 shrink-0">
      <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4">
        <ThumbsUp size={48} className="text-green-600" />
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-green-700 mb-2">
        Está Funcionando!
      </h2>
      <p className="text-lg md:text-xl text-slate-500">
        Avarias de "Embalagem" não viram perda.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full pb-20 md:pb-0 shrink-0">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none shadow-xl">
            <div className="text-6xl font-extrabold mb-2">477</div>
            <div className="text-green-100 font-medium text-lg uppercase tracking-widest">Pacotes Salvos</div>
            <div className="mt-4 bg-white/20 rounded-lg p-2 text-sm">
                Recuperados pela equipe e entregues ao cliente.
            </div>
        </Card>

        <Card className="flex flex-col justify-center items-start text-left pl-8">
            <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-green-600" size={28} />
                <span className="text-slate-700 font-bold text-lg">Triagem Eficiente</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-green-600" size={28} />
                <span className="text-slate-700 font-bold text-lg">Reembalagem Ágil</span>
            </div>
            <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={28} />
                <span className="text-slate-700 font-bold text-lg">Foco no Cliente</span>
            </div>
        </Card>
    </div>
  </div>
);

const SlideEvolution = () => (
  <div className="h-full flex flex-col px-4 md:px-12 py-4 overflow-y-auto">
    <div className="shrink-0 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
        Análise Mensal
        </h2>
        <p className="text-slate-500">Evolução Setembro vs Outubro</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 h-full pb-20 md:pb-0 shrink-0">
        
        <div className="space-y-4">
            <h3 className="font-bold text-slate-700 uppercase tracking-wider border-b pb-2">O Cenário</h3>
            
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                    <p className="text-xs text-slate-500 uppercase">Volume Processado</p>
                    <p className="text-xl font-bold text-slate-800">Cresc. +11,35%</p>
                </div>
                <TrendingUp className="text-green-500" size={28} />
            </div>

            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                    <p className="text-xs text-slate-500 uppercase">Total Avarias</p>
                    <p className="text-xl font-bold text-slate-800">Cresc. +8,36%</p>
                </div>
                <TrendingUp className="text-slate-400" size={28} />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
                <div className="flex items-start gap-3">
                    <Award className="text-blue-600 mt-1" size={24} />
                    <div>
                        <h4 className="font-bold text-blue-800">Ganho de Eficiência</h4>
                        <p className="text-sm text-blue-700 mt-1">
                            O volume cresceu mais rápido que as avarias.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-4">
             <h3 className="font-bold text-slate-700 uppercase tracking-wider border-b pb-2">Plano Novembro</h3>
             
             <ul className="space-y-3">
                 <li className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg border-l-4 border-[#EE4D2D]">
                    <AlertOctagon size={20} className="text-[#EE4D2D]" />
                    <span className="text-sm font-medium text-slate-700">Blitz com Dione (T1) - Vidros</span>
                 </li>
                 <li className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg border-l-4 border-orange-500">
                    <Activity size={20} className="text-orange-500" />
                    <span className="text-sm font-medium text-slate-700">Investigar S4 & S5 (Marcelo/T3)</span>
                 </li>
                 <li className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg border-l-4 border-green-500">
                    <Shield size={20} className="text-green-500" />
                    <span className="text-sm font-medium text-slate-700">Manter padrão Leonardo (T2)</span>
                 </li>
             </ul>

             <div className="mt-6 text-center">
                 <div className="text-2xl md:text-4xl font-bold text-slate-800">Vamos com tudo!</div>
                 <div className="text-sm text-slate-400 mt-1">Inventory Team</div>
             </div>
        </div>
    </div>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    <SlideCover />,
    <SlideFunnel />,
    <SlideTrend />,
    <SlideLeaderBoard />, // Novo slide substituindo o antigo de Turnos
    <SlidePareto />,
    <SlideSuccess />,
    <SlideEvolution />
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(curr => curr + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(curr => curr - 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 font-sans text-slate-800 p-0 md:p-4">
      
      <div className="w-full max-w-5xl bg-white md:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-screen md:h-[600px] md:min-h-[600px] relative">
        
        {/* Header */}
        <div className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 z-20">
          <div className="flex items-center gap-2">
            <img src="https://i.imgur.com/b7GK1hW.png" alt="Logo" className="h-6 w-auto object-contain" />
            <div className="h-3 w-[1px] bg-slate-300"></div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Inventory</span>
          </div>
          <div className="text-[10px] md:text-xs font-medium text-slate-400">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* Conteúdo do Slide */}
        <div className="flex-1 relative bg-slate-50/50 overflow-y-auto md:overflow-hidden">
          {slides[currentSlide]}
        </div>

        {/* Footer / Navegação */}
        <div className="h-16 bg-white border-t border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 z-20 pb-safe">
          
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 text-slate-600 disabled:opacity-30 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft size={24} />
            <span className="hidden md:inline text-sm font-medium">Anterior</span>
          </button>

          <div className="flex gap-1">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-4 md:w-8 bg-[#EE4D2D]' : 'w-1.5 md:w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 bg-[#EE4D2D] text-white px-4 py-2 rounded-lg hover:bg-[#d03e1f] shadow-md disabled:opacity-50 disabled:shadow-none transition-colors"
          >
            <span className="hidden md:inline text-sm font-medium">Próximo</span>
            <ChevronRight size={24} />
          </button>
          
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
        /* Blob Animation for Logo */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(10px, -10px) scale(1.1); }
          66% { transform: translate(-10px, 10px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
            animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
