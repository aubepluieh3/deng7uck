import MessageForm from "../components/MessageForm";
import MessageListPreview from "../components/MessageListPreview";
import TitleSection from "../components/TitleSection";
import { useMessages } from "../hooks/useMessages";

const HomePage = () => {
  const { messages, loading } = useMessages();
    return (
      <main className="min-h-screen bg-[#F9FAFB] px-6 py-10 space-y-14">
        <TitleSection />
        <MessageForm />
        {!loading && (
        <MessageListPreview messages={messages} />
      )}
      </main>
    );
  };
export default HomePage;