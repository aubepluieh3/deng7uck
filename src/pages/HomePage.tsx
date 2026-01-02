import Footer from "../components/Footer";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";
import TitleSection from "../components/TitleSection";

const HomePage = () => {
    return (
      <main className="min-h-screen bg-[#F9FAFB] px-6 py-10 space-y-14">
        <TitleSection />
        <MessageForm />
        <MessageList />
        <Footer />
      </main>
    );
  };
export default HomePage;