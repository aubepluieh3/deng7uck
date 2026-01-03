import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMessages } from "../hooks/useMessages";
import MessageCard from "../components/MessageCard";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAdmin } from "../hooks/useAdmin";
import LoadingSpinner from "../components/ui/LoadingSpinner";

type SortType = "latest" | "oldest";
const MESSAGES_PER_PAGE = 7;

const AllMessagesPage = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const { messages, loading } = useMessages();
  const [sort, setSort] = useState<SortType>("latest");
  const [visibleCount, setVisibleCount] = useState(MESSAGES_PER_PAGE);
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) =>
      sort === "latest"
        ? b.createdAt - a.createdAt
        : a.createdAt - b.createdAt
    );
  }, [messages, sort]);
  const displayMessages = useMemo(() => {
    return sortedMessages.slice(0, visibleCount);
  }, [sortedMessages, visibleCount]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB] px-6 py-8 pb-20">
          <div className="mb-10 flex flex-col items-center gap-6">
            <div className="relative w-full flex items-center justify-center">
              <button
                onClick={() => navigate(-1)}
                className="absolute left-0 group flex items-center gap-1 text-sm text-gray-400 hover:text-gray-800 transition"
              >
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span className="hidden xs:inline">Back</span>
              </button>
              <h1 className="font-title text-2xl text-gray-900 tracking-tight">
                All Messages
              </h1>
              {isAdmin && (
                <button
                  onClick={() => signOut(auth)}
                  className="absolute right-0 text-[10px] text-gray-300 hover:text-red-400 transition underline underline-offset-4"
                >
                  Logout
                </button>
              )}
            </div>
            <div className="flex rounded-full bg-white shadow-sm border border-gray-100 p-1">
              <button
                onClick={() => {
                  setSort("latest");
                  setVisibleCount(MESSAGES_PER_PAGE);
                }}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold transition
                  ${sort === "latest"
                    ? "bg-[#E9F7D9] text-[#4A6B3F]"
                    : "text-gray-400 hover:bg-gray-50"
                  }
                `}
              >
                최신순
              </button>
              <button
                onClick={() => {
                  setSort("oldest");
                  setVisibleCount(MESSAGES_PER_PAGE);
                }}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold transition
                  ${sort === "oldest"
                    ? "bg-[#E9F7D9] text-[#4A6B3F]"
                    : "text-gray-400 hover:bg-gray-50"
                  }
                `}
              >
                오래된순
              </button>
            </div>
          </div>
          <motion.section layout className="space-y-4">
            <AnimatePresence mode="popLayout">
              {displayMessages.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <MessageCard message={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.section>

          {visibleCount < sortedMessages.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + MESSAGES_PER_PAGE)}
                className="group flex flex-col items-center gap-3 transition-all"
              >
                <span className="text-xs font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                  더 많은 메시지 보기 ({sortedMessages.length - visibleCount}개 남음)
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 group-hover:scale-110 group-active:scale-95 transition-all">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-gray-400 group-hover:text-[#4A6B3F] transition-colors"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </button>
            </div>
          )}
          
          {visibleCount >= sortedMessages.length && messages.length > 0 && (
            <p className="mt-12 text-center text-xs text-gray-300">
              모든 메시지를 확인했습니다 🍀
            </p>
          )}
        </main>
      );
    };

export default AllMessagesPage;