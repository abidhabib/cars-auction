// src/components/seller/components/ChatListItem.jsx
import React from 'react';

const ChatListItem = ({ chat, onClick, t }) => { // Receive t as prop
  return (
    <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={onClick}>
      <img src={chat.buyer.avatar} alt={chat.buyer.name} className=" w-10 rounded-full mr-3" />
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
      <div className="text-xs text-gray-500 whitespace-nowrap ml-2">
        {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default ChatListItem;