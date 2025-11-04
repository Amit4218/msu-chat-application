import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockMessages } from '../mock';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Phone, Video, MoreVertical, Users, ArrowLeft } from 'lucide-react';
import MessageInput from './MessageInput';

const ChatWindow = ({ conversation, onBack }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (conversation) {
      // Load messages for this conversation from mock data
      const convMessages = mockMessages[conversation.id] || [];
      setMessages(convMessages);
    }
  }, [conversation]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
      sender: currentUser
    };

    setMessages(prev => [...prev, newMessage]);
  };

  if (!conversation) {
    return (
      <div className="flex-1 h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-emerald-50 to-green-50">
        <div className="text-center">
          <div className="bg-linear-to-br from-teal-100 to-emerald-100 p-8 rounded-full inline-block mb-4">
            <Users className="w-16 h-16 text-teal-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CollegeChat</h3>
          <p className="text-gray-600">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  const displayName = conversation.type === 'group' ? conversation.name : conversation.participant.name;
  const displayAvatar = conversation.type === 'group' ? conversation.avatar : conversation.participant.avatar;
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden -ml-2"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src={displayAvatar} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-teal-400 to-emerald-500 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{displayName}</h3>
              {conversation.type === 'group' ? (
                <p className="text-xs text-gray-500">
                  {conversation.participants.length} members
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  {conversation.participant.type === 'student' 
                    ? conversation.participant.semester 
                    : conversation.participant.designation}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-teal-600">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-teal-600">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-teal-600">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const showAvatar = !isCurrentUser && (
              index === messages.length - 1 || 
              messages[index + 1]?.senderId !== message.senderId
            );

            return (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  isCurrentUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {!isCurrentUser && (
                  <Avatar
                    className={`w-8 h-8 ${
                      showAvatar ? "visible" : "invisible"
                    }`}
                  >
                    <AvatarImage
                      src={message.sender.avatar}
                      alt={message.sender.name}
                    />
                    <AvatarFallback className="bg-linear-to-br from-teal-400 to-emerald-500 text-white text-xs">
                      {message.sender.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`flex flex-col ${
                    isCurrentUser ? "items-end" : "items-start"
                  } max-w-[70%]`}
                >
                  {!isCurrentUser && showAvatar && (
                    <span className="text-xs text-gray-600 mb-1 px-1">
                      {message.sender.name}
                    </span>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 shadow-sm ${
                      isCurrentUser
                        ? "bg-linear-to-r from-teal-500 to-emerald-600 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap wrap-break-word">
                      {message.text}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-1">
                    {formatMessageTime(message.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;