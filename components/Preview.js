import ReactMarkdown from "react-markdown";

function Preview({ rawBody, title }) {
  return (
    <ReactMarkdown>
      <h1>{title}</h1>
      {rawBody}
    </ReactMarkdown>
  );
}

export default Preview;
