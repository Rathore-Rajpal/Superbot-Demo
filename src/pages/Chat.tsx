import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { N8NChatWidget } from '@/components/N8NChatWidget';

interface ChatProps {
  category: string;
  onBack: () => void;
}

const Chat = ({ category, onBack }: ChatProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 z-10 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-xl text-white font-semibold transition-all duration-300 border border-white/20 flex items-center gap-2"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Home
      </button>

      {/* Message */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Chat with Superbot 🤖
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Click the chat button in the bottom right corner to start your conversation
        </p>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <p className="text-gray-400 leading-relaxed">
            The chat window will appear as a popup where you can ask questions about your tasks, projects, team members, and more. 
            The AI will understand your natural language queries and provide relevant information from your database.
          </p>
        </div>
      </div>

      {/* N8N Chat Widget (Popup) */}
      <N8NChatWidget />
    </div>
  );
};

export default Chat;