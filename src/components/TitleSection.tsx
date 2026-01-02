import { motion } from "framer-motion";

const TitleSection = () => {
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

        <motion.div 
          className="mt-8 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-lime-100 text-lime-700 text-xs font-bold shadow-sm"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="animate-pulse">🍀</span> D-15
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TitleSection;