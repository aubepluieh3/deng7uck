import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Message } from "../types/message";

const MAX_PREVIEW = 7;

const MessageListPreview = ({ messages }: { messages: Message[] }) => {
  const navigate = useNavigate();
  const previewMessages = messages.slice(0, MAX_PREVIEW);

  return (
    <section className="space-y-4">
      <AnimatePresence initial={false}>
        {previewMessages.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="soft-card rounded-2xl p-4"
          >
            <p className="text-xs text-gray-500 mb-1">
              {item.nickname}
            </p>
            <p className="text-sm text-gray-800">
              {item.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>

      {messages.length > MAX_PREVIEW && (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/messages")}
          className="w-full py-3 rounded-xl bg-white soft-button text-sm font-semibold text-gray-700"
        >
          전체 메시지 보기 ({messages.length})
        </motion.button>
      )}
    </section>
  );
};

export default MessageListPreview;
