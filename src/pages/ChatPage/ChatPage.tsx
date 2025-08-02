import React, { useState, useCallback } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import "./ChatPage.scss";
import ChatBubble from "../../components/ChatComponent/ChatBubble";
import { RobotOutlined, SendOutlined } from "@ant-design/icons";
import BouncingDotsLoader from "../../components/common/BouncingDotsLoader/BouncingDotsLoader";
import apiService from "../../api/apiService";

interface Message {
  sender: "user" | "assistant";
  content: string;
}

const ChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { TextArea } = Input;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const sendMessage = useCallback(async () => {
    if (input.trim()) {
      const newMessage: Message = { sender: "user", content: input };
      setMessages([...messages, newMessage]);
      let sendInput = input;
      setInput("");
      setIsLoading(true);
      setIsDisable(true);

      try {
        const response = await apiService.post<string>("OpenAI/GetAnswer", {
          text: sendInput,
        });

        const replyMessage: Message = {
          sender: "assistant",
          content: response,
        };
        setMessages((currentMessages) => [...currentMessages, replyMessage]);
      } catch (error) {
        console.error("Error while sending message:", error);
      }

      setIsLoading(false);
      setIsDisable(false);
    }
  }, [input, messages]);

  return (
    <>
      <div className="chat-page">
        <div className="message-list">
          {messages.map((msg) => (
            <ChatBubble role={msg.sender} text={msg.content} />
          ))}
          {(!messages || messages.length === 0) && (
            <div className="empty-messages"></div>
          )}
          {isLoading && (
            <div className="chat-bubble assistant">
              <div className="chat-bubble-header">
                <RobotOutlined />
                <span className="chat-bubble-role">Assistant</span>
              </div>
              <BouncingDotsLoader />
            </div>
          )}
        </div>
        <div className="message-input">
          <TextArea
            className="custom-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
          <Button
            onClick={sendMessage}
            type="primary"
            icon={<SendOutlined style={{ fontSize: "24px" }} />}
            disabled={isDisable}
          />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
