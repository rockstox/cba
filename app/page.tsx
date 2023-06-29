"use client";

import { useChat } from "ai/react";
import { setHttpClientAndAgentOptions } from "next/dist/server/config";
import { useState } from "react";

export default function Home() {
  const { messages, input, handleInputChange, setInput, handleSubmit } = useChat(); 
  const [promptValue, setPromptValue] = useState("");

  const examplePrompts = [
    "What is the salary cap for the new season?",
    "Explain the luxury tax in the new NBA CBA.",
    "What changes were made in player trades?",
    "Can a team use the Non-Taxpayer Mid-Level Salary Exception to sign a player who was previously waived by another team during the same Salary Cap Year?"
  ];

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };


  return (
    <div className="mx-auto w-full max-w-[600px] py-2 sm:py-10 flex flex-col stretch text-neutral-50 px-2">
      <div className="text-center">
        <div className="text-4xl font-bold">Explore the new NBA CBA</div>
        <div className="mt-3 text-xl">Interact with AI to understand the latest 676-page NBA Collective Bargaining Agreement (CBA).</div>
      </div>

      {messages.length === 0 && (
        <div className="my-5">
        <div className="text-2xl text-center font-bold mb-4">Example Prompts</div>
        {examplePrompts.map((prompt, i) => (
          <button
            key={i}
            className="bg-gray-300 hover:bg-gray-400 text-black font-medium p-2 rounded mb-2 w-full text-left"
            onClick={() => handlePromptClick(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
      )}
      
      {messages.length > 0 && (
        <div className="flex flex-col mt-y border-b-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-[40px] flex justify-center mb-4"
            onClick={() => window.location.reload()}
          >
            Ask Another Question
          </button>

          {messages.map((m) => (
            <div
              key={m.id}
              className="flex border-t-2 py-4"
            >
              <div className="font-bold w-[60px]">{m.role === "user" ? "You" : "AI"}:</div>
              <div className="ml-2 whitespace-pre-wrap w-full">{m.content}</div>
            </div>
          ))}
        </div>
      )}

      <form
        className="flex fixed bottom-0 sm:bottom-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-[280px] sm:w-[500px] border border-gray-300 rounded mb-8 shadow-xl p-2 text-black"
          placeholder="Ask a question about the new NBA CBA..."
          type="text"
          value={input}
          onChange={handleInputChange}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-[40px] ml-2"
          type="submit"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
