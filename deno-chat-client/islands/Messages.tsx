/** @jsx h */
import { h } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface Message {
  text: string;
}

export default function Messages() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const getMessages = useCallback(async () => {
    const res = await fetch("https://gregmercer-jherr-deno-chat.deno.dev/messages");
    const data = await res.json();
    setMessages(data);
  }, []);

  const onSendMessage = useCallback(async () => {
    await fetch("https://gregmercer-jherr-deno-chat.deno.dev/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });
    setText("");
    getMessages();
  }, [text]);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
      <div>{JSON.stringify(messages)}</div>
      <input
        type="text"
        value={text}
        onChange={(evt) => setText(evt.target.value)}
      />
      <button onClick={onSendMessage}>Add</button>
    </div>
  );
}
