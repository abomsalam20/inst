import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Menu, X, GraduationCap, Award, Briefcase, Lightbulb,
  Building2, FlaskConical, Factory, Users, Headset, BookOpenCheck,
  Monitor, Cpu, Wrench, Ruler, Network, Atom,
  Play, ChevronLeft, Search, MapPin, Phone, Mail, Clock,
  ArrowUpRight, CheckCircle2, Star, Layers, Beaker, Hammer,
  BookOpen, Calculator, Radio, ClipboardList, Code2
} from 'lucide-react';

// Types
type Subject = {
  id: string;
  name: string;
  doctor: string;6
  level: string;
  brief: string;
  description: string;
  topics: string[];
  icon: any;
  color: string;
  questions: { q: string; options: string[]; correct: number }[];
};

// Data
const subjects: Subject[] = [
  {
    id: 'prog',
    name: 'مقدمة في البرمجة',
    doctor: 'د. أحمد حسني',
    level: 'المستوى الأول - عام',
    brief: 'أساسيات التفكير المنطقي والخوارزميات باستخدام C++ وبناء أول برامجك العملية.',
    description: 'تُعد هذه المادة حجر الأساس لكل مهندس ومحلل نظم. نبدأ من الصفر: المتغيرات، الشروط، الحلقات، الدوال، وصولاً إلى هياكل البيانات البسيطة. التركيز عملي بنسبة 70% داخل معمل الحاسب المتطور.',
    topics: ['الخوارزميات', 'C++ Basics', 'Problem Solving', 'Debugging'],
    icon: Code2,
    color: '#0B1E3D',
    questions: [
      { q: 'ما هي الدالة المستخدمة لطباعة نص في C++؟', options: ['print()', 'cout', 'echo', 'System.out.println'], correct: 1 },
      { q: 'أي من التالي يُمثل متغير صحيح Integer؟', options: ['"5"', '5.5', '5', 'true'], correct: 2 },
      { q: 'ما ناتج الحلقة for(i=0;i<3;i++)؟', options: ['مرتين', '3 مرات', '4 مرات', 'لا نهائي'], correct: 1 },
    ]
  },
  {
    id: 'mech',
    name: 'ميكانيكا هندسية',
    doctor: 'د. سارة الكيلاني',
    level: 'المستوى الأول - هندسة',
    brief: 'تحليل القوى والاتزان للأجسام الصلبة وتطبيقاتها في المنشآت والهياكل.',
    description: 'فهم عميق لاستاتيكا وديناميكا الجسيمات. ستتعلم رسم مخطط الجسم الحر وحساب ردود الأفعال ومركز الثقل، وهو أساس للهندسة المدنية والميكاترونكس.',
    topics: ['اتزان القوى', 'عزوم', 'الاحتكاك', 'مركز الثقل'],
    icon: Hammer,
    color: '#1E3A5F',
    questions: [
      { q: 'شرط اتزان الجسم في المستوى هو:', options: ['مجموع القوى = صفر فقط', 'مجموع العزوم = صفر فقط', 'مجموع القوى والعزوم = صفر', 'لا يوجد شرط'], correct: 2 },
      { q: 'وحدة قياس العزم هي:', options: ['نيوتن', 'جول', 'نيوتن.متر', 'واط'], correct: 2 },
      { q: 'مركز ثقل المثلث يقع عند:', options: ['الرأس', 'المنتصف', 'تقاطع المتوسطات', 'القاعدة'], correct: 2 },
    ]
  },
  {
    id: 'pm',
    name: 'إدارة المشروعات',
    doctor: 'د. محمد رضوان',
    level: 'المستوى الثالث - مشترك',
    brief: 'من التخطيط إلى التسليم: أدوات احترافية لإدارة الوقت والتكلفة والجودة.',
    description: 'تطبيق منهجيات PMP و Agile على مشروعات حقيقية. ستتعلم استخدام MS Project و Primavera وإعداد WBS و Gantt Chart وإدارة المخاطر.',
    topics: ['PMP', 'Gantt Chart', 'إدارة المخاطر', 'MS Project'],
    icon: ClipboardList,
    color: '#D4A017',
    questions: [
      { q: 'ما هو المسار الحرج في المشروع؟', options: ['أقصر مسار', 'أطول مسار يحدد مدة المشروع', 'مسار عشوائي', 'مسار التكلفة'], correct: 1 },
      { q: 'WBS تعني:', options: ['Work Breakdown Structure', 'Web Based System', 'Work Balance Sheet', 'World Business Standard'], correct: 0 },
      { q: 'مثلث المشروع يتكون من:', options: ['وقت-تكلفة-نطاق', 'جودة-وقت-ربح', 'فريق-عميل-مدير', 'خطة-تنفيذ-تسليم'], correct: 0 },
    ]
  },
  {
    id: 'acc',
    name: 'محاسبة مالية',
    doctor: 'د. نادية فوزي',
    level: 'المستوى الثاني - إدارة',
    brief: 'قراءة القوائم المالية وفهم الميزانية وقائمة الدخل كمدير مستقبلي.',
    description: 'ليست مجرد أرقام، بل لغة الأعمال. ستتقن القيد المزدوج، إعداد ميزان المراجعة، وتحليل النسب المالية لاتخاذ قرارات استثمارية.',
    topics: ['القيد المزدوج', 'الميزانية', 'التدفقات النقدية', 'تحليل نسب'],
    icon: Calculator,
    color: '#0F766E',
    questions: [
      { q: 'المعادلة المحاسبية الأساسية هي:', options: ['الأصول = الخصوم - حقوق الملكية', 'الأصول = الخصوم + حقوق الملكية', 'الإيراد = مصروف', 'لا شيء مما سبق'], correct: 1 },
      { q: 'قائمة الدخل تقيس:', options: ['المركز المالي في لحظة', 'الأداء خلال فترة', 'التدفق النقدي فقط', 'عدد الموظفين'], correct: 1 },
      { q: 'الإهلاك هو:', options: ['زيادة قيمة الأصل', 'نقصان قيمة الأصل بمرور الزمن', 'بيع الأصل', 'شراء أصل جديد'], correct: 1 },
    ]
  },
  {
    id: 'circ',
    name: 'دوائر كهربائية',
    doctor: 'م. كريم الشافعي',
    level: 'المستوى الثاني - اتصالات',
    brief: 'تحليل دوائر التيار المستمر والمتردد وقوانين كيرشوف وأوم عملياً.',
    description: 'داخل معمل الإلكترونيات المجهز بأجهزة قياس رقمية حديثة، ستقوم ببناء وقياس الدوائر وتطبيق نظريات Thevenin و Norton و Superposition.',
    topics: ['قانون أوم', 'كيرشوف', 'Thevenin', 'دوائر RLC'],
    icon: Radio,
    color: '#4338CA',
    questions: [
      { q: 'قانون أوم: V = ?', options: ['I+R', 'I*R', 'I/R', 'R/I'], correct: 1 },
      { q: 'في التوصيل على التوالي، التيار:', options: ['يتجزأ', 'ثابت في كل المقاومات', 'صفر', 'متغير عشوائياً'], correct: 1 },
      { q: 'وحدة قياس السعة الكهربائية:', options: ['أوم', 'فاراد', 'هنري', 'أمبير'], correct: 1 },
    ]
  },
  {
    id: 'sys',
    name: 'تحليل نظم',
    doctor: 'د. إسلام منير',
    level: 'المستوى الثالث - نظم معلومات',
    brief: 'من الفكرة إلى النظام: تحليل المتطلبات وتصميم قواعد البيانات والواجهات.',
    description: 'ستتعلم كيف تحلل احتياجات العميل وتحولها إلى مخططات UML وقاعدة بيانات فعالة. المشروع النهائي هو نظام حقيقي لشركة شريكة.',
    topics: ['UML', 'ERD', 'متطلبات', 'نمذجة'],
    icon: Layers,
    color: '#BE123C',
    questions: [
      { q: 'ERD يستخدم لتمثيل:', options: ['الواجهات', 'قواعد البيانات وعلاقاتها', 'الشبكات', 'الكود فقط'], correct: 1 },
      { q: 'Use Case Diagram يوضح:', options: ['تفاعل المستخدم مع النظام', 'سرعة النظام', 'لون الشاشة', 'سعر البرنامج'], correct: 0 },
      { q: 'أول مرحلة في دورة حياة النظام:', options: ['التصميم', 'جمع المتطلبات', 'البرمجة', 'الصيانة'], correct: 1 },
    ]
  },
];

const navLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'vision', label: 'رؤيتنا' },
  { id: 'programs', label: 'البرامج' },
  { id: 'subjects', label: 'المواد والاختبارات' },
  { id: 'faculty', label: 'هيئة التدريس' },
  { id: 'labs', label: 'المعامل' },
  { id: 'training', label: 'التدريب' },
  { id: 'students', label: 'شئون الطلاب' },
];

const facultyData = [
  { name: 'أ.د. هشام البدري', title: 'عميد المعهد', dept: 'هندسة', spec: 'إدارة مشروعات التشييد', exp: '28+', color: '#0B1E3D' },
  { name: 'د. ليلى مراد', title: 'أستاذ مساعد', dept: 'هندسة', spec: 'هندسة اتصالات', exp: '18+', color: '#1E3A5F' },
  { name: 'د. عمر خالد', title: 'مدرس', dept: 'هندسة', spec: 'ميكاترونكس وروبوتات', exp: '12+', color: '#D4A017' },
  { name: 'د. سلمى عادل', title: 'أستاذ', dept: 'إدارة', spec: 'إدارة أعمال دولية', exp: '22+', color: '#0F766E' },
  { name: 'م. أحمد نبيل', title: 'معيد', dept: 'هندسة', spec: 'هندسة مدنية - خرسانة', exp: '5+', color: '#4338CA' },
  { name: 'د. مصطفى فهمي', title: 'أستاذ مشارك', dept: 'إدارة', spec: 'نظم معلومات إدارية', exp: '16+', color: '#BE123C' },
  { name: 'م. رنا وليد', title: 'معيدة', dept: 'هندسة', spec: 'عمارة وتصميم مستدام', exp: '4+', color: '#0B1E3D' },
  { name: 'د. خالد منصور', title: 'مدرس', dept: 'إدارة', spec: 'محاسبة وتمويل', exp: '14+', color: '#1E3A5F' },
];

const labsData = [
  { name: 'معمل الحاسب المتطور', desc: '120 جهاز Workstation بمعالجات i9 وكروت RTX للذكاء الاصطناعي والتصميم', equip: ['Dell Precision', 'شبكة 10G', 'سيرفرات NVIDIA DGX'], icon: Monitor },
  { name: 'معمل الإلكترونيات الدقيقة', desc: 'مجهز بأجهزة قياس رقمية ولوحات FPGA ومحاكيات احترافية', equip: ['Oscilloscope Keysight', 'FPGA Xilinx', 'Soldering Station'], icon: Cpu },
  { name: 'ورشة الميكاترونكس', desc: 'روبوتات صناعية، أذرع CNC، وطابعات ثلاثية الأبعاد', equip: ['KUKA Arm', 'CNC Mill', '3D Printers Formlabs'], icon: Wrench },
  { name: 'معمل المساحة والخرسانة', desc: 'أجهزة Total Station واختبارات تربة وخرسانة وفق كود مصري', equip: ['Leica Total Station', 'CBR Test', 'Compression Machine'], icon: Ruler },
  { name: 'معمل الشبكات والسيبراني', desc: 'بيئة سيسكو كاملة ومختبر اختراق أخلاقي معزول', equip: ['Cisco Routers', 'FortiGate FW', 'Kali Lab'], icon: Network },
  { name: 'معمل الفيزياء الهندسية', desc: 'تجارب بصرية وميكانيكية وحرارية لطلاب المستوى الأول', equip: ['Optics Bench', 'Thermal Camera', 'Vacuum Chamber'], icon: Atom },
];

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progTab, setProgTab] = useState<'eng' | 'admin'>('eng');
  const [explainSubject, setExplainSubject] = useState<Subject | null>(null);
  const [quizSubject, setQuizSubject] = useState<Subject | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [facultySearch, setFacultySearch] = useState('');
  const [facultyDept, setFacultyDept] = useState('الكل');
  const [toast, setToast] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', academicId: '', type: 'استفسار', dept: '', message: '' });

  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveNav(e.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    navLinks.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) { sectionsRef.current[l.id] = el; observer.observe(el); }
    });
    return () => observer.disconnect();
  }, []);

  // Reveal animation
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Toast auto hide
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3500); return () => clearTimeout(t); }
  }, [toast]);

  const startQuiz = (subj: Subject) => {
    setQuizSubject(subj);
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizFinished(false);
  };

  const submitAnswer = (idx: number) => {
    const next = [...quizAnswers];
    next[quizStep] = idx;
    setQuizAnswers(next);
    if (quizStep < 2) {
      setTimeout(() => setQuizStep(s => s + 1), 350);
    } else {
      setTimeout(() => {
        setQuizFinished(true);
        const score = next.reduce((acc, ans, i) => acc + (ans === quizSubject!.questions[i].correct ? 1 : 0), 0);
        const pct = Math.round((score / 3) * 100);
        setProgress(p => ({ ...p, [quizSubject!.id]: Math.max(p[quizSubject!.id] || 0, pct) }));
      }, 400);
    }
  };

  const filteredFaculty = useMemo(() => {
    return facultyData.filter(f =>
      (facultyDept === 'الكل' || f.dept === facultyDept) &&
      (f.name.includes(facultySearch) || f.spec.includes(facultySearch))
    );
  }, [facultySearch, facultyDept]);

  const score = quizSubject ? quizAnswers.reduce((a, ans, i) => a + (ans === quizSubject.questions[i].correct ? 1 : 0), 0) : 0;

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased selection:bg-[var(--accent-light)] selection:text-[var(--primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--primary)]/95 glass" style={{ paddingTop: 'var(--safe-area-inset-top)' }}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 md:px-6 lg:py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)] shadow-lg shadow-amber-900/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] font-bold tracking-widest text-amber-200/80">EST. 1998 • CAIRO</div>
              <div className="text-[13px] font-extrabold text-white md:text-[14px]">المعهد العالي للهندسة والعلوم الإدارية</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all ${activeNav === l.id ? 'bg-white text-[var(--primary)] shadow' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => document.getElementById('students')?.scrollIntoView({ behavior: 'smooth' })} className="hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-[13px] font-bold text-[var(--primary)] shadow-[0_6px_20px_rgba(212,160,23,0.35)] transition hover:brightness-110 active:scale-[0.98] md:block">
              بوابة الطالب
            </button>
            <button onClick={() => setMobileOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white lg:hidden">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/10 bg-[var(--primary)] px-4 pb-5 pt-2 lg:hidden">
            <div className="grid gap-1">
              {navLinks.map(l => (
                <button key={l.id} onClick={() => { document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); }} className={`rounded-xl px-4 py-3 text-right text-[14px] font-semibold ${activeNav === l.id ? 'bg-white text-[var(--primary)]' : 'text-white/80'}`}>{l.label}</button>
              ))}
              <button onClick={() => { document.getElementById('students')?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); }} className="mt-2 rounded-xl bg-[var(--accent)] py-3 font-bold text-[var(--primary)]">بوابة الطالب</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-[var(--primary)]">
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="pattern-bg absolute inset-0" />
        <div className="relative mx-auto max-w-[1280px] px-4 pb-12 pt-10 md:px-6 md:pb-20 md:pt-16 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="reveal in">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1.5 text-[11px] font-bold text-amber-200">
                <Star className="h-3.5 w-3.5 fill-amber-200" />معتمد من وزارة التعليم العالي • قرار رقم ****
              </div>
              <h1 className="mt-5 text-[32px] font-black leading-[1.1] text-white md:text-[52px] lg:text-[58px]">
                نُخرّج جيلاً هندسياً<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-200 to-[#D4A017]">وإدارياً جاهزاً</span><br />
                لسوق العمل
              </h1>
              <p className="mt-5 max-w-[56ch] text-[15px] leading-7 text-white/70 md:text-[17px] md:leading-8">
                نوفّر بيئة تعليمية متكاملة تُخرّج مهندسين وإداريين بأعلى مستوى من الكفاءة العلمية والعملية،
                جاهزين للاندماج الفوري في بيئة العمل عبر معامل متطورة وتدريب حقيقي في كبرى الشركات قبل التخرج.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-[var(--primary)] shadow-xl transition hover:bg-amber-50">
                  استكشف برامجنا <ArrowUpRight className="h-4 w-4" />
                </button>
                <button onClick={() => document.getElementById('labs')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[14px] font-bold text-white backdrop-blur hover:bg-white/15">
                  <Play className="h-4 w-4 fill-white" /> جولة في المعهد
                </button>
              </div>
              <div className="mt-8 flex items-center gap-3 text-[12px] text-white/50">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="h-7 w-7 rounded-full border-2 border-[var(--primary)] bg-gradient-to-br from-amber-200 to-amber-500" />)}
                </div>
                <span>يثق بنا أكثر من 5000 طالب وخريج حول الجمهورية</span>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="relative lg:h-[520px]">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#122C55] to-[#0B1E3D] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.4)] lg:aspect-auto lg:h-full lg:p-4">
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-amber-400/15 blur-[50px]" />
                <div className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-blue-400/10 blur-[60px]" />
                <div className="relative grid h-full grid-cols-2 gap-3">
                  {[
                    { k: '+5000', v: 'خريج وخريجة', sub: 'منذ 1998' },
                    { k: '+120', v: 'عضو هيئة تدريس', sub: 'خبراء صناعة' },
                    { k: '98%', v: 'نسبة توظيف', sub: 'خلال 6 أشهر' },
                    { k: '15', v: 'معمل متطور', sub: 'بأحدث الأجهزة' },
                  ].map((s, i) => (
                    <div key={i} className={`relative overflow-hidden rounded-[18px] border bg-white p-4 shadow-sm ${i===0 ? 'bg-gradient-to-br from-white to-amber-50/60' : 'bg-white'}`}>
                      <div className="text-[28px] font-black text-[var(--primary)]">{s.k}</div>
                      <div className="mt-1 text-[13px] font-bold">{s.v}</div>
                      <div className="text-[11px] text-gray-500">{s.sub}</div>
                      <div className="absolute -left-6 -top-6 h-16 w-16 rounded-full bg-amber-100/60" />
                    </div>
                  ))}
                  <div className="col-span-2 rounded-[18px] bg-[var(--primary)] p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="text-[12px] text-white/60">التدريب العملي</div>
                      <div className="rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-bold text-[var(--primary)]">مُفعل</div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      {['المقاولون العرب', 'Siemens', 'Huawei'].map(c => <div key={c} className="rounded-full bg-white/10 px-3 py-1.5 text-[10px]">{c}</div>)}
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[82%] rounded-full bg-[var(--accent)]" />
                    </div>
                    <div className="mt-2 text-[11px] text-white/60">82% من طلاب الفرقة الرابعة أنهوا تدريبهم هذا الترم</div>
                  </div>
                </div>
              </div>
              {/* floating badge */}
              <div className="absolute -bottom-4 left-4 hidden items-center gap-2 rounded-full bg-white px-4 py-2 shadow-xl md:flex">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold">التسجيل مفتوح للفصل الدراسي الجديد</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
        <div className="reveal grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest text-[var(--accent)]">رؤيتنا وتطلعاتنا • VISION</div>
            <h2 className="mt-3 text-[28px] font-black leading-tight md:text-[40px]">نُعد خريجاً لا يبحث عن وظيفة،<br />بل تبحث عنه الشركات</h2>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-[var(--accent)]" />
            <p className="mt-6 text-[15px] leading-8 text-[var(--muted)]">
              رؤيتنا هي سد الفجوة بين التعليم الأكاديمي ومتطلبات سوق العمل الحقيقي. لا نكتفي بالمنهج النظري، بل نصمم كل مقرر ليكون مشروعاً قابلاً للتطبيق،
              بإشراف كادر من المعيدين والدكاترة ذوي الخبرة الميدانية، داخل معامل تحاكي بيئة المصنع والشركة.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Award, title: 'جودة تعليم', desc: 'مناهج محدثة سنوياً مع خبراء الصناعة واعتماد أكاديمي' },
                { icon: Briefcase, title: 'جاهزية وظيفية', desc: 'تدريب إجباري 3 أشهر في كبرى الشركات قبل التخرج' },
                { icon: Lightbulb, title: 'ابتكار تطبيقي', desc: 'مشروعات تخرج تتحول لمنتجات وشركات ناشئة' },
              ].map(c => (
                <div key={c.title} className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-[var(--accent)]"><c.icon className="h-5 w-5" /></div>
                  <div className="mt-3 text-[14px] font-bold">{c.title}</div>
                  <div className="mt-1 text-[12px] leading-6 text-gray-500">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[28px] bg-[var(--primary)] p-6 text-white shadow-[0_20px_60px_rgba(11,30,61,0.25)] md:p-8">
              <div className="text-[13px] font-bold text-amber-200">رسالتنا • MISSION</div>
              <p className="mt-3 text-[18px] font-bold leading-8">توفير تعليم هندسي وإداري متوازن، يجمع بين العمق العلمي والمهارة العملية، لتخريج قادة قادرين على قيادة التحول الصناعي والرقمي في مصر والمنطقة.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-[12px]">
                <div className="rounded-xl bg-white/10 p-3"><div className="font-bold text-white">قيمنا</div><div className="mt-1 text-white/60 leading-5">الانضباط، الأمانة العلمية، العمل الجماعي، التعلم المستمر</div></div>
                <div className="rounded-xl bg-white/10 p-3"><div className="font-bold text-white">أهداف 2030</div><div className="mt-1 text-white/60 leading-5">100% من الخريجين بملف أعمال احترافي وشهادة تدريب دولية</div></div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[11px] text-white/50">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" /> خطة استراتيجية مراجعة من مجلس أمناء الصناعة
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-[20px] bg-[var(--accent)] md:grid place-items-center text-[var(--primary)] shadow-xl">
              <div className="text-center leading-none"><div className="text-[28px] font-black">25</div><div className="text-[10px] font-bold">سنة خبرة</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[12px] font-bold tracking-widest text-[var(--accent)]">لماذا نحن • WHY US</div>
              <h2 className="mt-2 text-[28px] font-black md:text-[36px]">مميزات تصنع الفارق الحقيقي</h2>
            </div>
            <div className="max-w-[36ch] text-[13px] leading-6 text-gray-500">بيئة مصممة بعناية لتكون محاكاة دقيقة لسوق العمل، من أول يوم دراسي حتى مشروع التخرج.</div>
          </div>
          <div className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Building2, title: 'بيئة عمل جاهزة ومحفزة', desc: 'قاعات ذكية، مساحات عمل مشتركة، وإنترنت فائق السرعة في كل ركن.', color: 'bg-blue-50 text-blue-700' },
              { icon: FlaskConical, title: 'معامل ومختبرات على أعلى مستوى', desc: '15 معمل مجهز بأحدث الأجهزة من Keysight, Siemens, Festo.', color: 'bg-amber-50 text-amber-700' },
              { icon: Factory, title: 'التدريب العملي في كبرى الشركات', desc: 'شراكات فعلية مع 500+ شركة: المقاولون، اوراسكوم، هواوي، البنك الأهلي.', color: 'bg-emerald-50 text-emerald-700' },
              { icon: Users, title: 'كادر تعليمي من معيدين ودكاترة خبراء', desc: 'أعضاء هيئة تدريس يجمعون بين البحث الأكاديمي والخبرة الميدانية.', color: 'bg-indigo-50 text-indigo-700' },
              { icon: Headset, title: 'شئون طلاب سلسة ومتجاوبة', desc: 'فريق متخصص جاهز لتلقي الشكاوى والمقترحات والرد خلال 24 ساعة.', color: 'bg-rose-50 text-rose-700' },
              { icon: BookOpenCheck, title: 'مناهج مواكبة لسوق العمل', desc: 'تحديث سنوي للمحتوى بالتعاون مع لجان صناعية وتقنية.', color: 'bg-cyan-50 text-cyan-700' },
            ].map(card => (
              <div key={card.title} className="group rounded-[22px] border border-[var(--border)] bg-[var(--bg)] p-5 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_40px_rgba(11,30,61,0.08)]">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.color}`}><card.icon className="h-5 w-5" /></div>
                <div className="mt-4 text-[15px] font-bold">{card.title}</div>
                <div className="mt-2 text-[13px] leading-6 text-gray-500">{card.desc}</div>
                <div className="mt-4 inline-flex items-center gap-1 text-[12px] font-bold text-[var(--primary)] opacity-0 transition group-hover:opacity-100">اعرف المزيد <ChevronLeft className="h-3.5 w-3.5" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
        <div className="reveal rounded-[28px] bg-[var(--primary)] p-6 text-white md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[24px] font-black md:text-[32px]">البرامج الأكاديمية</h2>
            <div className="flex rounded-full bg-white/10 p-1">
              {[
                { id: 'eng', label: 'الهندسة' },
                { id: 'admin', label: 'العلوم الإدارية' },
              ].map(t => (
                <button key={t.id} onClick={() => setProgTab(t.id as any)} className={`rounded-full px-5 py-2 text-[13px] font-bold transition ${progTab === t.id ? 'bg-white text-[var(--primary)] shadow' : 'text-white/70 hover:text-white'}`}>{t.label}</button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(progTab === 'eng' ? [
              { name: 'هندسة مدنية', icon: Building2, desc: 'تصميم إنشائي، إدارة تشييد، بنية تحتية', jobs: 'مهندس موقع • مصمم إنشائي' },
              { name: 'عمارة', icon: Ruler, desc: 'تصميم معماري مستدام ونمذجة BIM', jobs: 'مصمم معماري • BIM Specialist' },
              { name: 'اتصالات وإلكترونيات', icon: Radio, desc: 'شبكات، اتصالات، أنظمة مدمجة', jobs: 'مهندس شبكات • Embedded' },
              { name: 'ميكاترونكس', icon: Beaker, desc: 'روبوتات، تحكم، ذكاء اصطناعي صناعي', jobs: 'مهندس روبوتات • Automation' },
            ] : [
              { name: 'إدارة أعمال', icon: Briefcase, desc: 'قيادة، تسويق، ريادة أعمال', jobs: 'مدير مشروع • مسوق' },
              { name: 'محاسبة', icon: Calculator, desc: 'مالية، ضرائب، مراجعة', jobs: 'محاسب قانوني • محلل مالي' },
              { name: 'نظم معلومات إدارية', icon: Layers, desc: 'تحليل نظم، قواعد بيانات، ERP', jobs: 'محلل نظم • ERP Consultant' },
              { name: 'تسويق رقمي', icon: Monitor, desc: 'إضافة جديدة - SEO، إعلانات، تحليل', jobs: 'Digital Marketer • Growth' },
            ]).map(p => (
              <div key={p.name} className="group rounded-[18px] border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:bg-white hover:text-[var(--primary)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 group-hover:bg-[var(--bg)]"><p.icon className="h-5 w-5" /></div>
                <div className="mt-4 text-[15px] font-bold">{p.name}</div>
                <div className="mt-1 text-[12px] leading-6 opacity-70 group-hover:opacity-60">{p.desc}</div>
                <div className="mt-3 inline-flex rounded-full bg-amber-400/20 px-2.5 py-1 text-[10px] font-bold text-amber-200 group-hover:bg-amber-100 group-hover:text-amber-800">{p.jobs}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section id="subjects" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="reveal">
            <div className="flex items-center gap-3">
              <div className="h-10 w-1.5 rounded-full bg-[var(--accent)]" />
              <div>
                <h2 className="text-[26px] font-black md:text-[34px]">شرح المواد والاختبارات</h2>
                <p className="mt-1 text-[13px] text-gray-500">تعلم تفاعلي حقيقي — شاهد الشرح، ثم اختبر نفسك فوراً مع تصحيح لحظي وتقدم محفوظ</p>
              </div>
            </div>
          </div>

          <div className="reveal mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map(sub => (
              <div key={sub.id} className="group relative overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--bg)] p-5 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_rgba(11,30,61,0.08)]">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm" style={{ color: sub.color }}><sub.icon className="h-5 w-5" /></div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-gray-600 border">{sub.level}</span>
                    {progress[sub.id] !== undefined && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 border border-emerald-200">{progress[sub.id]}% مكتمل</span>}
                  </div>
                </div>
                <div className="mt-4 text-[16px] font-bold">{sub.name}</div>
                <div className="mt-1 text-[12px] text-gray-500">{sub.doctor}</div>
                <div className="mt-3 text-[13px] leading-6 text-gray-600">{sub.brief}</div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {sub.topics.map(t => <span key={t} className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-gray-600 border">{t}</span>)}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button onClick={() => setExplainSubject(sub)} className="rounded-full border border-[var(--primary)] bg-white px-3 py-2.5 text-[12px] font-bold text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition">شاهد الشرح</button>
                  <button onClick={() => startQuiz(sub)} className="rounded-full bg-[var(--primary)] px-3 py-2.5 text-[12px] font-bold text-white shadow hover:brightness-110">ابدأ الاختبار</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section id="faculty" className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
        <div className="reveal flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-[26px] font-black md:text-[34px]">الكادر التعليمي</h2>
            <p className="mt-1 text-[13px] text-gray-500">معيدين ودكاترة ذو خبرة وعلم — يجمعون بين البحث الأكاديمي والخبرة الميدانية</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <input value={facultySearch} onChange={e => setFacultySearch(e.target.value)} placeholder="ابحث بالاسم أو التخصص..." className="w-[180px] bg-transparent text-[12px] outline-none placeholder:text-gray-400" />
            </div>
            <div className="flex rounded-full bg-gray-100 p-1">
              {['الكل', 'هندسة', 'إدارة'].map(d => (
                <button key={d} onClick={() => setFacultyDept(d)} className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition ${facultyDept === d ? 'bg-white shadow text-[var(--primary)]' : 'text-gray-500'}`}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredFaculty.map(f => (
            <div key={f.name} className="rounded-[20px] border border-[var(--border)] bg-white p-5 shadow-sm transition hover:shadow-[0_12px_30px_rgba(11,30,61,0.08)]">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full text-[14px] font-black text-white" style={{ background: f.color }}>
                  {f.name.split(' ').slice(-2).map(s => s[0]).join('')}
                </div>
                <div>
                  <div className="text-[13px] font-bold">{f.name}</div>
                  <div className="text-[11px] text-gray-500">{f.title} • {f.dept}</div>
                </div>
              </div>
              <div className="mt-4 text-[12px] font-semibold text-[var(--primary)]">{f.spec}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800 border border-amber-200">{f.exp} سنة خبرة</span>
                <span className="text-[11px] text-gray-400">متاح للاستشارة</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Labs */}
      <section id="labs" className="bg-[var(--primary)] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[12px] font-bold tracking-widest text-amber-200">LABS • معامل</div>
              <h2 className="mt-2 text-[26px] font-black md:text-[34px]">معامل ومختبرات على أعلى مستوى</h2>
            </div>
            <div className="text-[13px] leading-6 text-white/60 max-w-[42ch]">كل معمل مجهز بأحدث الأجهزة العالمية وصيانة دورية، مع فني متخصص وجدول حجز إلكتروني للطلاب.</div>
          </div>
          <div className="reveal mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {labsData.map(lab => (
              <div key={lab.name} className="group rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:bg-white hover:text-[var(--primary)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 group-hover:bg-gray-100"><lab.icon className="h-5 w-5" /></div>
                  <div className="text-[14px] font-bold">{lab.name}</div>
                </div>
                <div className="mt-3 text-[12px] leading-6 opacity-70 group-hover:opacity-80">{lab.desc}</div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {lab.equip.map(eq => <span key={eq} className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] group-hover:bg-gray-100 group-hover:text-gray-700">{eq}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training */}
      <section id="training" className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
        <div className="reveal grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-800 border border-amber-200">التدريب العملي • INTERNSHIP</div>
            <h2 className="mt-4 text-[26px] font-black leading-tight md:text-[34px]">التدريب في كبرى الشركات قبل التخرج</h2>
            <p className="mt-4 text-[14px] leading-7 text-gray-600">برنامج تدريب إجباري 240 ساعة معتمدة، يبدأ من المستوى الثالث، بإشراف أكاديمي وصناعي مزدوج، وينتهي بتقييم فعلي وعرض توظيف للعديد من الطلاب.</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border bg-white p-4 text-center shadow-sm"><div className="text-[22px] font-black text-[var(--primary)]">+500</div><div className="text-[11px] text-gray-500">شركة شريكة</div></div>
              <div className="rounded-2xl border bg-white p-4 text-center shadow-sm"><div className="text-[22px] font-black text-[var(--primary)]">240</div><div className="text-[11px] text-gray-500">ساعة تدريب</div></div>
              <div className="rounded-2xl border bg-white p-4 text-center shadow-sm"><div className="text-[22px] font-black text-[var(--accent)]">68%</div><div className="text-[11px] text-gray-500">عرض توظيف بعد التدريب</div></div>
            </div>
            <div className="mt-8 space-y-3">
              {[
                { step: '01', title: 'التأهيل والورش', desc: 'ورش CV، مقابلات، وسلامة مهنية قبل الانطلاق' },
                { step: '02', title: 'التدريب الميداني', desc: 'العمل الفعلي داخل الشركة بمشروع حقيقي' },
                { step: '03', title: 'التقييم والتوظيف', desc: 'تقرير مشترك وشهادة خبرة وفرص تعيين' },
              ].map(s => (
                <div key={s.step} className="flex gap-3 rounded-2xl border bg-white p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-black text-white">{s.step}</div>
                  <div><div className="text-[13px] font-bold">{s.title}</div><div className="text-[12px] text-gray-500">{s.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border bg-white p-6 shadow-[0_20px_60px_rgba(11,30,61,0.06)]">
            <div className="text-[13px] font-bold">شركاؤنا في التدريب</div>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
              {['المقاولون العرب', 'اوراسكوم للإنشاء', 'Siemens Energy', 'Huawei Egypt', 'البنك الأهلي المصري', 'Valeo', 'Schneider Electric', 'السويدي إليكتريك', 'IBM Egypt'].map(company => (
                <div key={company} className="grid h-[64px] place-items-center rounded-xl border bg-[var(--bg)] px-2 text-center text-[11px] font-bold text-gray-600 transition hover:bg-white hover:shadow">
                  {company}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-[var(--bg)] p-4">
              <div className="flex items-center gap-2 text-[12px] font-bold"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> قصة نجاح</div>
              <p className="mt-2 text-[12px] leading-6 text-gray-600">“تدربت في Siemens كمهندس تحكم، ونفذت مشروع PLC لمحطة مياه. بعد التخرج بشهر تم تعييني بنفس الفريق.” — أحمد، خريج ميكاترونكس 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Affairs */}
      <section id="students" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="reveal grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] bg-[var(--primary)] p-7 text-white md:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"><Headset className="h-5 w-5" /></div>
              <h2 className="mt-5 text-[24px] font-black">شئون الطلاب سلسة في التعامل</h2>
              <p className="mt-3 text-[13px] leading-7 text-white/70">نؤمن أن تجربة الطالب الإدارية يجب أن تكون بنفس جودة تجربته الأكاديمية. فريق شئون الطلاب لدينا جاهز لتلقي جميع الشكاوى والمقترحات والاستفسارات، مع نظام تتبع إلكتروني ورد خلال 24 ساعة عمل.</p>
              <div className="mt-6 space-y-3 text-[12px]">
                <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3"><Clock className="h-4 w-4 text-amber-200" /> مواعيد العمل: السبت - الخميس 9ص - 3م</div>
                <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3"><Phone className="h-4 w-4 text-amber-200" /> خط ساخن: 0123456789 - تحويلة شئون الطلاب</div>
                <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3"><Mail className="h-4 w-4 text-amber-200" /> students@hiess.edu.eg</div>
              </div>
            </div>

            <div className="rounded-[28px] border bg-[var(--bg)] p-6 shadow-sm md:p-7">
              <h3 className="text-[18px] font-black">قدّم طلبك الآن</h3>
              <p className="mt-1 text-[12px] text-gray-500">سيتم الرد خلال 24 ساعة • جميع البيانات سرية</p>
              <div className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700">الاسم الكامل</label>
                    <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="مثال: محمد أحمد علي" className="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700">الرقم الأكاديمي</label>
                    <input value={formData.academicId} onChange={e => setFormData({ ...formData, academicId: e.target.value })} placeholder="2023XXXX" className="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[var(--primary)]" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700">نوع الطلب</label>
                    <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-[13px] outline-none">
                      <option>شكوى</option><option>اقتراح</option><option>استفسار</option><option>طلب إفادة</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700">القسم</label>
                    <select value={formData.dept} onChange={e => setFormData({ ...formData, dept: e.target.value })} className="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-[13px] outline-none">
                      <option value="">اختر القسم</option><option>هندسة مدنية</option><option>عمارة</option><option>اتصالات</option><option>ميكاترونكس</option><option>إدارة أعمال</option><option>محاسبة</option><option>نظم معلومات</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700">الرسالة</label>
                  <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} placeholder="اكتب تفاصيل طلبك بوضوح..." className="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[var(--primary)]" />
                </div>
                <button onClick={() => {
                  if (!formData.name || !formData.message) { setToast('يرجى إكمال الاسم والرسالة'); return; }
                  setToast('تم استلام طلبك بنجاح، سيتم الرد خلال 24 ساعة');
                  setFormData({ name: '', academicId: '', type: 'استفسار', dept: '', message: '' });
                }} className="rounded-full bg-[var(--primary)] py-3 text-[14px] font-bold text-white shadow hover:brightness-110 active:scale-[0.98]">إرسال الطلب</button>
                <div className="text-center text-[11px] text-gray-400">بالضغط على إرسال، توافق على سياسة الخصوصية ومتابعة الطلب عبر البريد الجامعي</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-[#08152F] py-12 text-white">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-1.5">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]"><GraduationCap className="h-5 w-5" /></div>
                <div className="text-[13px] font-extrabold">المعهد العالي للهندسة والعلوم الإدارية</div>
              </div>
              <p className="mt-3 max-w-[32ch] text-[12px] leading-6 text-white/60">نُخرّج مهندسين وإداريين جاهزين لسوق العمل، بمناهج عملية، معامل متطورة، وتدريب حقيقي في كبرى الشركات.</p>
              <div className="mt-4 flex gap-2">
                {[1,2,3].map(i => <div key={i} className="h-8 w-8 rounded-full bg-white/10 grid place-items-center text-[12px]">◐</div>)}
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold">تواصل معنا</div>
              <div className="mt-3 space-y-2 text-[12px] text-white/60">
                <div className="flex gap-2"><MapPin className="h-4 w-4 text-amber-200" /> القاهرة الجديدة، التجمع الخامس،   </div>
                <div className="flex gap-2"><Phone className="h-4 w-4 text-amber-200" /> 0123456789 • 0123456</div>
                <div className="flex gap-2"><Mail className="h-4 w-4 text-amber-200" /> info@hiess.edu.eg</div>
                <div className="flex gap-2"><Clock className="h-4 w-4 text-amber-200" /> السبت - الخميس 8ص - 4م</div>
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold">روابط سريعة</div>
              <div className="mt-3 grid gap-2 text-[12px] text-white/60">
                {['بوابة الطالب', 'الجداول الدراسية', 'نتائج الامتحانات', 'التدريب الميداني', 'المكتبة الرقمية'].map(l => <a key={l} href="#" className="hover:text-white">{l}</a>)}
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <div className="text-[12px] font-bold text-amber-200">النشرة الأكاديمية</div>
              <p className="mt-1 text-[11px] text-white/60">احصل على مواعيد التسجيل والمنح والتدريب</p>
              <div className="mt-3 flex gap-2">
                <input placeholder="بريدك الجامعي" className="w-full rounded-full bg-white/10 px-3 py-2 text-[11px] outline-none placeholder:text-white/40" />
                <button onClick={() => setToast('تم الاشتراك بنجاح')} className="rounded-full bg-white px-4 py-2 text-[11px] font-bold text-[var(--primary)]">اشتراك</button>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/40">
            <div>© 2026 المعهد العالي للهندسة والعلوم الإدارية - جميع الحقوق محفوظة • معتمد من وزارة التعليم العالي</div>
            <div className="flex gap-4"><span>سياسة الخصوصية</span><span>شروط الاستخدام</span></div>
          </div>
        </div>
      </footer>

      {/* Explain Modal */}
      {explainSubject && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setExplainSubject(null)}>
          <div onClick={e => e.stopPropagation()} className="max-h-[90vh] w-full max-w-[760px] overflow-auto rounded-[24px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg)]" style={{ color: explainSubject.color }}><explainSubject.icon className="h-5 w-5" /></div>
                <div><div className="text-[15px] font-bold">{explainSubject.name}</div><div className="text-[11px] text-gray-500">{explainSubject.doctor} • {explainSubject.level}</div></div>
              </div>
              <button onClick={() => setExplainSubject(null)} className="grid h-8 w-8 place-items-center rounded-full bg-gray-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-[var(--primary)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] to-[#0B1E3D]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center text-white">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur"><Play className="h-7 w-7 fill-white" /></div>
                    <div className="mt-3 text-[13px] font-bold">معاينة الشرح التفاعلي</div>
                    <div className="text-[11px] text-white/60">45 دقيقة • أمثلة عملية من المعمل</div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 h-1.5 rounded-full bg-white/20"><div className="h-full w-[34%] rounded-full bg-[var(--accent)]" /></div>
              </div>
              <p className="mt-5 text-[14px] leading-7 text-gray-700">{explainSubject.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {explainSubject.topics.map(t => <span key={t} className="rounded-full bg-[var(--bg)] px-3 py-1.5 text-[11px] font-bold border">{t}</span>)}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={() => { setExplainSubject(null); startQuiz(explainSubject); }} className="rounded-full bg-[var(--primary)] py-3 text-[13px] font-bold text-white">اختبر نفسك الآن</button>
                <button onClick={() => setExplainSubject(null)} className="rounded-full border bg-white py-3 text-[13px] font-bold">إغلاق</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {quizSubject && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setQuizSubject(null)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-[640px] overflow-hidden rounded-[24px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between bg-[var(--primary)] px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10"><quizSubject.icon className="h-5 w-5" /></div>
                <div><div className="text-[14px] font-bold">اختبار: {quizSubject.name}</div><div className="text-[11px] text-white/60">{quizSubject.doctor}</div></div>
              </div>
              <button onClick={() => setQuizSubject(null)} className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><X className="h-4 w-4" /></button>
            </div>

            {!quizFinished ? (
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-[12px] font-bold text-gray-500">سؤال {quizStep + 1} من 3</div>
                  <div className="flex gap-1.5">{[0,1,2].map(i => <div key={i} className={`h-1.5 w-8 rounded-full transition ${i <= quizStep ? 'bg-[var(--primary)]' : 'bg-gray-200'}`} />)}</div>
                </div>
                <h3 className="mt-5 text-[16px] font-bold leading-7">{quizSubject.questions[quizStep].q}</h3>
                <div className="mt-5 grid gap-2.5">
                  {quizSubject.questions[quizStep].options.map((opt, idx) => {
                    const selected = quizAnswers[quizStep] === idx;
                    return (
                      <button key={idx} onClick={() => submitAnswer(idx)} className={`rounded-xl border px-4 py-3 text-right text-[13px] font-semibold transition ${selected ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow' : 'border-gray-200 bg-white hover:border-[var(--primary)]/30 hover:bg-gray-50'}`}>
                        <span className={`ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${selected ? 'bg-white text-[var(--primary)]' : 'bg-gray-100'}`}>{['أ','ب','ج','د'][idx]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${score >= 2 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  <Award className="h-10 w-10" />
                </div>
                <div className="mt-4 text-[22px] font-black">{Math.round((score/3)*100)}% — {score}/3 إجابات صحيحة</div>
                <p className="mx-auto mt-2 max-w-[40ch] text-[13px] leading-6 text-gray-500">
                  {score === 3 ? 'ممتاز! إتقان كامل للمادة — استمر بهذا المستوى في المعمل.' : score === 2 ? 'أداء جيد جداً، راجع نقطة واحدة وستصل للامتياز.' : 'تحتاج مراجعة سريعة للشرح وحضور السكشن القادم في المعمل.'}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button onClick={() => { setQuizStep(0); setQuizAnswers([]); setQuizFinished(false); }} className="rounded-full border py-3 text-[13px] font-bold">إعادة الاختبار</button>
                  <button onClick={() => setQuizSubject(null)} className="rounded-full bg-[var(--primary)] py-3 text-[13px] font-bold text-white">إنهاء</button>
                </div>
                {progress[quizSubject.id] !== undefined && <div className="mt-4 text-[11px] text-gray-400">أفضل نتيجة محفوظة لهذه المادة: {progress[quizSubject.id]}%</div>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[var(--primary)] px-5 py-3 text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] md:bottom-6">
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
          <span className="text-[13px] font-bold">{toast}</span>
        </div>
      )}

      {/* Bottom safe area */}
      <div className="h-[1px]" />
    </div>
  );
}
