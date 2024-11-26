import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [userMessage, setUserMessage] = useState('');

  // Preprogrammed replies
  const replies = [
    'That’s interesting, tell me more!',
    'I’ll get back to you on that.',
    'Can you clarify a bit more?',
    'Here’s something you might find useful: 🚀',
    'Glad you’re reaching out! Anything else?',
    'Let me think... Okay, I got it!',
  ];

  const sendMessage = () => {
    if (userMessage.trim() === '') return;

    // Add user message to the chat
    setMessages([...messages, { sender: 'user', text: userMessage }]);

    // Simulate bot reply after a short delay
    setTimeout(() => {
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: randomReply },
      ]);
    }, 1000);

    setUserMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-bold">Chat</h2>
        <p className="text-sm opacity-75">Customer Support</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`${
                msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
              } p-3 rounded-lg max-w-xs shadow`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center border-t border-gray-300 p-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
