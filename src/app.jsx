import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell
} from 'recharts';
import { 
  ChevronRight, ChevronLeft, AlertTriangle, 
  TrendingUp, TrendingDown, CheckCircle, Target, 
  ArrowRight, Package, AlertOctagon, Box
} from 'lucide-react';

// --- DADOS ---
// Atualize estes dados mensalmente para gerar os novos gráficos
const dataTypes = [
  { name: 'Vidro', value: 185, color: '#EE4D2D' }, // Laranja Shopee
  { name: 'Líquido', value: 99, color: '#F97316' },
  { name: 'Sólida', value: 36, color: '#94A3B8' },
  { name: 'Embalagem', value: 22, color: '#CBD5E1' },
  { name: 'Outros', value: 21, color: '#E2E8F0' },
];

const dataWeeks = [
  { name: 'Sem 1', avarias: 26 },
  { name: 'Sem 2', avarias: 65 },
  { name: 'Sem 3', avarias: 59 },
  { name: 'Sem 4', avarias: 113 }, // Pico
  { name: 'Sem 5', avarias: 100 }, // Pico
];

const dataShifts = [
  { name: 'Turno 1', value: 139, color: '#EE4D2D' },
  { name: 'Turno 2', value: 76, color: '#10B981' }, // Verde (Bom)
  { name: 'Turno 3', value: 144, color: '#DC2626' }, // Vermelho (Ruim)
  { name: 'Turno 4', value: 4, color: '#94A3B8' },
];

// --- COMPONENTES UI ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "orange" }) => {
  const colors = {
    orange: "bg-orange-100 text-orange-800",
    red: "bg-red-100 text-red-800",
    green: "bg-green-100 text-green-800",
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors[color] || colors.gray}`}>
      {children}
    </span>
  );
};

// --- SLIDES ---

const SlideCover = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fadeIn">
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 bg-orange-500 blur-[60px] opacity-20 rounded-full"></div>
      <img 
        src="https://i.imgur.com/b7GK1hW.png" 
        alt="Shopee Xpress Inventory Team" 
        className="relative z-10 mx-auto h-32 object-contain drop-shadow-xl"
      />
    </div>
    
    <div className="space-y-4 z-10">
      <h1 className="text-6xl font-extrabold text-slate-800 tracking-tight">
        Análise de <span className="text-[#EE4D2D]">Avarias</span>
      </h1>
      <div className="h-1 w-24 bg-[#EE4D2D] mx-auto rounded-full"></div>
      <h2 className="text-2xl text-slate-500 font-medium">
        Fechamento Outubro 2025
      </h2>
    </div>

    <div className="mt-12 bg-white/80 backdrop-blur-sm border border-slate-200 px-8 py-4 rounded-2xl shadow-sm">
      <p className="text-slate-600 font-semibold">Foco: Ocorrências "Recebido pelo HUB"</p>
    </div>
  </div>
);

const SlideExecutiveSummary = () => (
  <div className="h-full flex flex-col justify-center px-12 animate-slideUp">
    <h2 className="text-4xl font-bold text-slate-800 mb-12 border-l-8 border-[#EE4D2D] pl-6">
      O Cenário Real: O Funil de Perdas
    </h2>

    <div className="grid grid-cols-3 gap-8 items-center">
      {/* Total Processed */}
      <Card className="h-64 flex flex-col justify-between border-t-4 border-slate-300 opacity-60">
        <div>
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Package size={24} />
            <span className="font-bold uppercase tracking-wider">Ocorrências Brutas</span>
          </div>
          <div className="text-5xl font-bold text-slate-400">~903</div>
        </div>
        <p className="text-sm text-slate-400">Total de registros iniciais no sistema.</p>
      </Card>

      {/* Arrow */}
      <div className="flex justify-center text-slate-300">
        <ArrowRight size={48} strokeWidth={3} />
      </div>

      {/* The Big Number */}
      <Card className="h-80 flex flex-col justify-between border-t-8 border-[#EE4D2D] relative transform scale-110 z-10 shadow-2xl">
        <div className="absolute top-4 right-4">
          <AlertTriangle className="text-[#EE4D2D]" size={32} />
        </div>
        <div>
          <div className="flex items-center gap-2 text-[#EE4D2D] mb-2">
            <Target size={24} />
            <span className="font-bold uppercase tracking-wider">Perda Real (HUB)</span>
          </div>
          <div className="text-8xl font-extrabold text-slate-800">363</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
          <p className="text-sm text-orange-800 font-medium">
            Este é o número que impacta o P&L. Itens não recuperados, foco da análise.
          </p>
        </div>
      </Card>
    </div>
  </div>
);

const SlideTypeAnalysis = () => (
  <div className="h-full px-12 pt-8 pb-4 flex flex-col animate-slideUp">
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-slate-800">Onde estamos perdendo?</h2>
      <p className="text-slate-500">Análise de Pareto por Tipo de Avaria</p>
    </div>

    <div className="flex flex-row h-full gap-8">
      <div className="flex-1 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={dataTypes} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={100} 
              tick={{fill: '#475569', fontSize: 14, fontWeight: 600}} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
              {dataTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-1/3 flex flex-col justify-center space-y-6">
        <Card className="bg-red-50 border-l-4 border-red-500">
          <div className="flex items-start gap-3">
            <AlertOctagon className="text-red-600 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-800">Vidro + Líquido</h3>
              <p className="text-red-600 text-3xl font-extrabold mt-2">78%</p>
              <p className="text-sm text-red-700 mt-1">Do total das perdas.</p>
            </div>
          </div>
        </Card>
        
        <div className="prose text-slate-600">
          <p>
            Diferente da percepção operacional de "Embalagem" (que recuperamos), 
            o prejuízo financeiro vem da <strong>quebra de vidro</strong> e 
            <strong> vazamento de líquidos</strong>.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const SlideTrendAnalysis = () => (
  <div className="h-full px-12 pt-8 pb-4 flex flex-col animate-slideUp">
    <div className="mb-6 flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Evolução Semanal</h2>
        <p className="text-slate-500">Tendência de agravamento no final do mês</p>
      </div>
      <Badge color="red">Atenção Semanas 4 & 5</Badge>
    </div>

    <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dataWeeks} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', marginTop: 10}} padding={{left: 20, right: 20}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
          <Tooltip 
             contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
          />
          <Line 
            type="monotone" 
            dataKey="avarias" 
            stroke="#EE4D2D" 
            strokeWidth={5} 
            dot={{ r: 6, fill: '#EE4D2D', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-6">
      <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 border border-green-100 opacity-50">
        <TrendingDown className="text-green-600" size={32} />
        <div>
          <div className="text-sm text-green-800 font-bold">Semanas 1-3</div>
          <div className="text-xs text-green-700">Média: 50 avarias/sem</div>
        </div>
      </div>
      <div className="flex items-center gap-4 p-4 rounded-lg bg-red-50 border border-red-100 shadow-sm">
        <TrendingUp className="text-red-600" size={32} />
        <div>
          <div className="text-sm text-red-800 font-bold">Semanas 4-5 (Crítico)</div>
          <div className="text-xs text-red-700">Média: 106 avarias/sem (+112%)</div>
        </div>
      </div>
    </div>
  </div>
);

const SlideShiftAnalysis = () => (
  <div className="h-full px-12 pt-8 pb-4 flex flex-col animate-slideUp">
    <div className="mb-4">
      <h2 className="text-3xl font-bold text-slate-800">Quem é o Ofensor?</h2>
      <p className="text-slate-500">Análise de Responsabilidade por Turno</p>
    </div>

    <div className="flex items-center justify-between h-full gap-12">
      {/* Chart Area */}
      <div className="w-1/2 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataShifts} barSize={60}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontWeight: 600}} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {dataShifts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insight Area */}
      <div className="w-1/2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-8 border-[#DC2626]">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Ponto de Atenção: T1 e T3</h3>
          <p className="text-slate-600 mb-4">
            Somados, Turno 1 e Turno 3 representam <strong>78%</strong> de todas as avarias do mês.
          </p>
          <div className="flex gap-4 text-sm">
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">T3: 144</span>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">T1: 139</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-8 border-[#10B981]">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Benchmark: T2</h3>
          <p className="text-slate-600">
            O Turno 2 apresentou apenas <strong>76 avarias</strong>. Precisamos entender qual processo diferente eles estão executando.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const SlideStrategy = () => (
  <div className="h-full px-12 pt-8 pb-4 flex flex-col justify-center animate-slideUp">
    <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
      A Fórmula do Problema
    </h2>
    
    <div className="flex items-center justify-center gap-4 mb-12">
      <Card className="w-64 h-64 flex flex-col items-center justify-center text-center bg-slate-50 border-2 border-slate-200">
        <div className="bg-slate-200 p-4 rounded-full mb-4">
          <Package size={40} className="text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-700">Vidro</h3>
        <p className="text-slate-500 text-sm mt-2">Material Frágil</p>
      </Card>

      <span className="text-4xl text-slate-400 font-light">+</span>

      <Card className="w-64 h-64 flex flex-col items-center justify-center text-center bg-red-50 border-2 border-red-100">
        <div className="bg-red-200 p-4 rounded-full mb-4">
          <AlertTriangle size={40} className="text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-red-700">Turnos 1 & 3</h3>
        <p className="text-red-500 text-sm mt-2">Manuseio/Processo</p>
      </Card>

      <span className="text-4xl text-slate-400 font-light">=</span>

      <Card className="w-64 h-64 flex flex-col items-center justify-center text-center bg-[#EE4D2D] text-white shadow-orange-500/30 shadow-xl transform scale-105">
        <div className="bg-white/20 p-4 rounded-full mb-4">
          <TrendingUp size={40} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold">363 Avarias</h3>
        <p className="text-orange-100 text-sm mt-2">Perda Financeira</p>
      </Card>
    </div>
    
    <p className="text-center text-slate-500 max-w-2xl mx-auto">
      A combinação de itens de vidro com os processos atuais do T1 e T3, especialmente no fim do mês, é a raiz de 78% das nossas perdas.
    </p>
  </div>
);

const SlideActionPlan = () => (
  <div className="h-full px-12 pt-8 pb-4 flex flex-col animate-slideUp">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800">Plano de Ação: Novembro</h2>
      <p className="text-slate-500">Meta: Reduzir perda real para &lt;200</p>
    </div>

    <div className="grid grid-cols-2 gap-6">
      {[
        {
          title: "Blitz do Vidro (Foco T1 & T3)",
          desc: "Acompanhamento visual e auditivo (som de quebra) durante o manuseio de cargas frágeis nos turnos ofensores.",
          icon: <AlertOctagon size={24} />,
          color: "text-red-600 bg-red-50",
          bg: "bg-red-50"
        },
        {
          title: "Investigação S4 & S5",
          desc: "Análise retroativa: O que mudou no processo ou equipe na virada da Semana 3 para a 4?",
          icon: <TrendingUp size={24} />,
          color: "text-orange-600 bg-orange-50",
          bg: "bg-orange-50"
        },
        {
          title: "Benchmark T2",
          desc: "Mapear processos do Turno 2 para entender por que eles quebram menos e replicar no T1 e T3.",
          icon: <CheckCircle size={24} />,
          color: "text-green-600 bg-green-50",
          bg: "bg-green-50"
        },
        {
          title: "Segregação na Entrada",
          desc: "Reforçar a separação física imediata de Líquidos e Vidros para evitar contaminação de cargas secas.",
          icon: <Box size={24} />,
          color: "text-blue-600 bg-blue-50",
          bg: "bg-blue-50"
        }
      ].map((item, idx) => (
        <Card key={idx} className="flex gap-4 items-start hover:shadow-xl transition-shadow duration-300 border border-slate-100">
          <div className={`p-3 rounded-lg ${item.bg} ${item.color.split(' ')[0]}`}>
            {item.icon}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
            <p className="text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    <SlideCover />,
    <SlideExecutiveSummary />,
    <SlideTypeAnalysis />,
    <SlideTrendAnalysis />,
    <SlideShiftAnalysis />,
    <SlideStrategy />,
    <SlideActionPlan />
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(curr => curr + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(curr => curr - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-800">
      {/* Main Container - Aspect Ratio 16:9 for slides */}
      <div className="w-full max-w-6xl aspect-video bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-200">
        
        {/* Header / Top Bar */}
        <div className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-3">
            <img src="https://i.imgur.com/b7GK1hW.png" alt="Logo" className="h-8 w-auto object-contain" />
            <div className="h-4 w-[1px] bg-slate-300"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confidencial</span>
          </div>
          <div className="text-xs font-medium text-slate-400">
            Outubro 2025 • Relatório de Avarias
          </div>
        </div>

        {/* Slide Content Area */}
        <div className="flex-1 relative overflow-hidden bg-slate-50/50">
          {/* Background Element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          
          {/* Render Current Slide */}
          <div className="h-full w-full p-2">
            {slides[currentSlide]}
          </div>
        </div>

        {/* Footer / Controls */}
        <div className="h-16 bg-white border-t border-slate-100 flex items-center justify-between px-8 z-20">
          <div className="flex gap-1">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-[#EE4D2D]' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 font-medium">
              {currentSlide + 1} / {slides.length}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="p-2 rounded-full bg-[#EE4D2D] text-white hover:bg-[#d03e1f] shadow-md shadow-orange-200 disabled:opacity-50 disabled:bg-slate-300 disabled:shadow-none transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
