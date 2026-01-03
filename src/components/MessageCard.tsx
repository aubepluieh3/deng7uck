import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAdmin } from "../hooks/useAdmin";
import type { Message } from "../types/message";

const MessageCard = ({ message, index }: { message: Message; index: number }) => {
  const { isAdmin } = useAdmin();
  const displayOrder = index + 1;
  const isLuckySeven = displayOrder % 10 === 7;
  const cloverIcon = isLuckySeven ? "🍀 " : "☘️ ";
  const handleDelete = async () => {
    if (!confirm("이 메시지를 삭제할까요?")) return;
    await deleteDoc(doc(db, "messages", message.id));
  };

  return (
    <div className="soft-card rounded-2xl p-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1.5">
            <span className="text-xs">
              {cloverIcon}
            </span>
            <p className={`text-xs font-bold ${isLuckySeven ? 'text-lime-700' : 'text-gray-600'}`}>
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

      <p className="text-sm text-gray-800 leading-relaxed break-all">
        {message.message}
      </p>
    </div>
  );
}

export default MessageCard;
