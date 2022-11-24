import Select from 'react-select';
import { LanguageDropdown } from './LanguageDropdown';



export function SideBar(): any {
  return (
    <>
      <ul>
      {new Array(5).fill(0).map((el) => {
      return <li id="sideBarItems"><button>Button</button></li>
      })}
      </ul>
    </>

  )
}

