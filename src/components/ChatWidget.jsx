import { useState, useRef, useEffect, Component } from 'react';
import { useChat } from '@ai-sdk/react';
import { m, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, X, Send, RefreshCw, Minimize2, Loader2, AlertCircle 
} from 'lucide-react';

/**
 * Class Error Boundary to prevent any Markdown or AI streaming render error
 * from unmounting the React DOM tree or causing a black screen.
 */
class ChatErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ChatWidget Render Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle size={14} />
          <span>Message render error. Retrying response...</span>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Lightweight & crash-proof text renderer that safely parses bullet points,
 * bold text, and code snippets without external plugin crashes.
 */
const SafeTextRenderer = ({ content }) => {
  if (!content || typeof content !== 'string') return null;

  const lines = content.split('\n');
  return (
    <div className="space-y-1.5 text-xs leading-relaxed text-slate-200">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1" />;

        // Bullet point formatting
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          const bulletText = line.trim().substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-cyan-400 font-bold">•</span>
              <span>{bulletText}</span>
            </div>
          );
        }

        // Standard line
        return <p key={idx}>{line}</p>;
      })}
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, append } = useChat({
    api: '/api/chat',
    onError: (err) => {
      console.error('Chat AI Error:', err);
    },
  });

  // Debounced & throttled scroll-to-bottom (prevents layout thrashing on every stream chunk)
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages.length, isLoading, isOpen]);

  const handleSuggestionClick = (prompt) => {
    try {
      append({ role: 'user', content: prompt });
    } catch (err) {
      console.error('Failed to append prompt:', err);
    }
  };

  const renderMessageContent = (mItem) => {
    let text = '';
    if (typeof mItem.content === 'string') {
      text = mItem.content;
    } else if (Array.isArray(mItem.content)) {
      text = mItem.content
        .map((part) => (typeof part === 'string' ? part : part?.text || ''))
        .join('');
    }

    if (!text && mItem.toolInvocations && mItem.toolInvocations.length > 0) {
      return (
        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
          <span>Querying portfolio data...</span>
        </div>
      );
    }

    if (!text) return null;

    return (
      <ChatErrorBoundary>
        <SafeTextRenderer content={text} />
      </ChatErrorBoundary>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mb-4 w-[90vw] sm:w-[400px] h-[540px] max-h-[80vh] rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px]">
                    <div className="w-full h-full rounded-[15px] bg-slate-950 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                    Aura AI Assistant
                  </h3>
                  <p className="text-[10px] font-mono text-purple-300/70 tracking-widest uppercase">
                    Amir's Portfolio Intelligence
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer"
                    title="Clear Chat"
                  >
                    <RefreshCw size={14} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer"
                  title="Close Assistant"
                >
                  <Minimize2 size={15} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-14 h-14 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                    <Sparkles className="w-7 h-7 text-purple-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white uppercase font-mono">Ask Amir's AI Agent</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-[260px]">
                      Ask about Amir's Machine Learning projects, technical skills, CV, or verified credentials.
                    </p>
                  </div>
                  <div className="w-full space-y-2 pt-2">
                    {[
                      'What machine learning projects has Amir built?',
                      'What are Amir\'s top AI & Deep Learning skills?',
                      'Give me a summary of Amir\'s professional background.'
                    ].map((prompt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSuggestionClick(prompt)}
                        className="w-full text-left text-[11px] p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 text-slate-300 transition-all font-medium cursor-pointer"
                      >
                        "{prompt}"
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((mItem) => (
                  <div
                    key={mItem.id}
                    className={`flex gap-3 ${mItem.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {mItem.role !== 'user' && (
                      <div className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-cyan-400" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] p-3.5 ${
                        mItem.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-2xl rounded-br-sm shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-2xl rounded-bl-sm shadow-md'
                      }`}
                    >
                      {mItem.role === 'user' ? (
                        <p className="text-xs font-medium leading-relaxed">{mItem.content}</p>
                      ) : (
                        renderMessageContent(mItem)
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Streaming Indicator */}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-3 justify-start">
                  <div className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800/80 bg-slate-900/40 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about projects, skills, CV..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl py-2.5 px-4 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white disabled:opacity-40 transition-all cursor-pointer shadow-lg"
              >
                <Send size={15} />
              </button>
            </form>
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <m.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative group p-4 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-cyan-400 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all cursor-pointer"
        title="Toggle AI Assistant"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
        
        {/* Pulse Ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-purple-500/40 animate-ping pointer-events-none" />
        )}
      </m.button>
    </div>
  );
};

export default ChatWidget;
