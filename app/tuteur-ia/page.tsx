"use client";

import { useState } from "react";
import { FiSend, FiUser, FiMonitor } from "react-icons/fi";
import FadeIn from "@/components/animations/FadeIn";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function TuteurPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Ajouter le message de l'utilisateur
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Erreur de réponse");

      const data = await response.json();
      
      // Ajouter la réponse du tuteur
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Désolé, une erreur est survenue. Veuillez réessayer." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-black dark:to-green-950">
      <div className="container-custom py-10">
        <FadeIn>
          <h1 className="heading-1 mb-8">Tuteur Excel IA</h1>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-4 min-h-[400px] max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                <FiMonitor className="w-16 h-16 mx-auto mb-4" />
                <p>Posez vos questions sur Excel ici !</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <FadeIn key={index} delay={0.1 * index}>
                  <div className={`flex items-start space-x-3 mb-4 ${
                    message.role === "assistant" ? "bg-green-50 dark:bg-green-900/20" : ""
                  } rounded-lg p-3`}>
                    {message.role === "assistant" ? (
                      <FiMonitor className="w-6 h-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <FiUser className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm ${
                        message.role === "assistant" 
                          ? "text-gray-800 dark:text-gray-200" 
                          : "text-gray-600 dark:text-gray-400"
                      }`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))
            )}
            {isLoading && (
              <FadeIn>
                <div className="flex items-center space-x-3 mb-4 bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <FiMonitor className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question ici..."
              className="flex-1 input-field"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}