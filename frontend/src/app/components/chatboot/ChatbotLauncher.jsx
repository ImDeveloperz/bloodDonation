"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './Chatbot.css'
import HospitalSelector from '../HospitalSelector';

const ChatbotLauncher = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isHospitalSelectorActive, setIsHospitalSelectorActive] = useState(false);
  const [regionsData, setRegionsData] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  
  // Effet d'auto-scroll vers le dernier message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [responses]);

  // Message de bienvenue au chargement
  useEffect(() => {
    setTimeout(() => {
      setResponses([
        { bot: "Hello! I am your virtual assistant for blood donation. How can I help you today?", isNew: true }
      ]);
      setTimeout(() => {
        setResponses(prev => 
          prev.map(msg => ({...msg, isNew: false}))
        );
      }, 500);
    }, 1000);
    fetchHospitalData();
  }, []);

  // Récupérer les données des hôpitaux (JSON)
  const fetchHospitalData = async () => {
    try {
      const response = await axios.get("/data.json");
      setRegionsData(response.data.regions);
    } catch (error) {
      console.error("Erreur lors du chargement des données des hôpitaux", error);
    }
  };

  // Simuler l'effet de frappe du chatbot
  const simulateTyping = (response, newMessages) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setResponses([...newMessages, { bot: response, isNew: true }]);
      setTimeout(() => {
        setResponses(prev => 
          prev.map((msg, i) => i === prev.length - 1 ? {...msg, isNew: false} : msg)
        );
      }, 500);
    }, 1000 + Math.random() * 1000); // Délai aléatoire pour un effet naturel
  };

  // Fonction pour envoyer la question au backend Flask
  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    
    // Ajouter le message utilisateur
    const newMessages = [...responses, { user: message, isNew: true }];
    setResponses(newMessages);
    
    setTimeout(() => {
      setResponses(prev => 
        prev.map((msg, i) => i === prev.length - 1 ? {...msg, isNew: false} : msg)
      );
    }, 500);
    
    setMessage("");
    setLoading(true);
    
    try {
      
      const response = await axios.post("http://localhost:8000/chatboot", {
        message: message,
      });
      
      const botReply = response.data.intent;
      const botReply2 = response.data.response;
      
      // Si l'intent est RendezVousDon, activer le sélecteur d'hôpital
      if (botReply === "DonationLocation") {
        setLoading(false);
        setIsHospitalSelectorActive(true);
      } else {
        setLoading(false);
        simulateTyping(botReply2, newMessages);
      }
    } catch (error) {
      console.error("Erreur lors de l'appel API :", error);
      setLoading(false);
      simulateTyping("I didn't understand, could you rephrase your question?", newMessages);
    }
  };

  // Gérer l'envoi par la touche Entrée
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container ">
      <div className="chat-header">
        <div className="chat-avatar">
          <span>🩸</span>
        </div>
        <div className="chat-title ">
          <h2>Blood Donation Assistant </h2>
          <div className="chat-status">
            <span className="status-dot "></span>
            <span>Online</span>
          </div>
        </div>
      </div>
      
      <div className="chat-window">
        {responses.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.user ? "user" : "bot"} ${msg.isNew ? "new" : ""}`}
          >
            {msg.user && <div className="message-avatar user">👤</div>}
            {msg.bot && <div className="message-avatar bot">🩸</div>}
            <div className="message-content">
              {msg.user || msg.bot}
            </div>
            <div className="message-time">
              {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="message bot">
            <div className="message-avatar bot">🩸</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        {isTyping && (
          <div className="message bot">
            <div className="message-avatar bot">🩸</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>
      
      {isHospitalSelectorActive ? (
        <HospitalSelector data={regionsData} onFinish={(hospitals) => {
          simulateTyping(`Here are the hospitals available for your blood donation: ${hospitals.join(", ")}`, responses);
          setIsHospitalSelectorActive(false);
        }} />
      ) : (
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about donating blood..."
            disabled={loading || isTyping}
          />
          <button 
            onClick={handleSendMessage} 
            disabled={loading || isTyping || message.trim() === ""}
            className={message.trim() !== "" ? "active" : ""}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      )}
      
      <div className="chatbot-footer">
        <p>Votre santé compte. En cas d'urgence, contactez directement un professionnel de santé.</p>
      </div>
    </div>
  );
};

export default ChatbotLauncher;
