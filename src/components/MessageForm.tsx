import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

const MessageForm = () => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      messageInputRef.current?.focus();
    }
  };

  const handleSend = async () => {
    if (!nickname || !message) return;
    setIsSending(true);

    await addDoc(collection(db, "messages"), {
      nickname,
      message,
      createdAt: Date.now(),
    });

    const clover = confetti.shapeFromText({ text: "🍀", scalar: 2 });
    confetti({ shapes: [clover], particleCount: 30, spread: 70, origin: { y: 0.6 } });

    setNickname("");
    setMessage("");
    setIsSending(false);
    setShowPopup(true);
  };

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
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 text-[16px] outline-none focus:ring-2 focus:ring-[#B6E388] transition-all [-webkit-tap-highlight-color:transparent]"
        />
      </div>

      <div className="space-y-2">
        <div className="px-1 flex justify-between items-end">
          <label className="text-sm font-bold text-gray-800">축하 및 응원 메시지</label>
          <span className="text-[10px] text-lime-600 font-semibold uppercase tracking-wider">Message</span>
        </div>
        <textarea
          value={message}
          ref={messageInputRef}
          maxLength={777}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 text-[16px] resize-none outline-none focus:ring-2 focus:ring-[#B6E388] transition-all [-webkit-tap-highlight-color:transparent]"
        />
        <div className="flex justify-between px-1">
            <p className="text-[10px] text-gray-400 italic">
                Write a message of love and support!
            </p>
            <span className="text-[10px] text-gray-400">
                {message.length} / 777
            </span>
        </div>
      </div>

      <motion.button
        onClick={handleSend}
        disabled={isSending}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-4 rounded-xl font-bold text-sm outline-none shadow-none transition-all flex items-center justify-center [-webkit-tap-highlight-color:transparent]
          ${isSending ? "bg-gray-100 text-gray-400" : "bg-[#B6E388] text-lime-900"}
        `}
      >
        {isSending ? "저장 중..." : "지현 선수에게 보내기🍀"}
      </motion.button>

      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="
                  bg-white
                  rounded-2xl
                  px-6 py-6
                  w-full max-w-[320px]
                  text-center
                  shadow-2xl
                "
              >
              <div className="text-4xl mb-4">🍀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">저장 완료!</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">지현 선수의 7주년을 축하하는 메시지가<br/>소중하게 저장되었습니다. <br/>참여해 주셔서 감사합니다🤍</p>
              <button onClick={() => setShowPopup(false)} className="w-full py-2.5 bg-[#B6E388] text-lime-900 text-sm font-bold rounded-xl active:opacity-80 transition">
                확인
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MessageForm;