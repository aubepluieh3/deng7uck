import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const INSTAGRAM_ID = "dengzip__"; 

  return (
    <footer className="w-full py-20 flex flex-col items-center justify-center border-t border-gray-50 bg-[#F9FAFB]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-[10px] text-gray-300 tracking-tighter uppercase font-medium">
            © {currentYear}
          </span>
          <div className="w-[1px] h-[10px] bg-gray-200" />
          <a 
            href={`https://www.instagram.com/${INSTAGRAM_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-gray-500 font-semibold tracking-[0.15em] uppercase hover:text-lime-600 transition-colors"
          >
            Created by dingdongdeng
          </a>
        </div>
        
      </motion.div>
    </footer>
  );
};

export default Footer;