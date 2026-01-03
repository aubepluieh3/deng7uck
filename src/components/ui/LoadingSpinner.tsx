import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 bg-[#F9FAFB] flex items-center justify-center">
          <motion.div
            className="h-10 w-10 rounded-full border-[3px] border-lime-200 border-t-lime-500"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 0.9,
              ease: "linear",
            }}
          />
        </div>
      );
};

export default LoadingSpinner;