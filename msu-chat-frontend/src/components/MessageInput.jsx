import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Send, Smile, Paperclip, Image as ImageIcon, Mic } from 'lucide-react';
import EmojiPicker from './EmojiPicker';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    textareaRef.current?.focus();
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Future Features Notice */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 text-xs text-gray-500">
            <span>Coming soon:</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                <Paperclip className="w-3 h-3" />
                <span>Files</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                <ImageIcon className="w-3 h-3" />
                <span>Images</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                <Mic className="w-3 h-3" />
                <span>Voice</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="min-h-[60px] max-h-[150px] pr-12 resize-none"
              rows={2}
            />
            <div className="absolute right-2 bottom-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-teal-50"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="w-5 h-5 text-gray-500" />
              </Button>
            </div>

            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2">
                <EmojiPicker onSelect={handleEmojiSelect} onClose={() => setShowEmojiPicker(false)} />
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={!message.trim()}
            className="h-[60px] px-6 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-lg transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;