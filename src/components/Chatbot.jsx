import React, { useState } from 'react';
import axios from 'axios';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const AZURE_SUBSCRIPTION_KEY = process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY;
const AZURE_REGION = process.env.REACT_APP_AZURE_REGION;

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Azure Speech Service config
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(AZURE_SUBSCRIPTION_KEY, AZURE_REGION);
  speechConfig.speechRecognitionLanguage = 'ja-JP';

  // Start recording and transcribing speech
  const startListening = () => {
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result) => {
      setInput(result.text);  // Display the recognized text in input
    });
  };

  // Handle sending the message
  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setIsLoading(true);

    // Post to Django backend
    try {
      const response = await axios.post('/api/chat/', { message: input });
      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages([...messages, userMessage, botMessage]);

      // Use Azure TTS to play bot's message
      const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
      synthesizer.speakTextAsync(botMessage.text);
    } catch (error) {
      console.error(error);
    }

    setInput('');  // Clear input
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[82svh] max-w-lg mt-3">
      <div className="messages flex flex-col space-y-4 p-3 flex-grow overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.sender === 'user' ? (
              <div className="chat-message">
                <div className="flex items-end justify-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-dark-green text-white text-xl">
                      {msg.text}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="chat-message">
                <div className="flex items-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 text-xl">
                      {msg.text}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
  
      <div className="input-box flex w-full p-2 bg-white border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message or speak"
          className="flex-grow p-2 border border-gray-300 rounded-l-lg"
        />
        <FaMicrophone onClick={startListening} className="text-gray-600 text-3xl "/>
        <IoSend onClick={sendMessage} className="text-blue-500 text-3xl ml-2"/>
      </div>
    </div>
  );
};  

export default Chatbot;
