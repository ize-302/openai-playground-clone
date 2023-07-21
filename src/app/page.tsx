// ./app/page.js
"use client";
import "regenerator-runtime";

import React from "react";
import { useChat } from "ai/react";
import { Toaster, toast } from "sonner";
import {
  IconRobot,
  IconUser,
  IconSend,
  IconCopy,
  IconMicrophone,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Chat() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const [message, setmessage] = React.useState("");

  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      body: {
        message,
      },
    });

  const onSubmit = (e: any) => {
    handleSubmit(e);
  };

  React.useEffect(() => {
    setInput(transcript);

    if (listening) {
      toast("Listening...");
    }
  }, [listening]);

  React.useEffect(() => {
    if (!isMicrophoneAvailable) {
      toast.error("Microphone not available");
    } else if (!browserSupportsSpeechRecognition) {
      toast.error("Browser doesn't support speech recognition");
    }
  }, []);

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
            <div className="flex w-full rounded-md border border-gray-800 py-2 px-4 shadow-sm focus:border-black focus:ring-black">
              <input
                className="w-full outline-none"
                value={input || message}
                placeholder={listening ? "Listening..." : "write prompt here"}
                onChange={(e) => {
                  handleInputChange(e);
                  setmessage(e.target.value);
                }}
              />
              <button
                className="bg-black rounded-md w-8 h-8 grid place-content-center"
                type="button"
                onClick={() => {
                  !listening
                    ? SpeechRecognition.startListening()
                    : SpeechRecognition.stopListening();
                }}
              >
                {listening ? (
                  <IconPlayerStopFilled size={20} className="text-red-600" />
                ) : (
                  <IconMicrophone size={20} className="text-white" />
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Toaster position="top-center" />
    </>
  );
}
