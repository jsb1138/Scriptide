import { useNavigate } from "react-router-dom";
import "./SliderItem.css";

interface IProps {
  item: string;
  isOpen: boolean;
}

export default function SliderItem({ item, isOpen }: IProps) {
  const navigate = useNavigate();

  function handleClick() {
    const path = item.toLowerCase();
    navigate(path);
  }
  return (
    <div
      // className={`item ${isOpen ? 'shown' : 'hidden'}`}
      onClick={handleClick}
    >
      <h3>{item}</h3>
    </div>
  );
}
