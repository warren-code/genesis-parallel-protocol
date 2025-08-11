'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRapidResponse } from '../context/RapidResponseContext';
import { useAuth } from '@/contexts/AuthContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';
import type { SecureMessage, Responder } from '../types';

interface SecureMessagingProps {
  incidentId?: string;
  recipientIds?: string[];
}

export default function SecureMessaging({ incidentId, recipientIds = [] }: SecureMessagingProps) {
  const { messages, sendSecureMessage, responders } = useRapidResponse();
  const { user } = useAuth();
  const [messageContent, setMessageContent] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>(recipientIds);
  const [showRecipientSelector, setShowRecipientSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter messages for current conversation
  const conversationMessages = messages.filter(msg => {
    if (incidentId && msg.incidentId !== incidentId) return false;
    if (!user) return false;
    
    // Show messages where user is sender or recipient
    return msg.senderId === user.id || msg.recipientIds.includes(user.id);
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  const handleSendMessage = async () => {
    if (!messageContent.trim() || selectedRecipients.length === 0) return;

    try {
      await sendSecureMessage({
        incidentId,
        recipientIds: selectedRecipients,
        content: messageContent.trim(), // In production, encrypt this
      });
      
      setMessageContent('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const toggleRecipient = (responderId: string) => {
    setSelectedRecipients(prev => 
      prev.includes(responderId)
        ? prev.filter(id => id !== responderId)
        : [...prev, responderId]
    );
  };

  const formatTime = (date: Date) => {
    const messageDate = new Date(date);
    const now = new Date();
    const isToday = messageDate.toDateString() === now.toDateString();
    
    if (isToday) {
      return messageDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    }
    
    return messageDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getResponderName = (responderId: string) => {
    const responder = responders.find(r => r.userId === responderId);
    return responder?.name || 'Unknown';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ink">Secure Messages</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray">
              🔒 End-to-end encrypted
            </span>
            <button
              onClick={() => setShowRecipientSelector(!showRecipientSelector)}
              className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm hover:bg-accent/20 transition-colors"
            >
              Recipients ({selectedRecipients.length})
            </button>
          </div>
        </div>
        
        {/* Recipient Selector */}
        {showRecipientSelector && (
          <div className="mt-4 p-3 bg-white/5 rounded-lg space-y-2">
            <p className="text-sm text-gray mb-2">Select recipients:</p>
            <div className="grid grid-cols-2 gap-2">
              {responders.map(responder => (
                <label
                  key={responder.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedRecipients.includes(responder.userId)}
                    onChange={() => toggleRecipient(responder.userId)}
                    className="rounded border-gray/40"
                  />
                  <span className="text-sm">
                    {responder.name}
                    {responder.availability.status === 'available' && (
                      <span className="ml-1 text-green-400">●</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversationMessages.length === 0 ? (
          <div className="text-center py-8 text-gray">
            No messages yet. Start a secure conversation.
          </div>
        ) : (
          conversationMessages.map((message) => {
            const isOwnMessage = message.senderId === user?.id;
            const senderName = getResponderName(message.senderId);
            
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isOwnMessage ? 'order-1' : ''}`}>
                  <div className="flex items-end gap-2">
                    {!isOwnMessage && (
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-semibold">
                        {senderName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <GlassmorphicCard
                      blur="sm"
                      opacity={0.05}
                      className={`p-3 ${
                        isOwnMessage
                          ? 'bg-accent/10 border-accent/20'
                          : 'bg-white/5 border-gray/20'
                      }`}
                    >
                      {!isOwnMessage && (
                        <p className="text-xs text-accent mb-1">{senderName}</p>
                      )}
                      <p className="text-ink">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray">
                          {formatTime(message.createdAt)}
                        </p>
                        {message.readBy.length > 0 && (
                          <p className="text-xs text-gray">
                            ✓✓ Read by {message.readBy.length}
                          </p>
                        )}
                      </div>
                    </GlassmorphicCard>
                    
                    {isOwnMessage && (
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-primary">
                        You
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type a secure message..."
            className="flex-1 px-4 py-2 bg-white/5 border border-gray/20 rounded-lg focus:border-accent focus:outline-none"
            disabled={selectedRecipients.length === 0}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!messageContent.trim() || selectedRecipients.length === 0}
          >
            Send
          </Button>
        </form>
        {selectedRecipients.length === 0 && (
          <p className="text-xs text-gray mt-2">
            Select recipients to send messages
          </p>
        )}
      </div>
    </div>
  );
}
