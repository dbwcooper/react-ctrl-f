import React, { useEffect } from 'react';
import Prism from 'prismjs';
// import "prismjs/plugins/line-numbers/prism-line-numbers";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface props {
  children: string;
  [propName: string]: any;
}
const CodePreview = ({ children, ...rest }: props) => {
  const highlightCode = Prism.highlight(
    children,
    Prism.languages.jsx,
    'tomorrow'
  );
  const refObj = React.useRef<HTMLPreElement>(null);
  useEffect(() => {
    if (refObj && refObj.current) {
      Prism.highlightAllUnder(refObj.current!);
    }
  }, [children]);
  return (
    <div style={{ width: 600 }} {...rest}>
      <pre className="line-numbers language-jsx" data-line="1" style={{ color: 'red' }} data-start="0" ref={refObj}>
        <code
          className="language-jsx"
          dangerouslySetInnerHTML={{ __html: highlightCode }}
        />
      </pre>
    </div>
  );
};

export default CodePreview;
