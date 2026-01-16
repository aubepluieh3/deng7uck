import MessageForm from "../components/MessageForm";
import MessageListPreview from "../components/MessageListPreview";
import TitleSection from "../components/TitleSection";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAdmin } from "../hooks/useAdmin";
import { useMessages } from "../hooks/useMessages";

const HomePage = () => {
  const { messages, loading: messagesLoading } = useMessages();
  const { isMember, loading: adminLoading } = useAdmin();
  const isLoading = messagesLoading || adminLoading;
    return (
      <main className="min-h-screen bg-[#F9FAFB] px-6 py-10 space-y-14">
        <TitleSection />
        {isLoading ? (
        <div className="relative py-20"> 
            <LoadingSpinner /> 
          </div>
        ) : (
          <MessageListPreview messages={messages} isMember={isMember} />
      )}
      </main>
    );
  };
export default HomePage;