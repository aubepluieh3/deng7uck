import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Message } from "../types/message";
interface MessageCardProps {
  message: Message;
  index: number;
  isMember: boolean;
  isAdmin: boolean;
}

const MessageCard = ({ message, index, isMember, isAdmin }: MessageCardProps) => {
  const displayOrder = index + 1;
  const isLuckySeven = displayOrder % 10 === 7;
  const cloverIcon = isLuckySeven ? "🍀 " : "☘️ ";
  const maskedMessage = message.message.replace(/[^\s]/g, "●");

  const handleDelete = async () => {
    if (!confirm("이 메시지를 삭제할까요?")) return;
    try {
      await deleteDoc(doc(db, "messages", message.id));
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 권한이 없거나 오류가 발생했습니다.");
    }
  };

  return (
      <div className="soft-card rounded-2xl p-4 transition-all hover:shadow-md bg-white border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">{cloverIcon}</span>
            <p className={`text-xs font-bold ${isLuckySeven ? 'text-lime-700' : 'text-gray-500'}`}>
              {message.nickname}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400">
              {new Date(message.createdAt).toLocaleDateString()}
            </span>
            
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="text-gray-300 hover:text-red-500 transition-colors p-1"
                title="삭제"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <p className={`text-xs leading-relaxed break-all transition-all duration-500
            ${!isMember 
              ? 'blur-[4px] opacity-40 select-none pointer-events-none text-gray-400 font-mono' 
              : 'text-bold text-200'
            }
          `}>
            {isMember ? message.message : maskedMessage}
          </p>
        </div>
      </div>
    );
}

export default MessageCard;