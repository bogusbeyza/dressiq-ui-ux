import React, { useState, useEffect } from "react";
import { 
  Home, 
  Compass, 
  Bot, 
  Users, 
  User, 
  Search, 
  Bell, 
  Plus, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Send, 
  Camera, 
  Image as ImageIcon,
  Mic,
  Settings,
  ChevronLeft,
  X,
  Star,
  Check,
  MoreVertical,
  Filter,
  Palette,
  Flame,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from "recharts";
import { toast, Toaster } from "sonner@2.0.3";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// --- Types & Constants ---

type AppState = "splash" | "onboarding" | "main";
type Tab = "home" | "explore" | "stylebot" | "community" | "profile" | "notifications" | "messages";

const COLORS = {
  primaryNavy: "#0F203F",
  mediumBlue: "#345C81",
  accentCyan: "#87D3E4",
  secondaryNavy: "#1C375A",
  softBlue: "#528EAD",
  lightGrey: "#F5F7FA",
  white: "#FFFFFF",
  success: "#00C48C",
  error: "#FF6B6B",
  borderGrey: "#E5E5E5",
};

const STYLES = {
  gradient: "bg-linear-to-br from-[#0F203F] to-[#345C81]",
  shadow: "shadow-[0_4px_12px_rgba(15,32,63,0.25)]",
  cardShadow: "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
  roundedFull: "rounded-[24px]",
  roundedMd: "rounded-[16px]",
};

// --- Mock Data ---

const FEED_DATA = [
  {
    id: 1,
    user: "elif_style",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    image: "https://images.unsplash.com/photo-1700557478789-5e3fdb3e29ff?w=800&q=80",
    tags: ["#Casual", "#Streetwear", "#Autumn"],
    likes: "1.2K",
    comments: 234,
    insight: "Renk uyumu: 9/10",
    desc: "Bugünkü sonbahar esintili kombinim. Oversize ceketler bu sene vazgeçilmezim!",
    time: "3 saat önce"
  },
  {
    id: 2,
    user: "mert_fashion",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    image: "https://images.unsplash.com/photo-1596857578215-71a7b575e344?w=800&q=80",
    tags: ["#Urban", "#Minimalist"],
    likes: "850",
    comments: 42,
    insight: "Stil tutarlılığı: 10/10",
    desc: "Şehir hayatı için hem şık hem rahat bir seçim.",
    time: "5 saat önce"
  }
];

const STYLE_DNA = [
  { subject: 'Casual', A: 80, fullMark: 100 },
  { subject: 'Formal', A: 40, fullMark: 100 },
  { subject: 'Street', A: 70, fullMark: 100 },
  { subject: 'Minimal', A: 90, fullMark: 100 },
  { subject: 'Vintage', A: 30, fullMark: 100 },
  { subject: 'Boho', A: 50, fullMark: 100 },
];

// --- Sub-Components ---

const Splash = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-white`}>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-32 flex flex-col items-center justify-center">
           <div className="text-4xl font-bold text-[#0F203F] mb-1">DressIQ</div>
           <div className="w-8 h-8 bg-[#87D3E4] rounded-full flex items-center justify-center">
             <Star size={18} color="white" fill="white" />
           </div>
        </div>
        <div className="mt-8 text-[#0F203F] font-medium text-lg">Tarzın Akıllı Yolu</div>
        <div className="mt-12 flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="w-2.5 h-2.5 rounded-full bg-[#0F203F]"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const screens = [
    {
      title: "AI Stil Asistanınız",
      desc: "StyleBot, size özel kombinler önerir",
      img: "https://images.unsplash.com/photo-1768825182160-d5481c5ebd19?w=800&q=80",
      accent: COLORS.accentCyan
    },
    {
      title: "Topluluğa Katılın",
      desc: "Stilinizi paylaşın, ilham alın",
      img: "https://images.unsplash.com/photo-1764287319604-f11ab8676901?w=800&q=80",
      accent: COLORS.mediumBlue
    },
    {
      title: "Gizliliğinizi Koruyun",
      desc: "Yüz gizleme özelliğini istediğiniz zaman açabilirsiniz",
      img: "https://images.unsplash.com/photo-1629922949137-e236a5ab497d?w=800&q=80",
      accent: COLORS.primaryNavy,
      extra: "Zorunlu değil, tamamen sizin seçiminiz"
    }
  ];

  const next = () => {
    if (step < screens.length - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <div className="absolute inset-0 z-40 bg-white flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-full aspect-square rounded-3xl overflow-hidden mb-12 shadow-xl">
               <ImageWithFallback src={screens[step].img} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.primaryNavy }}>{screens[step].title}</h2>
            <p className="text-lg text-gray-600 px-4">{screens[step].desc}</p>
            {screens[step].extra && <p className="text-sm text-gray-400 mt-2 italic">{screens[step].extra}</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 pb-12">
        <div className="flex justify-center space-x-2 mb-8">
          {screens.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-[#0F203F]" : "w-2 bg-gray-200"}`} />
          ))}
        </div>
        
        <button 
          onClick={next}
          className={`w-full py-4 rounded-full text-white font-semibold text-lg transition-transform active:scale-95 mb-4 ${STYLES.gradient} ${STYLES.shadow}`}
        >
          {step === screens.length - 1 ? "Başlayalım" : "Devam Et"}
        </button>
        
        {step === screens.length - 1 && (
          <button onClick={onComplete} className="w-full py-2 text-gray-500 font-medium">Zaten Hesabım Var</button>
        )}
      </div>
    </div>
  );
};

const Header = ({ title, showSearch = true, onNotifClick, onSearchClick, onMessageClick }: { title: string | React.ReactNode, showSearch?: boolean, onNotifClick?: () => void, onSearchClick?: () => void, onMessageClick?: () => void }) => (
  <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
    <div className="flex items-center">
       {typeof title === 'string' ? (
         <span className="text-xl font-bold text-[#0F203F]">{title}</span>
       ) : (
         title
       )}
    </div>
    <div className="flex items-center space-x-4">
      {showSearch && <button onClick={onSearchClick} className="cursor-pointer"><Search size={22} className="text-[#0F203F]" /></button>}
      <button onClick={onNotifClick} className="relative cursor-pointer">
        <Bell size={22} className="text-[#0F203F]" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">3</span>
      </button>
      <button onClick={onMessageClick} className="relative cursor-pointer">
        <MessageCircle size={22} className="text-[#0F203F]" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#87D3E4] text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">2</span>
      </button>
    </div>
  </header>
);

const NotificationScreen = ({ onBack }: { onBack: () => void }) => {
  const notifications = [
    { id: 1, user: 'mert_fashion', action: 'gönderini beğendi', time: '2s', type: 'like', img: FEED_DATA[1].image },
    { id: 2, user: 'bot', action: 'Size özel 5 yeni kombin hazır!', time: '5s', type: 'bot' },
    { id: 3, user: 'ayse_style', action: 'seni takip etmeye başladı', time: '1s', type: 'follow' },
  ];

  return (
    <div className="bg-white min-h-full">
      <div className="p-4 flex items-center gap-4 border-b border-gray-100">
         <button onClick={onBack}><ChevronLeft size={24} /></button>
         <h2 className="font-bold text-lg">Bildirimler</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {notifications.map(n => (
          <div key={n.id} className="p-4 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                {n.type === 'bot' ? <Bot size={20} className="text-[#87D3E4]" /> : <ImageWithFallback src={`https://i.pravatar.cc/150?u=${n.id}`} />}
             </div>
             <div className="flex-1">
                <p className="text-sm">
                   <span className="font-bold mr-1">{n.user === 'bot' ? 'StyleBot' : n.user}</span>
                   {n.action}
                </p>
                <span className="text-[10px] text-gray-400">{n.time}</span>
             </div>
             {n.img && <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0"><ImageWithFallback src={n.img} /></div>}
             {n.type === 'follow' && <button className="px-4 py-1.5 bg-[#0F203F] text-white text-[10px] font-bold rounded-full">Takip Et</button>}
             {n.type === 'bot' && <button className="px-4 py-1.5 bg-[#87D3E4] text-[#0F203F] text-[10px] font-bold rounded-full">Gör</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagesScreen = ({ onBack }: { onBack: () => void }) => {
  const conversations = [
    { id: 1, user: 'elif_style', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', lastMessage: 'Bu kombini çok beğendim! 🔥', time: '2dk', unread: 2 },
    { id: 2, user: 'mert_fashion', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', lastMessage: 'Teşekkürler, sana da yakışır!', time: '1s', unread: 0 },
    { id: 3, user: 'ayse_trend', avatar: 'https://i.pravatar.cc/150?u=3', lastMessage: 'Yarın alışverişe gidelim mi?', time: '3s', unread: 1 },
    { id: 4, user: 'zeynep_minimal', avatar: 'https://i.pravatar.cc/150?u=4', lastMessage: 'O ceketi nereden aldın?', time: '1h', unread: 0 },
  ];

  return (
    <div className="bg-white min-h-full">
      <div className="p-4 flex items-center gap-4 border-b border-gray-100">
         <button onClick={onBack}><ChevronLeft size={24} /></button>
         <h2 className="font-bold text-lg">Mesajlar</h2>
         <div className="flex-1" />
         <button className="p-2 bg-[#F5F7FA] rounded-full">
           <Plus size={18} className="text-[#0F203F]" />
         </button>
      </div>
      
      {/* Search */}
      <div className="p-4 pt-2">
        <div className="bg-[#F5F7FA] rounded-full px-4 py-2.5 flex items-center gap-2">
          <Search size={16} className="text-gray-400" />
          <input placeholder="Mesajlarda ara..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {conversations.map(c => (
          <div key={c.id} className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
             <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                <ImageWithFallback src={c.avatar} className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-bold text-sm text-[#0F203F]">{c.user}</span>
                  <span className="text-[10px] text-gray-400">{c.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{c.lastMessage}</p>
             </div>
             {c.unread > 0 && (
               <div className="w-5 h-5 bg-[#87D3E4] rounded-full flex items-center justify-center shrink-0">
                 <span className="text-[10px] font-bold text-[#0F203F]">{c.unread}</span>
               </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );
};

const FeedCard = ({ data }: { data: typeof FEED_DATA[0] }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-white mb-6 overflow-hidden ${STYLES.cardShadow} ${STYLES.roundedMd}`}
  >
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src={data.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-white" alt="" />
        <div>
          <div className="font-semibold text-sm text-[#0F203F]">{data.user}</div>
          <div className="text-xs text-gray-400">{data.time}</div>
        </div>
      </div>
      <MoreVertical size={18} className="text-gray-400" />
    </div>

    <div className="relative aspect-[4/5] bg-gray-100">
      <ImageWithFallback src={data.image} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        {data.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-medium text-[#0F203F]">{tag}</span>
        ))}
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 group cursor-pointer">
            <Heart size={22} className="text-gray-400 group-hover:text-red-500 transition-colors" />
            <span className="text-xs font-medium text-gray-500">{data.likes}</span>
          </div>
          <div className="flex items-center space-x-1.5 group cursor-pointer">
            <MessageCircle size={22} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-500">{data.comments}</span>
          </div>
          <Share2 size={22} className="text-gray-400" />
        </div>
        <Bookmark size={22} className="text-gray-400" />
      </div>

      <div className="mb-2">
        <button 
          onClick={() => toast.info("AI Analizi: Bu kombin %92 sonbahar trendlerine uyumlu!")}
          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[rgba(135,211,228,0.1)] border border-[#87D3E4] rounded-full text-[11px] font-semibold text-[#345C81] transition-transform active:scale-95"
        >
          <div className="w-3 h-3 bg-[#87D3E4] rounded-full flex items-center justify-center">
             <Star size={8} color="white" fill="white" />
          </div>
          <span>{data.insight}</span>
        </button>
      </div>

      <p className="text-sm text-[#0F203F] line-clamp-2">
        <span className="font-bold mr-2">{data.user}</span>
        {data.desc}
      </p>
    </div>
  </motion.div>
);

const StyleBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Merhaba! Ben StyleBot. Bugün sana nasıl bir kombin önermemi istersin? ✨', time: '12:00' }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), type: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Simulate bot thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: 'Harika bir fikir! İşte sana uygun birkaç öneri hazırlıyorum...',
        hasCarousel: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex ${m.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.type === 'bot' ? 'bg-[#87D3E4]' : 'bg-gray-300 overflow-hidden'}`}>
                {m.type === 'bot' ? <Bot size={18} color="white" /> : <ImageWithFallback src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />}
              </div>
              <div className={`p-4 ${m.type === 'bot' ? 'bg-white text-[#0F203F] rounded-2xl rounded-bl-none shadow-sm' : 'bg-[#345C81] text-white rounded-2xl rounded-br-none shadow-sm'}`}>
                <p className="text-sm">{m.text}</p>
                {m.hasCarousel && (
                   <div className="flex gap-3 overflow-x-auto mt-4 pb-2 -mx-2 px-2 scrollbar-hide">
                     {[1,2,3].map(i => (
                       <div key={i} className="min-w-[140px] bg-[#F5F7FA] rounded-xl overflow-hidden shadow-sm">
                          <ImageWithFallback src={`https://images.unsplash.com/photo-15${i}5439623131-6a91ce98e4c0?w=200&q=80`} className="w-full h-32 object-cover" />
                          <div className="p-2">
                             <div className="text-[10px] font-bold">ZARA Ceket</div>
                             <div className="text-[10px] text-gray-500">₺1,200</div>
                             <button className="w-full mt-2 py-1 bg-white border border-[#E5E5E5] rounded-full text-[9px] font-bold">Detay Gör</button>
                          </div>
                       </div>
                     ))}
                   </div>
                )}
                <div className={`text-[9px] mt-1 ${m.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>{m.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {["Düğüne ne giysem?", "Sonbahar kombinleri", "Bütçeme uygun", "Ofis stili"].map(q => (
            <button key={q} onClick={() => setInput(q)} className="shrink-0 px-4 py-1.5 bg-[#F5F7FA] rounded-full text-xs font-medium text-[#345C81] border border-gray-100">
              {q}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400"><ImageIcon size={22} /></button>
          <div className="flex-1 bg-[#F5F7FA] rounded-full flex items-center px-4 py-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Mesajınızı yazın..." 
              className="flex-1 bg-transparent border-none outline-none text-sm py-1"
            />
            <button className="text-gray-400"><Mic size={20} /></button>
          </div>
          <button 
            onClick={send}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${STYLES.gradient} shrink-0`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState<'posts' | 'users' | 'styles'>('posts');
  const [searchQuery, setSearchQuery] = useState('');

  const MOCK_USERS = [
    { id: 1, name: 'elif_style', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', followers: '3.4K', isFollowing: false },
    { id: 2, name: 'mert_fashion', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', followers: '2.1K', isFollowing: true },
    { id: 3, name: 'ayse_trend', avatar: 'https://i.pravatar.cc/150?u=3', followers: '5.8K', isFollowing: false },
    { id: 4, name: 'zeynep_minimal', avatar: 'https://i.pravatar.cc/150?u=4', followers: '1.2K', isFollowing: false },
  ];

  const MOCK_STYLES = [
    { id: 1, title: 'Sonbahar Casual', tags: ['#casual', '#autumn'], image: 'https://images.unsplash.com/photo-1700557478789-5e3fdb3e29ff?w=400&q=80', match: '92%' },
    { id: 2, title: 'Urban Minimal', tags: ['#urban', '#minimal'], image: 'https://images.unsplash.com/photo-1596857578215-71a7b575e344?w=400&q=80', match: '88%' },
    { id: 3, title: 'Streetwear Vibes', tags: ['#street', '#trendy'], image: 'https://images.unsplash.com/photo-1764287319604-f11ab8676901?w=400&q=80', match: '85%' },
  ];

  const HASHTAGS = ['#casual', '#streetwear', '#minimal', '#autumn', '#urban', '#boho', '#vintage', '#chic'];

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 bg-[#F5F7FA] rounded-full px-4 py-2.5 flex items-center gap-2">
          <Search size={18} className="text-gray-400" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeFilter === 'users' ? '@kullanici ara...' : activeFilter === 'styles' ? 'Stil önerisi ara...' : '#hashtag ile ara...'}
            className="bg-transparent border-none outline-none text-sm w-full" 
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-100 pb-3">
        <button 
          onClick={() => setActiveFilter('posts')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'posts' 
              ? 'bg-[#0F203F] text-white' 
              : 'bg-[#F5F7FA] text-[#0F203F]'
          }`}
        >
          Postlar
        </button>
        <button 
          onClick={() => setActiveFilter('users')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'users' 
              ? 'bg-[#0F203F] text-white' 
              : 'bg-[#F5F7FA] text-[#0F203F]'
          }`}
        >
          Kullanıcılar
        </button>
        <button 
          onClick={() => setActiveFilter('styles')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'styles' 
              ? 'bg-[#0F203F] text-white' 
              : 'bg-[#F5F7FA] text-[#0F203F]'
          }`}
        >
          Stil Önerisi
        </button>
      </div>

      {/* Posts Tab */}
      {activeFilter === 'posts' && (
        <>
          {/* Hashtag Filter */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {HASHTAGS.map(tag => (
              <button 
                key={tag} 
                onClick={() => setSearchQuery(tag)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  searchQuery === tag 
                    ? 'bg-[#87D3E4] text-[#0F203F]' 
                    : 'bg-[#F5F7FA] text-[#345C81] border border-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="columns-2 gap-3 space-y-3">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="break-inside-avoid relative rounded-xl overflow-hidden group cursor-pointer">
                <ImageWithFallback 
                  src={`https://images.unsplash.com/photo-1${i}64287319604-f11ab8676901?w=400&q=80`} 
                  className="w-full h-auto object-cover" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                   <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-1.5">
                         <Heart size={12} fill="white" />
                         <span className="text-[10px]">1.4K</span>
                      </div>
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-white">
                         <ImageWithFallback src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" />
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Users Tab */}
      {activeFilter === 'users' && (
        <div className="space-y-3">
          {MOCK_USERS.map(user => (
            <div key={user.id} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <ImageWithFallback src={user.avatar} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-[#0F203F]">{user.name}</div>
                <div className="text-xs text-gray-400">{user.followers} takipçi</div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-[#F5F7FA] rounded-full">
                  <MessageCircle size={16} className="text-[#345C81]" />
                </button>
                <button className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                  user.isFollowing 
                    ? 'bg-[#F5F7FA] text-[#0F203F] border border-gray-200' 
                    : 'bg-[#0F203F] text-white'
                }`}>
                  {user.isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Styles Tab */}
      {activeFilter === 'styles' && (
        <div className="space-y-4">
          {MOCK_STYLES.map(style => (
            <div key={style.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative aspect-video">
                <ImageWithFallback src={style.image} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#87D3E4] rounded-full">
                  <span className="text-xs font-bold text-[#0F203F]">{style.match} Eşleşme</span>
                </div>
              </div>
              <div className="p-4">
                <div className="font-bold text-[#0F203F] mb-2">{style.title}</div>
                <div className="flex gap-2 mb-3">
                  {style.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#F5F7FA] rounded-full text-[10px] font-medium text-[#345C81]">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-[#0F203F] text-white rounded-full text-xs font-bold">Kombini Gör</button>
                  <button className="py-2 px-4 bg-[#F5F7FA] rounded-full">
                    <Bookmark size={16} className="text-[#345C81]" />
                  </button>
                  <button className="py-2 px-4 bg-[#F5F7FA] rounded-full">
                    <Share2 size={16} className="text-[#345C81]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  return (
    <div className="pb-20">
      <div className="p-6 text-center">
        <div className="relative inline-block mb-4">
           <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <ImageWithFallback src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" className="w-full h-full object-cover" />
           </div>
           <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#87D3E4] rounded-full border-2 border-white flex items-center justify-center text-white">
              <Plus size={16} />
           </button>
        </div>
        <h2 className="text-xl font-bold text-[#0F203F]">Elif Yılmaz</h2>
        <p className="text-gray-400 text-sm mb-4">@elif_style</p>
        <p className="text-sm text-gray-600 px-8 mb-6">Moda tutkunu, AI stil danışmanınızla birlikte en iyi kombinleri keşfediyoruz! ✨</p>
        
        <div className="flex items-center justify-around mb-8 px-4">
           <div className="text-center">
              <div className="font-bold text-[#0F203F]">127</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Gönderi</div>
           </div>
           <div className="text-center">
              <div className="font-bold text-[#0F203F]">3.4K</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Takipçi</div>
           </div>
           <div className="text-center">
              <div className="font-bold text-[#0F203F]">892</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Takip</div>
           </div>
        </div>

        <button className="w-full py-2.5 rounded-full border-2 border-[#0F203F] text-[#0F203F] font-semibold text-sm">Profili Düzenle</button>
      </div>

      <div className="mx-4 mb-6 p-4 bg-[#0F203F] rounded-2xl text-white overflow-hidden relative">
         <div className="flex items-center gap-2 mb-4">
            <Star size={18} className="text-[#87D3E4]" fill="#87D3E4" />
            <span className="font-bold text-sm">Stil DNA'nız</span>
         </div>
         <div className="h-64 w-full flex justify-center items-center min-h-[256px]">
           <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={STYLE_DNA}>
               <PolarGrid stroke="#345C81" />
               <PolarAngleAxis dataKey="subject" tick={{ fill: '#87D3E4', fontSize: 10 }} />
               <Radar 
                name="Elif" 
                dataKey="A" 
                stroke="#87D3E4" 
                fill="#87D3E4" 
                fillOpacity={0.5} 
               />
             </RadarChart>
           </ResponsiveContainer>
         </div>
         <div className="flex justify-center gap-3 mt-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border border-white/20" style={{ backgroundColor: i % 2 === 0 ? '#0F203F' : '#87D3E4' }} />
            ))}
         </div>
         <button className="w-full mt-6 py-2 bg-[#87D3E4] rounded-xl text-[#0F203F] font-bold text-xs">StyleBot ile Stil Testi Yap</button>
      </div>

      <div className="flex border-b border-gray-100">
         <button className="flex-1 py-3 border-b-2 border-[#0F203F] text-[#0F203F] font-bold text-xs uppercase">Gönderiler</button>
         <button className="flex-1 py-3 text-gray-400 font-bold text-xs uppercase">Kaydedilenler</button>
         <button className="flex-1 py-3 text-gray-400 font-bold text-xs uppercase">AI Önerileri</button>
      </div>

      <div className="grid grid-cols-3 gap-0.5 pt-0.5">
         {[1,2,3,4,5,6,7,8,9].map(i => (
           <div key={i} className="aspect-square bg-gray-100">
             <ImageWithFallback src={`https://images.unsplash.com/photo-1${i}700557478789-5e3fdb3e29ff?w=300&q=80`} className="w-full h-full object-cover" />
           </div>
         ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function FeshineApp() {
  const [state, setState] = useState<AppState>("splash");
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isUploading, setIsUploading] = useState(false);

  if (state === "splash") return <Splash onComplete={() => setState("onboarding")} />;
  if (state === "onboarding") return <Onboarding onComplete={() => setState("main")} />;

  const renderTabContent = () => {
    if (activeTab === "notifications") return <NotificationScreen onBack={() => setActiveTab("home")} />;
    if (activeTab === "messages") return <MessagesScreen onBack={() => setActiveTab("home")} />;
    
    switch (activeTab) {
      case "home":
        return (
          <div className="pb-20">
            <div className="flex overflow-x-auto gap-4 p-4 scrollbar-hide">
              <div className="flex flex-col items-center gap-1">
                 <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-white border-2 border-dashed border-[#87D3E4] text-[#87D3E4]`}>
                    <Plus size={24} />
                 </div>
                 <span className="text-[10px] text-[#0F203F] font-medium">Hikayen</span>
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-14 h-14 rounded-full p-0.5 bg-linear-to-tr from-[#87D3E4] to-[#0F203F]`}>
                     <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                        <ImageWithFallback src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover" />
                     </div>
                  </div>
                  <span className="text-[10px] text-[#0F203F] font-medium">user_{i}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide">
              {[
                { label: "StyleBot'la Konuş", icon: <Bot size={16} />, color: "#87D3E4", action: () => setActiveTab("stylebot") },
                { label: "Trendler", icon: <Flame size={16} />, color: "#FF6B6B" },
                { label: "Yeni Koleksiyon", icon: <Zap size={16} />, color: "#FFD700" },
                { label: "Size Özel", icon: <Heart size={16} />, color: "#FF6B6B" }
              ].map((b, i) => (
                <button 
                  key={i} 
                  onClick={b.action}
                  className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 transition-transform active:scale-95"
                >
                  <span className="text-sm flex items-center justify-center" style={{ color: b.color }}>{b.icon}</span>
                  <span className="text-xs font-semibold text-[#0F203F]">{b.label}</span>
                </button>
              ))}
            </div>

            <div className="px-4">
              {FEED_DATA.map(post => (
                <FeedCard key={post.id} data={post} />
              ))}
            </div>
          </div>
        );
      case "explore": return <Explore />;
      case "stylebot": return <StyleBot />;
      case "community": return (
        <div className="p-8 text-center text-gray-500">
          <Users size={48} className="mx-auto mb-4 text-[#345C81] opacity-20" />
          <h3 className="text-lg font-bold text-[#0F203F]">Topluluk Yakında!</h3>
          <p className="text-sm">Diğer kullanıcılarla stil grupları kurabileceğiniz özellik yakında sizlerle.</p>
        </div>
      );
      case "profile": return <Profile />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-['Inter',_sans-serif] text-[#0F203F] flex justify-center">
      <div className="w-full max-w-md h-screen bg-white flex flex-col relative overflow-hidden shadow-2xl">
        <Toaster position="top-center" />
        
        {/* Mobile Status Bar Simulation */}
        <div className="h-10 px-6 flex items-center justify-between bg-white shrink-0 z-50">
           <span className="text-[12px] font-bold">9:41</span>
           <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-3 bg-[#0F203F] rounded-full opacity-30" />)}
              </div>
              <div className="w-6 h-3 border-2 border-[#0F203F]/30 rounded-xs relative">
                 <div className="absolute left-0.5 top-0.5 bottom-0.5 right-1.5 bg-[#0F203F]" />
              </div>
           </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab !== "stylebot" && activeTab !== "notifications" && activeTab !== "messages" && (
            <Header 
              onNotifClick={() => setActiveTab("notifications")}
              onSearchClick={() => setActiveTab("explore")}
              onMessageClick={() => setActiveTab("messages")}
              showSearch={activeTab !== "explore"}
              title={
                activeTab === "home" ? (
                  <div className="flex items-center gap-2">
                     <div className="w-6 h-6 bg-[#87D3E4] rounded-full flex items-center justify-center">
                        <Star size={12} color="white" fill="white" />
                     </div>
                     <span className="font-bold text-lg tracking-tight">Feshine</span>
                  </div>
                ) : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
              } 
            />
          )}

          {activeTab === "stylebot" && (
            <div className="sticky top-0 z-30 bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
              <button onClick={() => setActiveTab("home")} className="p-1"><ChevronLeft size={24} /></button>
              <span className="font-bold">StyleBot AI</span>
              <button className="p-1"><Settings size={20} className="text-gray-400" /></button>
            </div>
          )}

          <main className="flex-1 overflow-y-auto pb-20">
            {renderTabContent()}
          </main>

          {/* Upload Overlay */}
          <AnimatePresence>
            {isUploading && (
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="absolute inset-0 z-50 bg-white p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                   <button onClick={() => setIsUploading(false)}><X size={24} /></button>
                   <span className="font-bold">Yeni Gönderi</span>
                   <div className="w-6" />
                </div>
                
                <div className="flex-1 space-y-6">
                   <div className="flex gap-4">
                      <button className="flex-1 aspect-square bg-[#F5F7FA] rounded-3xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200">
                         <Camera size={32} className="text-[#345C81]" />
                         <span className="text-xs font-bold text-[#345C81]">Fotoğraf Çek</span>
                      </button>
                      <button className="flex-1 aspect-square bg-[#F5F7FA] rounded-3xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200">
                         <ImageIcon size={32} className="text-[#345C81]" />
                         <span className="text-xs font-bold text-[#345C81]">Galeriden Seç</span>
                      </button>
                   </div>

                   <div className="p-4 bg-[#F5F7FA] rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <User size={20} className="text-[#0F203F]" />
                         </div>
                         <div>
                            <div className="text-sm font-bold">Yüzümü Gizle</div>
                            <div className="text-[10px] text-gray-400">AI ile otomatik maskeleme</div>
                         </div>
                      </div>
                      <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                         <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <div className="text-xs font-bold text-gray-400 uppercase">Açıklama</div>
                      <textarea 
                        placeholder="Neler giydin? Stilini anlat..." 
                        className="w-full bg-[#F5F7FA] rounded-2xl p-4 text-sm min-h-[120px] outline-none border-none"
                      />
                   </div>

                   <div className="space-y-2">
                      <div className="text-xs font-bold text-gray-400 uppercase">AI Etiketleri</div>
                      <div className="flex flex-wrap gap-2">
                         {["Casual", "Autumn", "Blue", "Minimal"].map(tag => (
                           <span key={tag} className="px-4 py-1.5 bg-[#87D3E4]/10 border border-[#87D3E4] text-[#345C81] text-xs font-bold rounded-full">#{tag}</span>
                         ))}
                      </div>
                   </div>
                </div>

                <button 
                  onClick={() => {
                    toast.success("Gönderiniz başarıyla paylaşıldı!");
                    setIsUploading(false);
                  }}
                  className={`w-full py-4 ${STYLES.roundedFull} ${STYLES.gradient} text-white font-bold text-lg ${STYLES.shadow} mb-4`}
                >
                  Paylaş
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 pt-3 pb-8 flex items-center justify-between z-40">
          <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-[#0F203F]' : 'text-gray-300'}`}>
            <Home size={24} fill={activeTab === 'home' ? '#0F203F' : 'none'} />
            <span className="text-[10px] font-bold">Akış</span>
          </button>
          <button onClick={() => setActiveTab("explore")} className={`flex flex-col items-center gap-1 ${activeTab === 'explore' ? 'text-[#0F203F]' : 'text-gray-300'}`}>
            <Compass size={24} fill={activeTab === 'explore' ? '#0F203F' : 'none'} />
            <span className="text-[10px] font-bold">Keşfet</span>
          </button>
          
          {/* Ortada Plus (Ekleme) Butonu */}
          <div className="relative -top-8">
             <button 
              onClick={() => setIsUploading(true)} 
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${STYLES.gradient} ${STYLES.shadow} ring-4 ring-white transition-transform active:scale-90`}
             >
               <Plus size={28} />
             </button>
          </div>

          <button onClick={() => setActiveTab("community")} className={`flex flex-col items-center gap-1 ${activeTab === 'community' ? 'text-[#0F203F]' : 'text-gray-300'}`}>
            <Users size={24} fill={activeTab === 'community' ? '#0F203F' : 'none'} />
            <span className="text-[10px] font-bold">Topluluk</span>
          </button>
          <button onClick={() => setActiveTab("profile")} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-[#0F203F]' : 'text-gray-300'}`}>
            <User size={24} fill={activeTab === 'profile' ? '#0F203F' : 'none'} />
            <span className="text-[10px] font-bold">Profil</span>
          </button>

          {/* Sağ üstte AI Bot Butonu - StyleBot sayfasında gizle */}
          {activeTab !== "stylebot" && (
            <button 
              onClick={() => setActiveTab("stylebot")}
              className="absolute -top-20 right-6 w-12 h-12 rounded-full bg-[#87D3E4] text-white flex items-center justify-center shadow-lg"
            >
              <Bot size={24} />
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}
