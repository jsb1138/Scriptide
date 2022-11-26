import '../../App.css';
import NavigationProvider from '../../contexts/NavigationProvider';
function NavBar() {
  return (
    <div className='main-container'>
      <NavigationProvider>{/*  children  */}</NavigationProvider>
    </div>
  );
}

export default NavBar;
