import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const MessageForm = () => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  return (
    <section className="soft-card rounded-3xl p-6 space-y-6 bg-white shadow-md border border-gray-50">
      
      <div className="space-y-2">
        <div className="px-1 flex justify-between items-end">
          <label className="text-sm font-bold text-gray-800">별명</label>
          <span className="text-[10px] text-lime-600 font-semibold uppercase tracking-wider">Your Nickname</span>
        </div>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-[#B6E388] transition-all [-webkit-tap-highlight-color:transparent]"
        />
      </div>

      <div className="space-y-2">
        <div className="px-1 flex justify-between items-end">
          <label className="text-sm font-bold text-gray-800">축하 및 응원 메시지</label>
          <span className="text-[10px] text-lime-600 font-semibold uppercase tracking-wider">Message</span>
        </div>
        <textarea
          value={message}
          maxLength={500}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 text-sm resize-none outline-none focus:ring-2 focus:ring-[#B6E388] transition-all [-webkit-tap-highlight-color:transparent]"
        />
        <div className="flex justify-between px-1">
            <p className="text-[10px] text-gray-400 italic">
                Write a message of love and support!
            </p>
            <span className="text-[10px] text-gray-400">
                {message.length} / 500
            </span>
        </div>
      </div>

      <motion.button
        disabled={isSending}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-4 rounded-xl font-bold text-sm outline-none shadow-none transition-all flex items-center justify-center [-webkit-tap-highlight-color:transparent]
          ${isSending ? "bg-gray-100 text-gray-400" : "bg-[#B6E388] text-lime-900"}
        `}
      >
        {isSending ? "저장 중..." : "지현에게 보내기 🍀"}
      </motion.button>

      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
            >
              <div className="text-4xl mb-4">🍀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">저장 완료!</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">지현님의 7주년을 축하하는 메시지가<br/>소중하게 저장되었습니다. 감사합니다.</p>
              <button onClick={() => setShowPopup(false)} className="w-full py-3 bg-[#B6E388] text-lime-900 font-bold rounded-xl active:opacity-80 transition-all outline-none [-webkit-tap-highlight-color:transparent]">확인</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MessageForm;