import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import UserSearchModal from '../components/UserSearchModal';
import GroupChatModal from '../components/GroupChatModal';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { LogOut, User, MessageSquare } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Chat = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowSidebar(false);
  };

  const handleBackToList = () => {
    setShowSidebar(true);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully'
    });
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-linear-to-r from-teal-500 to-emerald-600 text-white px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CollegeChat</h1>
              <p className="text-xs text-teal-100">Connect with your campus</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfile}
              className="text-white hover:bg-white/20 transition-colors"
            >
              <User className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white hover:bg-white/20 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
            <Avatar className="w-10 h-10 border-2 border-white/50 cursor-pointer" onClick={handleProfile}>
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="bg-white text-teal-600 font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex overflow-hidden">
        <div className={`${showSidebar ? 'block' : 'hidden'} lg:block`}>
          <ChatSidebar
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            onNewChat={() => setShowUserSearch(true)}
            onCreateGroup={() => setShowGroupModal(true)}
          />
        </div>

        <div className={`flex-1 ${!showSidebar ? 'block' : 'hidden'} lg:block`}>
          <ChatWindow
            conversation={selectedConversation}
            onBack={handleBackToList}
          />
        </div>
      </div>

      {/* Modals */}
      <UserSearchModal
        isOpen={showUserSearch}
        onClose={() => setShowUserSearch(false)}
      />
      <GroupChatModal
        isOpen={showGroupModal}
        onClose={() => setShowGroupModal(false)}
      />
    </div>
  );
};

export default Chat;