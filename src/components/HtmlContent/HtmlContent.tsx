import React from "react";

interface HtmlContentProps {
  htmlString: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default HtmlContent;
