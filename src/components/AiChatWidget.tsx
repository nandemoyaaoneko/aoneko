import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'model',
          text: 'はじめまして！「何でも屋 青ねこ」のAIアシスタントです。愛知・三重・岐阜エリアでのエアコンクリーニング、不用品お片付け、草刈り、プチ解体など、お住まいのお困りごとについて何でもお気軽にご相談ください！見積もりのご相談やご質問もこちらで承ります。'
        }
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user', text: userText } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ivbtpcxzyxrhevxoyqlh.supabase.co';
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

    // If Supabase configs are missing, respond with a fallback maintenance message
    if (!supabaseAnonKey) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            text: '申し訳ございません。ただいまAIアシスタントはメンテナンス中です。お手数ですが、お電話（0120-502-622）またはお問い合わせフォームより直接ご相談ください。迅速に対応させていただきます！'
          }
        ]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/aoneko-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            messages: newMessages.map((msg) => ({
              role: msg.role === 'model' ? 'assistant' : 'user',
              content: msg.text
            }))
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Edge Function returned status ${response.status}`);
      }

      const resData = await response.json();
      const aiResponseText = resData.reply || 
        '申し訳ございません。お返事を生成できませんでした。詳細はお電話にてお問い合わせください。';

      setMessages((prev) => [...prev, { role: 'model', text: aiResponseText }]);
    } catch (err) {
      console.error('AI chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'エラーが発生しました。お手数ですが、しばらく時間をおいてから再度お試しいただくか、お電話（0120-502-622）にて直接お問い合わせください。'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-48 md:bottom-26 right-6 z-50 flex flex-col items-end">
      {/* Chat window panel */}
      {isOpen && (
        <div className="w-[330px] sm:w-[380px] h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-sky-100 flex flex-col overflow-hidden mb-4 animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#F3F9FD] to-white border-b border-sky-100/50 py-4 px-6 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-sky-100 flex items-center justify-center shrink-0">
                <img src="/assets/logo.jpg" alt="青ねこ" className="w-full h-full object-cover" />
              </div>
              <span className="font-black text-sm text-jeimas-blue-dark tracking-tight">青ねこ AIアシスタント</span>
            </div>
            
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="閉じる"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4 bg-slate-50/30">
            {messages.map((msg, index) => {
              const isAI = msg.role === 'model';
              return (
                <div key={index} className={`flex items-start gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}>
                  {isAI && (
                    <div className="w-7.5 h-7.5 rounded-full overflow-hidden border border-sky-100 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <img src="/assets/logo.jpg" alt="青ねこ" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-[1.25rem] py-3 px-4 text-xs sm:text-sm font-semibold leading-relaxed shadow-sm ${
                      isAI
                        ? 'bg-white border border-sky-100/50 text-slate-700 rounded-tl-none'
                        : 'bg-[#0C74B3] text-white rounded-tr-none'
                    }`}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            
            {isLoading && (
              <div className="flex items-start gap-2.5 justify-start">
                <div className="w-7.5 h-7.5 rounded-full overflow-hidden border border-sky-100 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <img src="/assets/logo.jpg" alt="青ねこ" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white border border-sky-100/50 text-slate-700 rounded-[1.25rem] rounded-tl-none py-3 px-4 shadow-sm flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 bg-[#0C74B3] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#0C74B3] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#0C74B3] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Area */}
          <form 
            onSubmit={handleSend}
            className="border-t border-sky-100/50 p-4 bg-white flex gap-2 items-center shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="ご質問や見積もりのご相談など、お気軽に入力してください..."
              disabled={isLoading}
              className="flex-grow px-4 py-3 rounded-full border border-sky-100 bg-slate-50/50 text-xs sm:text-sm focus:outline-none focus:border-[#0C74B3] focus:bg-white transition-all disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="w-11 h-11 rounded-full bg-[#0C74B3] hover:bg-[#085a8d] text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shrink-0"
              aria-label="送信"
            >
              <svg className="w-5 h-5 fill-current transform -rotate-90" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Button with permanent text label to its left */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div className="bg-white/95 backdrop-blur-sm text-[#0C74B3] border border-sky-100 text-[10px] sm:text-xs font-black px-3.5 py-2.5 rounded-full shadow-md whitespace-nowrap select-none flex items-center gap-2 animate-pulse">
            <span className="w-1.5 h-1.5 bg-[#0C74B3] rounded-full animate-ping" />
            <img src="/assets/icon_ai_chat.png" alt="AI Chat" className="w-4 h-4 object-contain rounded-full shrink-0" />
            <span>AI Chatで相談</span>
          </div>
        )}
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#0C74B3] to-[#085a8d] text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 relative cursor-pointer group border border-white/20 shrink-0"
          aria-label="AIチャットアシスタントを開く"
        >
          {isOpen ? (
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-aoneko-pink rounded-full border border-white animate-pulse" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
