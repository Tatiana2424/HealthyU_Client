import React from "react";
import ReactMarkdown from "react-markdown";

interface FormattedTextComponentProps {
  text: string;
}

const FormattedTextComponent: React.FC<FormattedTextComponentProps> = ({
  text,
}) => {
  return <ReactMarkdown>{text}</ReactMarkdown>;
};

export default FormattedTextComponent;
