// ./app/page.js
"use client";

import React from "react";
import { useChat } from "ai/react";
import { Toaster, toast } from "sonner";
import { IconRobot, IconUser, IconSend, IconCopy } from "@tabler/icons-react";

export default function Chat() {
  const [message, setmessage] = React.useState("");
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      message,
    },
  });

  const onSubmit = (e: any) => {
    handleSubmit(e);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between max-w-4xl w-full mx-auto border-l border-r">
        <div className="relative flex flex-col gap-2 w-full z-[-1] overflow-y-auto">
          <p className="text-xl font-semibold p-3 border-b">Playground</p>
          {messages.map((m) => (
            <div key={m.id}>
              <div className="px-4 py-1 text-sm flex gap-2">
                <div>
                  <div
                    className={`w-6 h-6 grid place-content-center ${
                      m.role === "user" ? "bg-black" : "bg-green-400"
                    } ${
                      m.role === "user" ? "text-white" : "text-black"
                    } rounded-md`}
                  >
                    {m.role === "user" ? (
                      <IconUser size={16} />
                    ) : (
                      <IconRobot size={16} />
                    )}
                  </div>
                </div>
                {m.content}{" "}
                {m.role !== "user" && (
                  <div
                    className="cursor-copy"
                    onClick={() => {
                      navigator.clipboard.writeText(m.content);
                      toast("copied!");
                    }}
                  >
                    <IconCopy
                      size={20}
                      className="text-gray-600"
                      stroke={1.4}
                    />
                  </div>
                )}
              </div>
              <div className="border-t mx-auto w-full max-w-lg" />
            </div>
          ))}
        </div>

        <div className="mb-0 w-full ">
          <form
            onSubmit={onSubmit}
            className="w-full flex items-end border-t gap-2 sticky bottom-0 p-3"
          >
            <input
              className="w-full rounded-md border border-gray-800 py-2 px-4 shadow-sm focus:border-black focus:ring-black"
              value={input}
              placeholder="write prompt here"
              onChange={(e) => {
                handleInputChange(e);
                setmessage(e.target.value);
              }}
            />
            <button
              type="submit"
              disabled={!input}
              className={`bg-green-400 text-black-700 whitespace-nowrap h-10 px-3 py-2 text-sm rounded-md ${
                !input ? "opacity-50" : "opacity-100"
              }`}
            >
              <IconSend />
            </button>
          </form>
        </div>
      </main>
      <Toaster position="bottom-center" />
    </>
  );
}
