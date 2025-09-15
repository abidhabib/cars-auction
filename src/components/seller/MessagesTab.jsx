// src/components/seller/MessagesTab.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FiChevronLeft, FiSend, FiMessageSquare, FiX, FiUser, FiClock, FiCheck, FiCheckCircle, FiSearch, FiPaperclip, FiSmile, FiMoreVertical } from 'react-icons/fi';

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
        type: 'Dealer',
        avatar: null,
        lastSeen: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
      },
      lastMessage: 'Hi, interested in the BMW. Is it still available for inspection?',
      unread: 2,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      messages: [
        { id: 'msg_001', sender: 'buyer', text: 'Hi, interested in the BMW. Is it still available for inspection?', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), status: 'read' },
        { id: 'msg_002', sender: 'seller', text: 'Yes, absolutely! Please let me know a convenient time.', timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000), status: 'delivered' },
        { id: 'msg_003', sender: 'buyer', text: 'How about tomorrow morning 10 AM?', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), status: 'read' }
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
        type: 'Private Buyer',
        avatar: null,
        lastSeen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      lastMessage: 'Congratulations on the sale!',
      unread: 0,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      messages: [
        { id: 'msg_004', sender: 'buyer', text: 'Congratulations on the sale!', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), status: 'read' }
      ]
    },
    {
      id: 'chat_003',
      vehicleId: 'veh_003',
      vehicleStock: 'STK2023-003',
      vehicleMakeModel: 'Mercedes C-Class',
      buyer: {
        id: 'buyer_ghi',
        name: 'Premium Auto Traders',
        type: 'Dealer',
        avatar: null,
        lastSeen: new Date(Date.now() - 10 * 60 * 1000) // 10 minutes ago
      },
      lastMessage: 'Can you provide more photos of the interior?',
      unread: 1,
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      messages: [
        { id: 'msg_005', sender: 'buyer', text: 'Can you provide more photos of the interior?', timestamp: new Date(Date.now() - 30 * 60 * 1000), status: 'sent' }
      ]
    }
];

const MessagesTab = ({ selectedChat, setSelectedChat, setChatOpen, chatOpen }) => {
  const { t } = useLanguage();
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const [filteredChats, setFilteredChats] = useState(demoChats);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  // Filter chats based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredChats(demoChats);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = demoChats.filter(chat => 
        chat.buyer.type.toLowerCase().includes(term) ||
        chat.vehicleMakeModel.toLowerCase().includes(term) ||
        chat.vehicleStock.toLowerCase().includes(term)
      );
      setFilteredChats(filtered);
    }
  }, [searchTerm]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newMsg = {
        id: `msg_${Date.now()}`,
        sender: 'seller',
        text: newMessage,
        timestamp: new Date(),
        status: 'sent'
      };
      
      // Update the chat with new message
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMsg],
        lastMessage: newMessage,
        timestamp: new Date(),
        unread: 0
      };
      
      // Update the chat in the list
      const updatedChats = demoChats.map(chat => 
        chat.id === selectedChat.id ? updatedChat : chat
      );
      
      setSelectedChat(updatedChat);
      setNewMessage('');
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for chat list
  const formatDate = (timestamp) => {
    const today = new Date();
    const date = new Date(timestamp);
    
    if (date.toDateString() === today.toDateString()) {
      return formatTime(date);
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Format last seen time
  const formatLastSeen = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Online now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  if (selectedChat) {
    return (
      <div className="flex h-full bg-gray-50 rounded-xl overflow-hidden shadow-sm">
        {/* Conversations Sidebar */}
        <div className={`flex flex-col w-full md:w-80 lg:w-96 border-r border-gray-200 bg-white ${
          chatOpen ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Messages</h2>
              <div className="relative">
                <FiMoreVertical className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:bg-white"
              />
            </div>
          </div>
          
          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat);
                    setChatOpen(true);
                  }}
                  className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedChat?.id === chat.id ? 'bg-[#f8f9ff]' : ''
                  }`}
                >
                  {/* Anonymous Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center">
                      <FiUser className="text-gray-500 h-6 w-6" />
                    </div>
                    {chat.unread > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#3b396d] text-white text-xs">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {chat.buyer.type || 'Buyer'}
                      </p>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(chat.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {chat.vehicleMakeModel} ({chat.vehicleStock})
                    </p>
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-gray-700 truncate flex-1">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#3b396d] text-white text-xs flex-shrink-0">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                <FiMessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No conversations found</h3>
                <p className="text-gray-500">
                  Try adjusting your search term
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col bg-white ${chatOpen ? 'flex' : 'hidden md:flex'}`}>
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center">
              <button
                onClick={() => setChatOpen(false)}
                className="mr-3 text-gray-500 hover:text-gray-700 md:hidden"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
              
              {/* Anonymous Avatar */}
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                  <FiUser className="text-gray-500 h-5 w-5" />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                  <div className="bg-green-500 rounded-full w-2 h-2"></div>
                </div>
              </div>
              
              <div className="ml-3">
                <p className="font-semibold text-gray-900">
                  {selectedChat.buyer.type || 'Buyer'}
                </p>
                <p className="text-xs text-gray-500">
                  {formatLastSeen(selectedChat.buyer.lastSeen)} • {selectedChat.vehicleMakeModel} ({selectedChat.vehicleStock})
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <FiMoreVertical className="h-5 w-5" />
              </button>
            </div>
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
                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 ${
                      message.sender === 'seller'
                        ? 'bg-[#3b396d] text-white rounded-br-none'
                        : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className={`flex items-center justify-end mt-1 ${
                      message.sender === 'seller' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      <span className="text-xs mr-1">{formatTime(message.timestamp)}</span>
                      {message.sender === 'seller' && (
                        <>
                          {message.status === 'sent' && <FiCheck className="h-3 w-3" />}
                          {message.status === 'delivered' && <FiCheckCircle className="h-3 w-3" />}
                          {message.status === 'read' && (
                            <span className="flex">
                              <FiCheck className="h-3 w-3 -mr-1" />
                              <FiCheck className="h-3 w-3" />
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <FiPaperclip className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <FiSmile className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 mx-2 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-transparent"
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
                className={`p-3 rounded-full ${
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

        {/* Empty State - Only show on mobile when no chat is selected */}
        {!selectedChat && (
          <div className="flex-1 flex-col items-center justify-center p-8 text-center bg-white md:hidden">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
              <FiMessageSquare className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
            <p className="text-gray-500 max-w-md">
              Select a conversation from the list to start chatting.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
<div className="flex min-h-screen bg-gray-50 rounded-xl overflow-hidden shadow-sm">      {/* Conversations Sidebar - Full width on mobile when no chat selected */}
      <div className="flex flex-col w-full md:w-80 lg:w-96 border-r border-gray-200 bg-white">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Messages</h2>
            <div className="relative">
              <FiMoreVertical className="text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:bg-white"
            />
          </div>
        </div>
        
        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat);
                  setChatOpen(true);
                }}
                className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedChat?.id === chat.id ? 'bg-[#f8f9ff]' : ''
                }`}
              >
                {/* Anonymous Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center">
                    <FiUser className="text-gray-500 h-6 w-6" />
                  </div>
                  {chat.unread > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#3b396d] text-white text-xs">
                      {chat.unread}
                    </span>
                  )}
                </div>
                
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {chat.buyer.type || 'Buyer'}
                    </p>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(chat.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {chat.vehicleMakeModel} ({chat.vehicleStock})
                  </p>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-700 truncate flex-1">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#3b396d] text-white text-xs flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
              <FiMessageSquare className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No conversations found</h3>
              <p className="text-gray-500">
                Try adjusting your search term
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Empty State - Show on larger screens when no chat is selected */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 text-center bg-white">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
          <FiMessageSquare className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
        <p className="text-gray-500 max-w-md mb-6">
          Select a conversation from the list to start chatting.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 max-w-md">
          <h4 className="font-medium text-gray-900 mb-3">Anonymous Messaging</h4>
          <p className="text-sm text-gray-600 mb-3">
            All communications are anonymous to protect your privacy. Buyers are identified only by their type.
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center mr-2">
              <FiUser className="text-gray-500 h-4 w-4" />
            </div>
            <span>Buyer Type: Dealer, Private Buyer, etc.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;