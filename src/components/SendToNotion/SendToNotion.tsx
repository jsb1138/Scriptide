import './SendToNotion.css';
import { useScriptideContext } from '../../contexts/ScriptideProvider';
import NotionLogo from '../../assets/Notion_app_logo.png';

function SendToNotion() {
  const { notionModalIsOpen, setNotionModalIsOpen } = useScriptideContext();

  function handleClick() {
    setNotionModalIsOpen(!notionModalIsOpen);
  }

  return (
    <div id='send-to-notion'>
      <img
        id='notion-logo'
        src={NotionLogo}
        alt='Notion Logo'
        onClick={handleClick}
      />
    </div>
  );
}

export default SendToNotion;
