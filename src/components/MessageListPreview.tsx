import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Message } from "../types/message";

const MAX_PREVIEW = 3;

const MessageListPreview = ({ messages }: { messages: Message[] }) => {
  const navigate = useNavigate();
  const previewMessages = messages.slice(0, MAX_PREVIEW);

  return (
    <section className="space-y-4">
      <AnimatePresence initial={false} mode="popLayout">
        {previewMessages.map((item, index) => {
          const displayOrder = index + 1; 
          const isLuckySeven = displayOrder % 10 === 7;
          const cloverIcon = isLuckySeven ? "🍀" : "☘️";

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`soft-card rounded-2xl p-4 border transition-colors ${
                isLuckySeven ? 'border-lime-200 bg-lime-50/30' : 'border-transparent'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">
                    {cloverIcon}
                  </span>
                  <p className={`text-xs font-bold ${isLuckySeven ? 'text-lime-700' : 'text-gray-500'}`}>
                    {item.nickname}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed">
                {item.message}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {messages.length > MAX_PREVIEW && (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/messages")}
          className="w-full py-3 rounded-xl bg-white soft-button text-sm font-semibold text-gray-700 shadow-sm border border-gray-100"
        >
          전체 메시지 보기 ({messages.length})
        </motion.button>
      )}
    </section>
  );
};

export default MessageListPreview;