import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ChevronRight, Sparkles, ShieldCheck, Users } from 'lucide-react';

export const SplashOnboarding = ({ onFinish }) => {
  const [step, setStep] = useState('splash');
  const [onboardingIndex, setOnboardingIndex] = useState(0);

  React.useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => setStep('onboarding'), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const onboardingData = [
    {
      title: "AI Stil Asistanınız",
      description: "StyleBot, size özel kombinler önerir ve gardırobunuzu yönetmenize yardımcı olur.",
      image: "https://images.unsplash.com/photo-1706499814813-85f9c76cd38f?auto=format&fit=crop&q=80&w=800",
      icon: <Sparkles className="text-[#87D3E4]" size={40} />,
      color: "bg-[#87D3E4]/10"
    },
    {
      title: "Topluluğa Katılın",
      description: "Stilinizi paylaşın, diğer kullanıcılardan ilham alın ve moda dünyasındaki yerinizi bulun.",
      image: "https://images.unsplash.com/photo-1756276900419-868625adff43?auto=format&fit=crop&q=80&w=800",
      icon: <Users className="text-[#345C81]" size={40} />,
      color: "bg-[#345C81]/10"
    },
    {
      title: "Gizliliğinizi Koruyun",
      description: "Yüz gizleme özelliğini istediğiniz zaman açabilirsiniz. Tamamen sizin seçiminiz.",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800",
      icon: <ShieldCheck className="text-[#0F203F]" size={40} />,
      color: "bg-[#0F203F]/10"
    }
  ];

  if (step === 'splash') {
    return (
      <div className="h-full w-full bg-[#0F203F] flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 mb-6 relative">
            <div className="absolute inset-0 bg-[#87D3E4] rounded-full animate-ping opacity-25"></div>
            <div className="w-full h-full bg-[#87D3E4] rounded-full flex items-center justify-center">
              <span className="text-[#0F203F] font-bold text-4xl">F</span>
            </div>
          </div>
          <h1 className="text-white text-4xl font-bold tracking-tight mb-2">Feshine</h1>
          <p className="text-[#87D3E4] text-lg font-medium tracking-wide">Tarzın Akıllı Yolu</p>
        </motion.div>
        
        <div className="absolute bottom-20">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-[#87D3E4] animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-[#87D3E4] animate-bounce delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-[#87D3E4] animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  const currentOnboarding = onboardingData[onboardingIndex];

  return (
    <div className="h-full w-full bg-white flex flex-col relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={onboardingIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex flex-col p-8 pt-16"
        >
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className={`w-24 h-24 rounded-3xl ${currentOnboarding.color} flex items-center justify-center mb-10`}>
              {currentOnboarding.icon}
            </div>
            
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden mb-10 shadow-2xl">
              <ImageWithFallback 
                src={currentOnboarding.image} 
                alt={currentOnboarding.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <h2 className="text-2xl font-bold text-[#0F203F] mb-4">{currentOnboarding.title}</h2>
            <p className="text-[#6C757D] text-lg leading-relaxed px-4">
              {currentOnboarding.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="p-8 space-y-4">
        <div className="flex justify-center gap-2 mb-6">
          {onboardingData.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${onboardingIndex === i ? 'w-8 bg-[#0F203F]' : 'w-2 bg-[#E5E5E5]'}`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (onboardingIndex < onboardingData.length - 1) {
              setOnboardingIndex(onboardingIndex + 1);
            } else {
              onFinish();
            }
          }}
          className="w-full bg-gradient-to-r from-[#0F203F] to-[#345C81] text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(15,32,63,0.25)] active:scale-95 transition-transform"
        >
          {onboardingIndex === onboardingData.length - 1 ? "Başlayalım" : "Devam Et"}
          <ChevronRight size={20} />
        </button>

        <button
          onClick={onFinish}
          className="w-full py-2 text-[#6C757D] font-medium"
        >
          Zaten Hesabım Var
        </button>
      </div>
    </div>
  );
};
