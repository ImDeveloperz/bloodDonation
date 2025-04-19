"use client"
import React, { useState, useRef, useEffect } from "react";
import ChatbotLauncher from "./ChatbotLauncher";

const chatbotImage = "/bdbot.png"; // Place image in /public
const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const chatRef = useRef(null);
    const buttonRef = useRef(null);

    // Close chat when clicking outside (but not on the button)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                chatRef.current &&
                !chatRef.current.contains(e.target) &&
                !buttonRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);
    const toggleChat = () => {
        setIsOpen((prev) => !prev);
      };
    return (
        <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end">
            {
                isOpen && (<ChatbotLauncher />)
            }
            <button
                ref={buttonRef}
                onClick={toggleChat}
                className="w-16 h-16  hover:scale-105 transition-transform"
            >
                <img
                    src={chatbotImage}
                    alt="Chatbot"
                    className="w-full h-full object-contain"
                />
            </button>
        </div>
    )
}

export default Chatbot