import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Phone, ShieldCheck } from 'lucide-react';

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
  isHtml?: boolean;
  isWaCard?: boolean;
  waUrl?: string;
  waTitle?: string;
  waSubtitle?: string;
  time: string;
}

interface LeadData {
  service: string;
  qty: string;
  location: string;
  name: string;
  phone: string;
  items: string;
  company: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMinimize, setShowMinimize] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [typing, setTyping] = useState(false);
  const [awaitingInput, setAwaitingInput] = useState<string | null>(null);

  const [leadData, setLeadData] = useState<LeadData>({
    service: '',
    qty: '',
    location: '',
    name: '',
    phone: '',
    items: '',
    company: ''
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const PHONE = "+91 7500555454";
  const WA_NUM = "917500555454";
  const WA_BASE = `https://wa.me/${WA_NUM}`;

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  // Handle auto-popup (once per session) and initial minimize after 10s
  useEffect(() => {
    const autoKey = 'ew_auto_chat_opened';
    
    // Timer for minimizing alert (12s delay if not open)
    const minTimer = setTimeout(() => {
      if (!isOpen) {
        setShowMinimize(true);
      }
    }, 12000);

    // Timer for automatic popup (10s delay for first-time session)
    const popupTimer = setTimeout(() => {
      if (!sessionStorage.getItem(autoKey)) {
        sessionStorage.setItem(autoKey, 'true');
        openChat();
      }
    }, 10000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(popupTimer);
    };
  }, [isOpen]);

  const openChat = () => {
    setIsOpen(true);
    setShowMinimize(false);
    setShowNotificationBadge(false);
    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 100);

    if (messages.length === 0) {
      startConversation();
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const getNowTime = () => {
    return new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const addBotMessageWithDelay = (text: string, delay = 800, customProps = {}): Promise<void> => {
    return new Promise((resolve) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            role: 'bot',
            content: text,
            time: getNowTime(),
            ...customProps
          }
        ]);
        resolve();
      }, delay);
    });
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        role: 'user',
        content: text,
        time: getNowTime()
      }
    ]);
  };

  // Flows
  const startConversation = async () => {
    await addBotMessageWithDelay("👋 Hi! I'm EWaste Kochi's AI assistant.", 600);
    await addBotMessageWithDelay("I can help you schedule <strong>free e-waste pickup</strong>, get price quotes, or handle <strong>corporate ITAD</strong> for your Kochi business. 🌿", 1000, { isHtml: true });
    setAwaitingInput('initial');
  };

  const handleQuickOptionClick = async (option: string, action: () => void) => {
    addUserMessage(option);
    setAwaitingInput(null);
    action();
  };

  // Pickup Flow
  const pickupFlow = async () => {
    setLeadData(prev => ({ ...prev, service: 'E-Waste Pickup' }));
    await addBotMessageWithDelay("Great! Let's schedule your <strong>free pickup</strong> in Kochi. 🚛", 600, { isHtml: true });
    await addBotMessageWithDelay("We cover all of Ernakulam — Kakkanad, Infopark, Kalamassery, Aluva, Marine Drive, and surrounding circles.", 1000);
    await addBotMessageWithDelay("What items do you have? (laptops, servers, switches, desktop PCs, chargers...)", 1400);
    setAwaitingInput('items');
  };

  // Price Appraisal Flow
  const priceFlow = async () => {
    setLeadData(prev => ({ ...prev, service: 'Price Quote' }));
    await addBotMessageWithDelay("Happy to give you a custom quote! 📋", 600);
    await addBotMessageWithDelay("Quick info: newer or clean depreciated laptops and assets may have <strong>excellent corporate asset buyback value</strong>! 💰", 1000, { isHtml: true });
    await addBotMessageWithDelay("What type of equipment are you looking to dispose?", 1400);
    setAwaitingInput('price_select');
  };

  // Corporate ITAD Flow
  const corporateFlow = async () => {
    setLeadData(prev => ({ ...prev, service: 'Corporate ITAD' }));
    await addBotMessageWithDelay("Our corporate ITAD team provides end-to-end recovery — serial asset audits, hard-drive physical shearing, toxic compliance, and green reports. 🏢", 700);
    await addBotMessageWithDelay("We serve Infopark, SmartCity, technology incubator hubs, and public offices in Kochi.", 1100);
    await addBotMessageWithDelay("What's your company name and industry?", 1500);
    setAwaitingInput('company');
  };

  // Data destruction Flow
  const dataDestrFlow = async () => {
    setLeadData(prev => ({ ...prev, service: 'Data Destruction' }));
    await addBotMessageWithDelay("We comply fully with <strong>NIST SP 800-88</strong> guidelines to offer physical block shearing down to extremely tiny ≤2mm fragments. 🔒", 700, { isHtml: true });
    await addBotMessageWithDelay("Every processed hard drive, storage disk, or server slot receives a genuine <strong>Certificate of Destruction (CoD)</strong>.", 1100, { isHtml: true });
    await addBotMessageWithDelay("What media needs certified shredding?", 1500);
    setAwaitingInput('media_select');
  };

  // Ask a Question Flow
  const askFlow = async () => {
    await addBotMessageWithDelay("Ask me anything! I am fully equipped with information about CPCB regulations, DPDP laws, collection schedules, and buybacks. 🤖", 600);
    setAwaitingInput('freeform');
  };

  // Secondary handling in step dialogues
  const handleItemSelect = async (item: string) => {
    addUserMessage(item);
    setLeadData(prev => ({ ...prev, items: item }));
    await addBotMessageWithDelay(`Selected <strong>${item}</strong>. Approximately how many units?`, 600, { isHtml: true });
    setAwaitingInput('qty_select');
  };

  const handleQtySelect = async (qty: string) => {
    addUserMessage(qty);
    setLeadData(prev => ({ ...prev, qty }));
    
    if (qty.includes('200+')) {
      await addBotMessageWithDelay("Fantastic — that qualifies as a <strong>bulk enterprise log</strong>! 🏢 Our desk coordinator will expedite scheduling.", 600, { isHtml: true });
    } else {
      await addBotMessageWithDelay(`Acknowledged: approximately <strong>${qty} units</strong>.`, 600, { isHtml: true });
    }

    await addBotMessageWithDelay("Which region of Kochi should we make collection from?", 1100);
    setAwaitingInput('location_select');
  };

  const handleLocationSelect = async (loc: string) => {
    addUserMessage(loc);
    setLeadData(prev => ({ ...prev, location: loc }));
    await addBotMessageWithDelay(`Excellent, <strong>${loc}</strong> is fully active in our daily routes! ✅`, 600, { isHtml: true });
    await addBotMessageWithDelay("To lock in this slot, what is your name?", 1000);
    setAwaitingInput('name');
  };

  const handleFreeformSubmit = async (query: string) => {
    setTyping(true);
    
    // Filter messages for system API
    const apiHistory = messages
      .filter(m => m.content && !m.isWaCard)
      .map(m => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.content
      }));

    // Add current query
    apiHistory.push({ role: 'user', content: query });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiHistory })
      });
      const data = await response.json();
      setTyping(false);

      if (data.text) {
        await addBotMessageWithDelay(data.text, 100);
      } else {
        await addBotMessageWithDelay("Got it! Let's get our human support desk to review this directly via WhatsApp. 👇", 100);
        offerWhatsAppHandoff();
      }
    } catch (err) {
      console.error(err);
      setTyping(false);
      await addBotMessageWithDelay("Great question! Let me connect you directly to our human desk on WhatsApp for instant confirmation. 👇", 100);
      offerWhatsAppHandoff();
    }

    // Set fallback options to maintain momentum
    setTimeout(() => {
      setAwaitingInput('freeform_options');
    }, 1500);
  };

  const offerWhatsAppHandoff = () => {
    const waText = encodeURIComponent(`Hi! I am currently consulting your AI support bot regarding e-waste services in Kochi.`);
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        role: 'bot',
        content: 'Continue on WhatsApp',
        time: getNowTime(),
        isWaCard: true,
        waUrl: `${WA_BASE}?text=${waText}`,
        waTitle: 'Connect via WhatsApp Desk',
        waSubtitle: 'Instant human reply · Custom Quotes'
      }
    ]);
  };

  const handlePhoneSubmit = async (phoneStr: string) => {
    setLeadData(prev => ({ ...prev, phone: phoneStr }));
    const finalLead = { ...leadData, name: leadData.name, phone: phoneStr };

    await addBotMessageWithDelay(`Perfect, <strong>${finalLead.name}</strong>! Here is your collection manifest:`, 600, { isHtml: true });

    const summaryText = `
    📋 <strong>Service Plan:</strong> ${finalLead.service || 'E-Waste Pickup'}<br>
    📦 <strong>Hardware Categorization:</strong> ${finalLead.items || 'Depreciated assets'}<br>
    🔢 <strong>Estimated Quantity:</strong> ${finalLead.qty || 'To be appraised'}<br>
    📍 <strong>Collection Point:</strong> ${finalLead.location || 'Kochi Area'}<br>
    📱 <strong>WhatsApp Lead Registered:</strong> ${phoneStr}`;

    await addBotMessageWithDelay(summaryText, 1100, { isHtml: true });
    await addBotMessageWithDelay("✅ Free Logistics Node allocated! Please confirm this slot and get your exact arrival time immediately on our WhatsApp channel below:", 1700);

    const waMsgText = encodeURIComponent(`Hi! I'm ${finalLead.name}, interested in scheduling a ${finalLead.service || 'E-Waste slot'} for ${finalLead.items || 'hardware'} (${finalLead.qty || 'multiple'} units) at ${finalLead.location}, Ernakulam. Please confirm my logistics driver.`);
    
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        role: 'bot',
        content: 'Confirm Arrival Slot',
        time: getNowTime(),
        isWaCard: true,
        waUrl: `${WA_BASE}?text=${waMsgText}`,
        waTitle: 'Link Secure Schedule Now',
        waSubtitle: `${finalLead.name} · ${finalLead.items} · ${finalLead.location}`
      }
    ]);

    setAwaitingInput('reset');
  };

  const handleReset = () => {
    setMessages([]);
    setLeadData({
      service: '',
      qty: '',
      location: '',
      name: '',
      phone: '',
      items: '',
      company: ''
    });
    setAwaitingInput(null);
    setTimeout(() => {
      startConversation();
    }, 200);
  };

  const handleTextInputSubmit = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    setInputVal('');
    addUserMessage(trimmed);

    if (awaitingInput === 'items') {
      setLeadData(prev => ({ ...prev, items: trimmed }));
      addBotMessageWithDelay(`Registered <strong>${trimmed}</strong>. Approximately how many units?`, 600, { isHtml: true });
      setAwaitingInput('qty_select');
    } else if (awaitingInput === 'company') {
      setLeadData(prev => ({ ...prev, company: trimmed, items: 'Corporate Lot' }));
      addBotMessageWithDelay(`Thanks! Approximately how many assets look to be decommissioned from ${trimmed}?`, 600, { isHtml: true });
      setAwaitingInput('qty_select');
    } else if (awaitingInput === 'name') {
      setLeadData(prev => ({ ...prev, name: trimmed }));
      addBotMessageWithDelay(`Hi <strong>${trimmed}</strong>! 👋 Please input your WhatsApp phone number so we can register the slot.`, 600, { isHtml: true });
      setAwaitingInput('phone');
    } else if (awaitingInput === 'phone') {
      handlePhoneSubmit(trimmed);
    } else if (awaitingInput === 'freeform') {
      handleFreeformSubmit(trimmed);
    } else {
      handleFreeformSubmit(trimmed);
    }
  };

  return (
    <>
      {/* CSS Stylesheet Injector to keep styling pristine and responsive exactly as requested */}
      <style>{`
        .chat-trigger {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9991;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25D366, #128C7E);
          box-shadow: 0 6px 28px rgba(37,211,102,.45), 0 0 0 0 rgba(37,211,102,.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: ripple 2.5s infinite;
        }
        .chat-trigger:hover {
          transform: scale(1.08);
          box-shadow: 0 10px 40px rgba(37,211,102,.55);
        }
        @keyframes ripple {
          0%, 100% {
            box-shadow: 0 6px 28px rgba(37,211,102,.45), 0 0 0 0 rgba(37,211,102,.3);
          }
          50% {
            box-shadow: 0 6px 28px rgba(37,211,102,.45), 0 0 0 12px rgba(37,211,102,0);
          }
        }
        .trigger-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          background: #FF4444;
          border-radius: 50%;
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .62rem;
          font-weight: 900;
          color: #fff;
          font-family: sans-serif;
        }
        .chat-window {
          position: fixed;
          bottom: 100px;
          right: 24px;
          z-index: 9995;
          width: 380px;
          height: 520px;
          max-height: calc(100vh - 120px);
          background: #0D1B2E;
          border: 1px solid rgba(0,200,150,.2);
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(0,0,0,.45);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all .3s cubic-bezier(.4, 0, .2, 1);
        }
        .chat-header {
          background: linear-gradient(135deg, #132338, #090F1A);
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(0,200,150,.2);
          flex-shrink: 0;
        }
        .bot-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00C896, #00A87C);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }
        .bot-status {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 8px;
          height: 8px;
          background: #44FF88;
          border-radius: 50%;
          border: 1.5px solid #0D1B2E;
          animation: status-blink 2s infinite;
        }
        @keyframes status-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: .4; }
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .msg {
          display: flex;
          gap: 8px;
          align-items: flex-end;
          max-width: 88%;
          animation: message-fade-up 0.3s ease-out forwards;
        }
        @keyframes message-fade-up {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .msg.bot { align-self: flex-start; }
        .msg.user { align-self: flex-end; flex-direction: row-reverse; }
        
        .msg-av {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          flex-shrink: 0;
          background: linear-gradient(135deg, #00C896, #00A87C);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #090F1A;
        }
        .msg-bubble {
          padding: 10px 14px;
          border-radius: 14px;
          font-size: .84rem;
          line-height: 1.45;
          max-width: 260px;
          text-align: left;
        }
        .msg.bot .msg-bubble {
          background: #132338;
          color: #E8F4FF;
          border-radius: 4px 14px 14px 14px;
          border: 1px solid rgba(255,255,255,.07);
        }
        .msg.user .msg-bubble {
          background: linear-gradient(135deg, #00C896, #00A87C);
          color: #090F1A;
          font-weight: 600;
          border-radius: 14px 4px 14px 14px;
        }
        .msg-time {
          font-size: .64rem;
          color: #8BA8C4;
          margin-top: 4px;
          padding: 0 4px;
          font-family: monospace;
        }
        .typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          background: #00C896;
          border-radius: 50%;
          animation: tdot .9s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: .15s; }
        .typing-dot:nth-child(3) { animation-delay: .3s; }
        @keyframes tdot {
          0%, 100% { transform: translateY(0); opacity: .4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        .quick-opts {
          padding: 0 16px 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: flex-start;
          flex-shrink: 0;
          max-height: 130px;
          overflow-y: auto;
        }
        .qopt {
          background: #132338;
          border: 1px solid rgba(0,200,150,.2);
          color: #00C896;
          padding: 6px 12px;
          border-radius: 100px;
          font-size: .76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all .2s;
          white-space: nowrap;
          text-align: left;
        }
        .qopt:hover {
          background: #00C896;
          color: #090F1A;
          border-color: #00C896;
        }
        .chat-input-wrap {
          padding: 12px 14px;
          border-top: 1px solid rgba(255,255,255,.06);
          display: flex;
          gap: 8px;
          align-items: center;
          flex-shrink: 0;
          background: #090F1A;
        }
        .chat-input {
          flex: 1;
          background: #132338;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 100px;
          padding: 9px 16px;
          color: #FFFFFF;
          font-size: .83rem;
          outline: none;
          transition: border-color .2s;
        }
        .chat-input:focus {
          border-color: #00C896;
          box-shadow: 0 0 0 1px rgba(0,200,150,.2);
        }
        .chat-input::placeholder {
          color: #8BA8C4;
        }
        .send-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #00C896;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #090F1A;
          transition: all .25s;
        }
        .send-btn:hover {
          background: #00A87C;
          transform: scale(1.04);
        }
        .wa-card {
          margin: 6px 0 0;
          background: linear-gradient(135deg, #075E54, #128C7E);
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all .25s;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.1);
          text-align: left;
        }
        .wa-card:hover {
          transform: scale(1.01);
          box-shadow: 0 4px 18px rgba(37,211,102,.35);
        }
        .wa-card-ico {
          width: 32px;
          height: 32px;
          background: rgba(255,255,255,.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }
        .wa-card-text h5 {
          color: #fff;
          font-size: .84rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 0;
        }
        .wa-card-text p {
          color: rgba(255,255,255,.75);
          font-size: .70rem;
          margin: 2px 0 0;
        }
        .wa-card-arrow {
          margin-left: auto;
          color: rgba(255,255,255, 0.7);
          font-size: 0.9rem;
          font-weight: bold;
        }
        .ai-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: .64rem;
          color: #8BA8C4;
          padding: 4px 16px 8px;
          background: #090F1A;
          justify-content: flex-start;
          font-family: monospace;
          border-top: 1px solid rgba(255,255,255,.02);
        }
        .ai-dot {
          width: 4px;
          height: 4px;
          background: #00C896;
          border-radius: 50%;
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: .3; }
        }
        .chat-minimize {
          position: fixed;
          bottom: 100px;
          right: 24px;
          z-index: 9990;
          background: #0D1B2E;
          border: 1px solid rgba(0,200,150,.3);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 30px rgba(0,0,0,.4);
          cursor: pointer;
          animation: bounce-in .4s ease;
          max-width: 290px;
        }
        @keyframes bounce-in {
          0% { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .chat-minimize p {
          font-size: .81rem;
          color: #E8F4FF;
          font-weight: 500;
          line-height: 1.35;
          margin: 0;
          text-align: left;
        }
        .close-min {
          color: #8BA8C4;
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px;
          margin-left: auto;
          font-size: 0.85rem;
        }
        .close-min:hover {
          color: #fff;
        }

        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 16px);
            right: 8px;
            bottom: 84px;
            height: 480px;
            max-height: calc(100vh - 100px);
          }
          .chat-trigger {
            bottom: 16px;
            right: 16px;
            width: 58px;
            height: 58px;
          }
          .chat-minimize {
            bottom: 84px;
            right: 8px;
            max-width: calc(100vw - 16px);
          }
        }
      `}</style>

      {/* FLOAT ACTION TRIGGER TRIGGER */}
      <button 
        className="chat-trigger cursor-pointer"
        onClick={() => {
          if (isOpen) {
            closeChat();
          } else {
            openChat();
          }
        }}
        aria-label="Toggle EWaste Kochi WhatsApp AI Agent"
        title="Chat with EWaste Kochi Virtual Assistant"
      >
        <span className="relative w-8 h-8 flex items-center justify-center">
          {isOpen ? (
            <X className="h-6 w-6 text-white stroke-[2.5]" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white fill-current">
              <path d="M12.008 0C5.397 0 .06 5.348.057 11.954c0 2.109.546 4.154 1.587 5.958L0 24l6.435-1.688c1.751.957 3.719 1.459 5.724 1.459h.004c6.613 0 11.95-5.348 11.953-11.954a11.895 11.895 0 00-3.505-8.484C18.356 1.229 15.346 0 12.008 0zm6.59 15.226c-.27-.135-1.597-.788-1.845-.878-.248-.09-.43-.135-.61.135-.18.27-.697.878-.855 1.058-.158.18-.315.202-.585.067-.27-.135-1.137-.42-2.167-1.34-.801-.715-1.343-1.6-1.5-1.87-.158-.27-.017-.415.118-.55.121-.121.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.023-.472-.067-.135-.61-1.469-.835-2.01-.22-.529-.44-.457-.61-.466-.157-.008-.338-.01-.52-.01-.18 0-.473.067-.72.337-.248.27-.945.923-.945 2.25s.967 2.61 1.103 2.79c.135.18 1.902 2.905 4.61 4.07.644.277 1.148.443 1.54.568.647.206 1.237.177 1.703.107.519-.078 1.597-.653 1.823-1.283.225-.63.225-1.17.157-1.282-.067-.113-.248-.18-.518-.315z" />
            </svg>
          )}
          {showNotificationBadge && !isOpen && (
            <div className="trigger-badge">1</div>
          )}
        </span>
      </button>

      {/* MINIMIZE PROMPT HELP WINDOW */}
      {showMinimize && !isOpen && (
        <div 
          className="chat-minimize"
          onClick={openChat}
        >
          <div className="w-5 h-5 shrink-0 rounded-full bg-[#00C896]/10 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C896]"></span>
          </div>
          <p>Need free e-waste pickup in Kochi? 🤖</p>
          <button 
            className="close-min"
            onClick={(e) => {
              e.stopPropagation();
              setShowMinimize(false);
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* CHAT WINDOW OVERLAY */}
      {isOpen && (
        <div className="chat-window font-sans" role="dialog" aria-label="EWaste Kochi Interactive AI Consultation Unit">
          
          {/* Active Unit Header */}
          <div className="chat-header">
            <div className="bot-avatar">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-950">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              </svg>
              <div className="bot-status"></div>
            </div>
            
            <div className="flex flex-col items-start">
              <h4 className="font-sans font-black text-sm text-white tracking-tight leading-none leading-tight flex items-center gap-1">
                EWaste Kochi AI
              </h4>
              <span className="text-[10px] text-[#00C896] font-mono tracking-tight mt-0.5">● Online · Live scheduling assistant</span>
            </div>

            <button 
              className="chat-close ml-auto bg-transparent border-none text-slate-400 hover:text-white cursor-pointer p-1"
              onClick={closeChat}
              aria-label="Close interactive panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Dialog Container */}
          <div className="chat-messages scrollbar-thin scrollbar-thumb-slate-800">
            {messages.map((m) => (
              <div key={m.id} className={`msg ${m.role}`}>
                {m.role === 'bot' && !m.isWaCard && (
                  <div className="msg-av">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-slate-950">
                      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                    </svg>
                  </div>
                )}
                
                <div className="flex flex-col">
                  {m.isWaCard ? (
                    <a 
                      href={m.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wa-card"
                    >
                      <div className="wa-card-ico">
                        <Phone className="h-4.5 w-4.5 stroke-[2.5]" />
                      </div>
                      <div className="wa-card-text">
                        <h5>{m.waTitle}</h5>
                        <p>{m.waSubtitle}</p>
                      </div>
                      <span className="wa-card-arrow">→</span>
                    </a>
                  ) : m.isHtml ? (
                    <div 
                      className="msg-bubble shadow-sm"
                      dangerouslySetInnerHTML={{ __html: m.content }}
                    />
                  ) : (
                    <div className="msg-bubble shadow-sm">
                      {m.content}
                    </div>
                  )}
                  <span className={`msg-time ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Bubble Loading Indicator */}
            {typing && (
              <div className="msg bot">
                <div className="msg-av">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-slate-950">
                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  </svg>
                </div>
                <div className="msg-bubble">
                  <div className="typing">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Choice Options (Pre-qualification options) */}
          {awaitingInput === 'initial' && (
            <div className="quick-opts">
              <button className="qopt font-sans font-bold shadow-md" onClick={() => handleQuickOptionClick('♻️ Schedule Pickup', pickupFlow)}>♻️ Schedule Pickup</button>
              <button className="qopt font-sans font-bold shadow-md" onClick={() => handleQuickOptionClick('💰 Get Price Quote', priceFlow)}>💰 Get Price Quote</button>
              <button className="qopt font-sans font-bold shadow-md" onClick={() => handleQuickOptionClick('🏢 Corporate ITAD', corporateFlow)}>🏢 Corporate ITAD</button>
              <button className="qopt font-sans font-bold shadow-md" onClick={() => handleQuickOptionClick('🔐 Data Destruction', dataDestrFlow)}>🔐 Data Destruction</button>
              <button className="qopt font-sans font-bold shadow-md" onClick={() => handleQuickOptionClick('❓ Ask a Question', askFlow)}>❓ Ask a Question</button>
            </div>
          )}

          {awaitingInput === 'price_select' && (
            <div className="quick-opts">
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Laptops / Desktops', () => handleItemSelect('Laptops/Desktops'))}>Laptops/Desktops appraisal</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Servers & Racks', () => handleItemSelect('Server Arrays'))}>Servers / Infrastructure</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Hard Drives & Storage Units', () => handleItemSelect('Hard Drives/SSDs'))}>HDDs, SSDs, Flash Storage</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Mobile Devices', () => handleItemSelect('Mobile Phones'))}>Industrial Phones & Handsets</button>
              <button className="qopt font-sans animate-pulse font-bold" onClick={() => handleQuickOptionClick('Mixed / Enterprise Lot', () => handleItemSelect('Enterprise Mix'))}>Integrated Assets Mix</button>
            </div>
          )}

          {awaitingInput === 'media_select' && (
            <div className="quick-opts">
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Mechanical Hard Drives (HDD)', () => handleItemSelect('Hard Drives (HDD)'))}>Mechanical Drives (HDD)</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Solid State Devices & NVMe', () => handleItemSelect('SSDs/NVMe'))}>Solid State (SSD) & NVMe</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Full Decommissioned Laptops', () => handleItemSelect('Full Laptops'))}>Fully Intact Desktops/Laptops</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Data Backup Tapes / USB Media', () => handleItemSelect('Tapes/Drives'))}>Tapes, Flash Cards, Storage Keys</button>
            </div>
          )}

          {awaitingInput === 'qty_select' && (
            <div className="quick-opts">
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('1–10 units', () => handleQtySelect('1–10'))}>1 to 10 Small batch</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('10–50 units', () => handleQtySelect('10–50'))}>10 to 50 Standard lot</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('50–200 units', () => handleQtySelect('50–200'))}>50 to 200 Bulk lot</button>
              <button className="qopt font-sans font-bold text-emerald-400" onClick={() => handleQuickOptionClick('200+ units (Bulk Enterprise)', () => handleQtySelect('200+ (Bulk Enterprise)'))}>🏢 200+ High volume load</button>
            </div>
          )}

          {awaitingInput === 'location_select' && (
            <div className="quick-opts">
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Kakkanad Infopark Corridor', () => handleLocationSelect('Kakkanad/Infopark'))}>Kakkanad / Infopark Area</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Kalamassery Industrial Belt', () => handleLocationSelect('Kalamassery'))}>Kalamassery Node</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Kaloor / Edappally hub', () => handleLocationSelect('Edappally/Kaloor'))}>Edappally / Kaloor Hub</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Marine Drive / Fort Kochi circle', () => handleLocationSelect('Marine Drive'))}>Marine Drive Circle</button>
              <button className="qopt font-sans" onClick={() => handleQuickOptionClick('Thrippunithura Node', () => handleLocationSelect('Thrippunithura'))}>Thrippunithura Circle</button>
              <button className="qopt font-sans text-slate-400" onClick={() => handleQuickOptionClick('Other area in Kochi / Ernakulam', () => handleLocationSelect('Other Ernakulam Area'))}>Other Area in Ernakulam</button>
            </div>
          )}

          {awaitingInput === 'freeform_options' && (
            <div className="quick-opts">
              <button className="qopt font-sans font-black flex items-center gap-1.5 border-[#00C896]" onClick={offerWhatsAppHandoff}>
                <Phone className="h-3 w-3" /> Connect Live Staff
              </button>
              <button className="qopt font-sans text-slate-350" onClick={handleReset}>🔄 Return to Start Menu</button>
            </div>
          )}

          {awaitingInput === 'reset' && (
            <div className="quick-opts">
              <button className="qopt font-sans font-black" onClick={handleReset}>🔄 Start New Consultation</button>
            </div>
          )}

          {/* AI branding marker */}
          <div className="ai-label">
            <div className="ai-dot" />
            <span>Responsive Agent Node · Certified KSPCB Recycler</span>
          </div>

          {/* User Input controls */}
          <div className="chat-input-wrap">
            <input 
              ref={chatInputRef}
              type="text" 
              className="chat-input" 
              placeholder={
                awaitingInput === 'name' ? 'Input your name...' :
                awaitingInput === 'phone' ? 'Input WhatsApp number...' :
                awaitingInput === 'items' ? 'Input items description...' :
                awaitingInput === 'company' ? 'Company and industry...' :
                'Query recyclability compliance in Ernakulam...'
              }
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTextInputSubmit();
                }
              }}
              aria-label="User dialogue interface"
            />
            <button 
              className="send-btn cursor-pointer"
              onClick={handleTextInputSubmit}
              aria-label="Forward chat transmission"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
