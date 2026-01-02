import { motion } from "framer-motion";

const TARGET_DATE = "2026-01-16";

const TitleSection = () => {
  const calculateDDayInfo = (targetDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      diffDays,
      text: diffDays === 0 ? "D-Day" : `D-${diffDays}`,
      isExpired: diffDays < 0
    };
  };

  const { text, isExpired } = calculateDDayInfo(TARGET_DATE);
  return (
    <motion.section
      className="relative mb-16 px-6 pt-22 text-center overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative flex flex-col items-center justify-center">
        <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 0.12, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -top-30 left-1/2 -translate-x-1/2 font-black text-[18rem] text-lime-500 select-none pointer-events-none z-0"
        >
          7
        </motion.span>

        <div className="relative z-10 mt-10">
          <motion.h1 
            className="font-title text-4xl text-gray-900 font-bold leading-[1.1] uppercase tracking-tight"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Deng's <span className="text-[#B6E388]">7</span>ucky
            <br />
            Anniversary
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-[10px] tracking-[0.25em] text-gray-400 font-semibold uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Celebrating 7 Years of Happiness
          </motion.p>
        </div>

        {!isExpired && (
          <motion.div 
            className="mt-8 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-lime-100 text-lime-700 text-xs font-bold shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="animate-pulse">🍀</span> {text}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default TitleSection;