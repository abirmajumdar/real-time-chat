import React from "react";

const Chatpage = () => {
  return (
    <div className="bg-gray-100 flex flex-col h-screen">

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="rounded-full"
          />
          <h1 className="text-xl font-semibold">Chat with John</h1>
        </div>
        <div className="flex items-center gap-4">
          <button>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Received message */}
        <div className="flex items-start gap-2">
          <img
            src="https://i.pravatar.cc/30?img=2"
            alt="Friend"
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-white p-3 rounded-lg shadow max-w-xs">
            <p className="text-gray-800">Hey! How are you?</p>
            <span className="text-xs text-gray-400">10:00 AM</span>
          </div>
        </div>

        {/* Sent message */}
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white p-3 rounded-lg shadow max-w-xs">
            <p>I'm good, thanks! You?</p>
            <span className="text-xs text-white/70">10:02 AM</span>
          </div>
        </div>

        {/* Received message */}
        <div className="flex items-start gap-2">
          <img
            src="https://i.pravatar.cc/30?img=2"
            alt="Friend"
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-white p-3 rounded-lg shadow max-w-xs">
            <p>Doing great! Wanna catch up later?</p>
            <span className="text-xs text-gray-400">10:05 AM</span>
          </div>
        </div>

      </div>

      {/* Message Input */}
      <div className="p-4 bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default Chatpage;
