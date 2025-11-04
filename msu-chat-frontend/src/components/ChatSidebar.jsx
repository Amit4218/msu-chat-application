import React, { useState } from 'react';
import { mockConversations } from '../mock';
import { Input } from './ui/input';
import { Button } from './ui/button';
// import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Search, Plus, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const ChatSidebar = ({ selectedConversation, onSelectConversation, onNewChat, onCreateGroup }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter(conv => {
    const searchLower = searchQuery.toLowerCase();
    if (conv.type === 'group') {
      return conv.name.toLowerCase().includes(searchLower);
    }
    return conv.participant.name.toLowerCase().includes(searchLower) ||
           conv.participant.email.toLowerCase().includes(searchLower);
  });

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full lg:w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex-1">Messages</h2>
          
          <Button
            size="sm"
            variant="outline"
            className="h-9 w-9 p-0"
            onClick={onCreateGroup}
          >
            <Users className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="h-9 w-9 p-0 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
            onClick={onNewChat}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredConversations.map((conv) => {
            const isSelected = selectedConversation?.id === conv.id;
            const displayName = conv.type === 'group' ? conv.name : conv.participant.name;
            const displayAvatar = conv.type === 'group' ? conv.avatar : conv.participant.avatar;
            const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();

            return (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv)}
                className={`w-full p-3 rounded-lg mb-1 transition-all duration-200 ${
                  isSelected
                    ? "bg-linear-to-r from-teal-50 to-emerald-50 border border-teal-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={displayAvatar} alt={displayName} />
                      <AvatarFallback className="bg-linear-to-br from-teal-400 to-emerald-500 text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    {conv.unread > 0 && (
                      <div className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                        {conv.unread}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {displayName}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 shrink-0">
                        {formatTime(conv.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.type === "group" && (
                        <Users className="w-3 h-3 text-gray-400 ml-2 shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;