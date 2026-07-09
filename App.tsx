import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Info, 
  ArrowRight, 
  Copy, 
  Trash2, 
  Loader2,
  Zap,
  ShieldCheck,
  Cpu,
  LogIn,
  LogOut,
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  Play,
  BookOpen,
  Video,
  GraduationCap,
  ChevronRight
} from 'lucide-react';

// --- Types ---

interface User {
  id: number;
  email: string;
  name: string;
}

// --- AI Service ---

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not available. Please ensure it is set in the AI Studio secrets.");
  }
  return new GoogleGenAI({ apiKey });
};

// --- Components ---

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px] animate-blob" />
    <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-violet-200/30 rounded-full blur-[120px] animate-blob animation-delay-2000" />
    <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-emerald-100/30 rounded-full blur-[120px] animate-blob animation-delay-4000" />
  </div>
);

const Navbar = ({ currentPage, setCurrentPage, user, onLogout }: { 
  currentPage: string, 
  setCurrentPage: (p: string) => void,
  user: User | null,
  onLogout: () => void
}) => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3"
    >
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={() => setCurrentPage('home')}
      >
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }}
          className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <span className="font-display font-bold text-xl tracking-tight group-hover:text-indigo-600 transition-colors">ILI</span>
      </div>
      <div className="flex items-center gap-8">
        {['home', 'assistant', 'learning', 'about'].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`capitalize font-medium transition-all relative ${
              currentPage === page ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'
            }`}
          >
            {page}
            {currentPage === page && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
              />
            )}
          </button>
        ))}
        {user ? (
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 rounded-xl border border-slate-200/50"
            >
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <span className="text-sm font-bold text-slate-700">{user.name}</span>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('auth')}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Login
          </motion.button>
        )}
      </div>
    </motion.div>
  </nav>
);

const Home = ({ onStart }: { onStart: () => void }) => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100"
          >
            <Zap className="w-4 h-4" />
            <span>AI-Powered Writing Intelligence</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl lg:text-8xl font-display font-bold leading-[0.95] mb-6 tracking-tight"
          >
            Write with <span className="text-gradient">Confidence</span> and Clarity.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl"
          >
            Inline Language Intelligence (ILI) is your real-time companion for perfect communication. Improve grammar, refine tone, and enhance clarity instantly.
          </motion.p>
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-2xl shadow-indigo-500/20 group"
            >
              Start Writing Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const el = document.getElementById('demo-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/10 flex items-center gap-2"
            >
              <Play className="w-5 h-5 text-indigo-600" />
              View Demo
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-10 bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" />
          <div className="relative glass rounded-[2.5rem] p-10 overflow-hidden shadow-2xl border-white/40">
            <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-6">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-lg shadow-red-200" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-lg shadow-amber-200" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-200" />
              </div>
            </div>
            <div className="space-y-6">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100 italic text-slate-400 text-lg"
              >
                "I didnt recieve the file why you not send it"
              </motion.div>
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="flex justify-center"
              >
                <div className="bg-indigo-600 p-2 rounded-full shadow-lg shadow-indigo-200">
                  <ArrowRight className="w-6 h-6 text-white rotate-90" />
                </div>
              </motion.div>
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="p-5 bg-indigo-600 rounded-2xl border border-indigo-400 font-medium text-white text-lg shadow-xl shadow-indigo-200"
              >
                "I haven't received the file yet. Could you please send it when possible?"
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex gap-3"
              >
                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-black rounded-lg tracking-wider">POLITE</span>
                <span className="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-black rounded-lg tracking-wider">PROFESSIONAL</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div id="demo-section" className="mt-40 scroll-mt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold mb-4">See ILI in Action</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Watch how our AI transforms everyday communication into professional, polished messages.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass rounded-[3rem] p-4 shadow-2xl overflow-hidden aspect-video border-white/40"
        >
          <iframe 
            className="w-full h-full rounded-[2.5rem]"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1" 
            title="ILI Product Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>

      <div className="mt-40 grid md:grid-cols-3 gap-10">
        {[
          { icon: ShieldCheck, title: "Grammar Check", desc: "Advanced NLP algorithms detect and fix spelling and syntax errors instantly.", color: "indigo" },
          { icon: Cpu, title: "Tone Analysis", desc: "Understand how your message sounds to others and get polite alternatives.", color: "violet" },
          { icon: Sparkles, title: "Smart Improvement", desc: "Rewrite sentences to be more professional, clear, and impactful.", color: "emerald" }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -10 }}
            className="p-10 bg-white/80 backdrop-blur-sm rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 group"
          >
            <div className={`w-14 h-14 bg-${feature.color}-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const Auth = ({ onAuthSuccess }: { onAuthSuccess: (user: User) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const endpoint = isLogin ? '/api/login' : '/api/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Authentication failed');
      onAuthSuccess(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-[2.5rem] p-10 shadow-2xl border-white/40"
        >
          <div className="text-center mb-10">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/40"
            >
              <ShieldCheck className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 text-lg">
              {isLogin ? 'Enter your details to continue' : 'Join ILI and start writing better'}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3"
            >
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <Info className="w-4 h-4" />
              </div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/30 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />)}
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 font-black hover:text-indigo-700 transition-colors uppercase tracking-widest text-xs"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Assistant = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<{
    grammar?: string;
    improved?: string;
    tone?: { tone: string; politeAlternative?: string };
  }>({});
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (type: 'improve' | 'grammar' | 'tone' | 'all') => {
    if (!text.trim()) return;
    setLoading(type);
    setError(null);
    
    const runTask = async (taskType: 'improve' | 'grammar' | 'tone') => {
      const ai = getAI();
      let prompt = "";
      let config = {};

      if (taskType === 'improve') {
        prompt = `Improve the following text for clarity and professionalism: "${text}"`;
      } else if (taskType === 'grammar') {
        prompt = `Correct the grammar and spelling of the following text: "${text}". Only return the corrected text.`;
      } else if (taskType === 'tone') {
        prompt = `Analyze the tone of the following text: "${text}". Categorize it as Positive, Neutral, Negative, Polite, or Aggressive. If it is aggressive, provide a polite alternative. Return the result in JSON format with keys "tone" and "politeAlternative".`;
        config = { responseMimeType: "application/json" };
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: prompt }] }],
        config
      });

      if (taskType === 'tone') {
        return JSON.parse(response.text || "{}");
      }
      return { result: response.text };
    };

    try {
      if (type === 'all') {
        const [improveData, grammarData, toneData] = await Promise.all([
          runTask('improve'),
          runTask('grammar'),
          runTask('tone')
        ]);
        setResults({
          improved: improveData.result,
          grammar: grammarData.result,
          tone: toneData
        });
      } else {
        const data = await runTask(type);
        if (type === 'improve') setResults(prev => ({ ...prev, improved: data.result }));
        if (type === 'grammar') setResults(prev => ({ ...prev, grammar: data.result }));
        if (type === 'tone') setResults(prev => ({ ...prev, tone: data }));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please check your API key and try again.");
    } finally {
      setLoading(null);
    }
  };

  const clearText = () => {
    setText('');
    setResults({});
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Writing Assistant</h2>
            <div className="text-sm text-slate-500 font-medium">
              {text.length} characters | {text.split(/\s+/).filter(Boolean).length} words
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              {error}
            </motion.div>
          )}
          
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your message here..."
              className="w-full h-48 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none pr-16"
            />
            <button
              onClick={() => handleAction('all')}
              disabled={!!loading || !text}
              className="absolute bottom-4 right-4 p-4 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all group"
              title="Analyze All"
            >
              {loading === 'all' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />}
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => handleAction('improve')}
              disabled={!!loading || !text}
              className="flex-1 min-w-[140px] py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading === 'improve' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-indigo-500" />}
              Improve
            </button>
            <button
              onClick={() => handleAction('grammar')}
              disabled={!!loading || !text}
              className="flex-1 min-w-[140px] py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading === 'grammar' ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              Grammar
            </button>
            <button
              onClick={() => handleAction('tone')}
              disabled={!!loading || !text}
              className="flex-1 min-w-[140px] py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading === 'tone' ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4 text-amber-500" />}
              Tone
            </button>
            <button
              onClick={clearText}
              className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-6">
          <AnimatePresence>
            {(results.grammar || results.improved) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-display font-bold text-indigo-600">Final Result</h3>
                  <button 
                    onClick={() => copyToClipboard(`Original:\n${text}\n\nCorrected:\n${results.grammar || 'N/A'}\n\nSuggestion:\n${results.improved || 'N/A'}`)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy All
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-bold text-slate-900 mb-1">Original:</div>
                    <p className="text-slate-700">{text}</p>
                  </div>
                  
                  {results.grammar && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-sm font-bold text-slate-900 mb-1">Corrected:</div>
                      <p className="text-slate-700">{results.grammar}</p>
                    </div>
                  )}
                  
                  {results.improved && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-sm font-bold text-slate-900 mb-1">Suggestion:</div>
                      <p className="text-slate-700">{results.improved}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {results.tone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl"
              >
                <div className="flex items-center gap-2 text-indigo-400 font-bold mb-4">
                  <MessageSquare className="w-5 h-5" />
                  Tone Analysis
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm uppercase tracking-widest text-slate-400 font-bold">Detected Tone:</span>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-bold border border-indigo-500/30">
                    {results.tone.tone}
                  </span>
                </div>
                {results.tone.politeAlternative && (
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Polite Suggestion:</div>
                    <p className="text-slate-300 italic">"{results.tone.politeAlternative}"</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-display font-bold mb-8">About ILI</h1>
        <div className="prose prose-slate lg:prose-xl">
          <p className="text-xl text-slate-600 leading-relaxed mb-6">
            Inline Language Intelligence (ILI) is a cutting-edge AI writing assistant designed to bridge the gap between thought and expression.
          </p>
          <h3 className="text-2xl font-bold mb-4">How it works</h3>
          <p className="text-slate-600 mb-6">
            Using advanced Large Language Models, ILI analyzes your text in real-time to understand context, intent, and emotion. It doesn't just fix typos; it understands the nuance of human communication.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-white rounded-2xl border border-slate-100">
              <h4 className="font-bold mb-2">Gemini AI</h4>
              <p className="text-sm text-slate-500">Powered by Google's most capable AI models for deep linguistic understanding.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100">
              <h4 className="font-bold mb-2">Real-time NLP</h4>
              <p className="text-sm text-slate-500">Instant processing of grammar, syntax, and emotional tone.</p>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-slate-600">
            We believe that clear communication is a fundamental human right. Our mission is to provide tools that help everyone express themselves with confidence, regardless of their native language or writing experience.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

const Learning = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = [
    {
      id: 'nouns',
      title: 'Nouns & Pronouns',
      desc: 'The building blocks of sentences. Learn how to identify and use them correctly.',
      videoUrl: 'https://www.youtube.com/embed/8kK2zwjRV0M',
      icon: BookOpen
    },
    {
      id: 'verbs',
      title: 'Verbs & Tenses',
      desc: 'Master the art of action. Understand past, present, and future tenses.',
      videoUrl: 'https://www.youtube.com/embed/LAn7fH6I29M',
      icon: Zap
    },
    {
      id: 'punctuation',
      title: 'Punctuation Rules',
      desc: 'Commas, periods, and semicolons. Learn where they go and why.',
      videoUrl: 'https://www.youtube.com/embed/LdCOswMeXFQ',
      icon: ShieldCheck
    },
    {
      id: 'structure',
      title: 'Sentence Structure',
      desc: 'How to build clear, concise, and professional sentences.',
      videoUrl: 'https://www.youtube.com/embed/01_9_v6S-mE',
      icon: Cpu
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6 border border-indigo-100">
            <GraduationCap className="w-5 h-5" />
            <span>Grammar Learning Center</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6 tracking-tight">
            Master Basic <span className="text-gradient">Grammar</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Enhance your writing skills with our curated video lessons on essential English grammar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className="space-y-4">
            {topics.map((topic) => (
              <motion.button
                key={topic.id}
                whileHover={{ x: 10 }}
                onClick={() => setSelectedTopic(topic.id)}
                className={`w-full text-left p-6 rounded-3xl border transition-all flex items-center justify-between group ${
                  selectedTopic === topic.id 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200' 
                    : 'bg-white border-slate-100 hover:border-indigo-200 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    selectedTopic === topic.id ? 'bg-white/20' : 'bg-indigo-50'
                  }`}>
                    <topic.icon className={`w-6 h-6 ${selectedTopic === topic.id ? 'text-white' : 'text-indigo-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{topic.title}</h3>
                    <p className={`text-sm ${selectedTopic === topic.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {topic.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${selectedTopic === topic.id ? 'translate-x-1' : 'group-hover:translate-x-1 text-slate-300'}`} />
              </motion.button>
            ))}
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {selectedTopic ? (
                <motion.div
                  key={selectedTopic}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-[2.5rem] p-4 shadow-2xl aspect-video overflow-hidden border-white/40 sticky top-32"
                >
                  <iframe 
                    className="w-full h-full rounded-[2rem]"
                    src={`${topics.find(t => t.id === selectedTopic)?.videoUrl}?autoplay=1`}
                    title="Grammar Lesson"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </motion.div>
              ) : (
                <div className="glass rounded-[2.5rem] p-12 shadow-2xl aspect-video flex flex-col items-center justify-center text-center border-white/40 sticky top-32">
                  <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6">
                    <Video className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Select a Topic</h3>
                  <p className="text-slate-500">Choose a grammar topic from the left to start watching the lesson.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/me');
        const data = await response.json();
        if (response.ok) setUser(data.user);
      } catch (err) {
        console.error("Auth check failed");
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setUser(null);
      setCurrentPage('home');
    } catch (err) {
      console.error("Logout failed");
    }
  };

  const handleStart = () => {
    if (user) {
      setCurrentPage('assistant');
    } else {
      setCurrentPage('auth');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <AnimatedBackground />
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user}
        onLogout={handleLogout}
      />
      
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Home onStart={handleStart} />
            </motion.div>
          )}
          {currentPage === 'assistant' && (
            <motion.div
              key="assistant"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {user ? <Assistant /> : <Auth onAuthSuccess={(u) => { setUser(u); setCurrentPage('assistant'); }} />}
            </motion.div>
          )}
          {currentPage === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Auth onAuthSuccess={(u) => { setUser(u); setCurrentPage('assistant'); }} />
            </motion.div>
          )}
          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <About />
            </motion.div>
          )}
          {currentPage === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Learning />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="font-display font-bold">ILI Project</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 Inline Language Intelligence. Built with Gemini AI.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">GitHub</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
