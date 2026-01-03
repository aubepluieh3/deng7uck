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

const AllMessagesPage = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const { messages, loading } = useMessages();
  const [sort, setSort] = useState<SortType>("latest");

  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) =>
      sort === "latest"
        ? b.createdAt - a.createdAt
        : a.createdAt - b.createdAt
    );
  }, [messages, sort]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB] px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500"
          >
            ← Back
          </button>
          <h1 className="font-title text-2xl text-gray-900">
            All Messages
          </h1>
          {isAdmin && (
            <button
              onClick={() => signOut(auth)}
              className="text-xs text-gray-400 hover:text-gray-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        <div className="flex rounded-full bg-white shadow-sm border border-gray-100 p-1">
          <button
            onClick={() => setSort("latest")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition
              ${sort === "latest"
                ? "bg-[#E9F7D9] text-[#4A6B3F]"
                : "text-gray-500"
              }
            `}
          >
            최신순
          </button>

          <button
            onClick={() => setSort("oldest")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition
              ${sort === "oldest"
                ? "bg-[#E9F7D9] text-[#4A6B3F]"
                : "text-gray-500"
              }
            `}
          >
            오래된순
          </button>
        </div>
      </div>

      <motion.section layout className="space-y-4">
        <AnimatePresence initial={false}>
          {sortedMessages.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <MessageCard message={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>
    </main>
  );
};

export default AllMessagesPage;