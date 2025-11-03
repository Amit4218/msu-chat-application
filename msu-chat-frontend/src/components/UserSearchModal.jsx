import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { mockUsers } from '../mock';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Search, X } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const UserSearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Enter search query',
        description: 'Please enter an email or phone number to search',
        variant: 'destructive'
      });
      return;
    }

    const results = mockUsers.filter(user => 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
    );

    setSearchResults(results);

    if (results.length === 0) {
      toast({
        title: 'No users found',
        description: 'Try searching with a different email or phone number'
      });
    }
  };

  const handleAddUser = (user) => {
    toast({
      title: 'Chat started!',
      description: `You can now chat with ${user.name}`
    });
    onClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Search for people using their email or phone number
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Email or Phone Number</Label>
            <div className="flex gap-2">
              <Input
                id="search"
                placeholder="email@college.edu or +1234567890"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                className="bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-linear-to-br from-teal-400 to-emerald-500 text-white">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddUser(user)}
                    className="bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSearchModal;