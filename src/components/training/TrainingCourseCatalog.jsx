import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Clock,
  Award,
  Search,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  HardHat,
  CreditCard,
  Building2,
  Scale,
  Sparkles,
  FileCheck,
  Banknote,
  Handshake,
  FileSearch,
  Landmark
} from 'lucide-react';

const CATEGORY_LABELS = {
  'Gobernanza y Cultura Ética': 'Gobernanza & Ética',
  'Controles Financieros y Operativos': 'Finanzas & Tesorería',
  'Contrataciones Públicas y Pliegos': 'Licitaciones & Compras',
  'Inspección de Obra y Calidad': 'Obras Viales',
  'Investigaciones y Auditoría Forense': 'Auditoría & Cumplimiento',
  'Gobernanza y Terceros': 'Terceros & DD'
};

export default function TrainingCourseCatalog({
  courses = [],
  onSelectCourse,
  onStartQuiz
}) {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    const set = new Set(courses.map(c => c.categoria).filter(Boolean));
    return ['todos', ...Array.from(set)];
  }, [courses]);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'todos' || course.categoria === selectedCategory;
    const matchesSearch =
      course.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.rolDestinatario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCourseIcon = (courseId) => {
    switch (courseId) {
      case 'CUR-02':
        return <CreditCard className="w-5 h-5 text-emerald-400" />;
      case 'CUR-03':
        return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'CUR-04':
        return <HardHat className="w-5 h-5 text-cyan-400" />;
      case 'CUR-05':
        return <Scale className="w-5 h-5 text-rose-400" />;
      case 'CUR-06':
        return <FileCheck className="w-5 h-5 text-blue-400" />;
      case 'CUR-07':
        return <Banknote className="w-5 h-5 text-teal-400" />;
      case 'CUR-08':
        return <Handshake className="w-5 h-5 text-purple-400" />;
      case 'CUR-09':
        return <FileSearch className="w-5 h-5 text-indigo-400" />;
      case 'CUR-10':
        return <Landmark className="w-5 h-5 text-amber-400" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controles de Filtrado y Búsqueda */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
        {/* Categorías */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/80'
              }`}
            >
              {cat === 'todos' ? 'Todos los Cursos' : (CATEGORY_LABELS[cat] || cat)}
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por curso, rol o código..."
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Grid de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          return (
            <div
              key={course.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 group relative overflow-hidden"
            >
              {/* Glow decorativo sutil */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-all" />

              <div>
                {/* Cabecera de la Tarjeta */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl group-hover:border-cyan-500/30 transition-colors">
                      {getCourseIcon(course.id)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-cyan-400 block">
                        {course.codigo}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {course.clausulaIso}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-mono text-slate-300 font-bold">
                      {course.duracionHoras}h
                    </span>
                  </div>
                </div>

                {/* Título y Rol Destinatario */}
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-1.5">
                  {course.titulo}
                </h3>

                <div className="mb-3">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] font-medium text-slate-300 border border-slate-700/60">
                    Destinado a: <strong className="text-cyan-300">{course.rolDestinatario}</strong>
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {course.descripcion}
                </p>

                {/* Lista de Módulos */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Módulos Pedagógicos ({course.modulos?.length || 0}):
                  </span>
                  {course.modulos?.map((mod) => (
                    <div key={mod.numero} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{mod.numero}. {mod.titulo}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acciones de la Tarjeta */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectCourse(course)}
                  className="px-3 py-2 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ver Contenido</span>
                </button>

                <button
                  onClick={() => onStartQuiz(course)}
                  className="px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-900/30 hover:shadow-cyan-500/20 transition-all"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Rendir Examen</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-400">
          <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm font-semibold">No se encontraron cursos que coincidan con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
}
