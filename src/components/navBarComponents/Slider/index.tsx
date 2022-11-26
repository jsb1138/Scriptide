import { useState } from 'react';
import { components } from '../../../contexts/NavigationProvider';
import MenuIcon from '../MenuIcon';
import SliderItem from '../SliderItem';
import './Slider.css';
export default function Slider() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleSlider() {
    setIsOpen(!isOpen);
  }

  return (
    <div className='main-slider-container'>
      <div className={`slider-container ${isOpen ? 'open' : 'closed'}`}>
        {Object.keys(components).map((item, index) => (
          <SliderItem
            key={`${item.toLowerCase()}-${index}`}
            item={item}
            isOpen={isOpen}
          />
        ))}
      </div>
      <div>
        <div className='button' onClick={toggleSlider}>
          <MenuIcon />
        </div>
      </div>
    </div>
  );
}
