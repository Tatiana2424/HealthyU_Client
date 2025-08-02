import React from "react";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import "./ChatBubble.scss";
import FormattedTextComponent from "../FormattedTextComponent/FormattedTextComponent";

interface ChatBubbleProps {
  role: "user" | "assistant";
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, text }) => {
  const isUser = role === "user";

  return (
    <div className={`chat-bubble ${role}`}>
      <div className="chat-bubble-header">
        {isUser ? <UserOutlined /> : <RobotOutlined />}
        <span className="chat-bubble-role">{isUser ? "You" : "Assistant"}</span>
      </div>
      <FormattedTextComponent text={text} />
    </div>
  );
};

export default ChatBubble;
