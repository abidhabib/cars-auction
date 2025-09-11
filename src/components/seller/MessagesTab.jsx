// src/components/seller/MessagesTab.jsx
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FiChevronLeft, FiSend, FiMessageSquare,FiX } from 'react-icons/fi';

// Dummy data for demo
const demoChats = [
    {
      id: 'chat_001',
      vehicleId: 'veh_001',
      vehicleStock: 'STK2023-001',
      vehicleMakeModel: 'BMW X5',
      buyer: {
        id: 'buyer_abc',
        name: 'European Fleet Solutions',
        avatar: 'https://1000logos.net/wp-content/uploads/2020/06/Lotus-Logo.png'
      },
      lastMessage: 'Hi, interested in the BMW. Is it still available for inspection?',
      unread: 2,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      messages: [
        { id: 'msg_001', sender: 'buyer', text: 'Hi, interested in the BMW. Is it still available for inspection?', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        { id: 'msg_002', sender: 'seller', text: 'Yes, absolutely! Please let me know a convenient time.', timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000) },
        { id: 'msg_003', sender: 'buyer', text: 'How about tomorrow morning 10 AM?', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) }
      ]
    },
    {
      id: 'chat_002',
      vehicleId: 'veh_002',
      vehicleStock: 'STK2023-002',
      vehicleMakeModel: 'Audi A6',
      buyer: {
        id: 'buyer_def',
        name: 'Luxury Motors Ltd.',
        avatar: 'https://1000logos.net/wp-content/uploads/2018/09/Alfa-Romeo-Logo.png'
      },
      lastMessage: 'Congratulations on the sale!',
      unread: 0,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      messages: [
        { id: 'msg_004', sender: 'buyer', text: 'Congratulations on the sale!', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }
      ]
    }
];

const MessagesTab = ({ selectedChat, setSelectedChat, setChatOpen, chatOpen }) => {
  const { t } = useLanguage();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newMsg = {
        id: `msg_${Date.now()}`,
        sender: 'seller',
        text: newMessage,
        timestamp: new Date()
      };
      // In a real app, you'd update state or call an API
      console.log("Sending message:", newMessage, "to chat:", selectedChat.id);
      // Simulate adding to chat
      alert(`Message sent: "${newMessage}"`);
      setNewMessage('');
    }
  };

  if (selectedChat) {
    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSelectedChat(null)}
              className="mr-3 text-gray-500 hover:text-gray-700 lg:hidden"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <img src={selectedChat.buyer.avatar} alt={selectedChat.buyer.name} className="h-8 w-8 rounded-full mr-3" />
            <div>
              <p className="font-medium">{selectedChat.buyer.name}</p>
              <p className="text-xs text-gray-500">{selectedChat.vehicleMakeModel} ({selectedChat.vehicleStock})</p>
            </div>
          </div>
          <button
            onClick={() => setChatOpen(false)}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                    message.sender === 'seller'
                      ? 'bg-[#3b396d] text-white rounded-br-none'
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'seller' ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t('sellerDashboard.messages.typeMessage') || "Type a message..."}
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`px-4 py-2 rounded-r-lg ${
                newMessage.trim()
                  ? 'bg-[#3b396d] text-white hover:bg-[#2a285a]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FiSend className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full">
      {/* Chat List (Sidebar on larger screens) */}
      <div className={`border-r border-gray-200 md:w-1/3 lg:w-1/4 ${chatOpen ? 'hidden md:block' : 'block'}`}>
        <div className="p-4 border-b border-gray-200">
          <h4 className="text-md font-medium text-gray-900">{t('sellerDashboard.messages.conversations') || 'Conversations'}</h4>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          {demoChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat);
                setChatOpen(true);
              }}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? 'bg-[#f8f9ff]' : ''
              }`}
            >
              <div className="flex items-center">
                <img src={chat.buyer.avatar} alt={chat.buyer.name} className="w-10 rounded-full mr-3" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">{chat.buyer.name}</p>
                    {chat.unread > 0 && (
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#3b396d] text-white text-xs">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.vehicleMakeModel} ({chat.vehicleStock})</p>
                  <p className="text-xs text-gray-700 truncate mt-1">{chat.lastMessage}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  {chat.timestamp.toLocaleDateString()} {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State / Instructions for Chat Area */}
      <div className={`flex-1 flex-col items-center justify-center p-8 text-center hidden md:flex ${chatOpen ? 'hidden' : 'flex'}`}>
        <FiMessageSquare className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">{t('sellerDashboard.messages.selectConversation') || 'Select a conversation'}</h3>
        <p className="text-gray-500 max-w-md">
          {t('sellerDashboard.messages.selectConversationDesc') || 'Choose a conversation from the list to start chatting.'}
        </p>
      </div>
    </div>
  );
};

export default MessagesTab;