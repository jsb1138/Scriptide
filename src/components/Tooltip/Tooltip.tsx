import "./Tooltip.css"
import { useScriptideContext } from '../../contexts/ScriptideProvider';
import { useState } from 'react';


interface Props {
  content: string;
  children: React.ReactNode;
}

function Tooltip({content, children}: Props) {
  let timeout: NodeJS.Timeout;
  const [ active, setActive]  = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 100);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className="tooltip-tip">
          {content}
        </div>
      )}
    </div>
  );
}

export default Tooltip