import React, { useState } from 'react';
import axios from 'axios';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

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
    <div className="chat-container">
      <div className="message-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="typing-indicator">...</div>}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message or speak"
          className="input-field"
        />
        <button onClick={startListening} className="voice-icon">🎤</button>
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
