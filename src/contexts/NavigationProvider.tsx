/* Routing Variables */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Slider for display of routes */
import Slider from '../components/navBarComponents/Slider';

/* Components for Navigation*/
import Home from '../components/navBarComponents/Home';
import Profile from '../components/navBarComponents/Profile';
import Dashboard from '../components/navBarComponents/Dashboard';
import Settings from '../components/navBarComponents/Settings';

/* Props Interface */
interface INavigationProviderProps {
  children: JSX.Element | JSX.Element[];
}

/* Component Dictonary Type */
type ComponentDict = {
  [key: string]: JSX.Element;
};

/* Components Dictionary to create Routes. Substitute with your components */
export const components: ComponentDict = {
  Home: <Home />,
  Profile: <Profile />,
  Dashboard: <Dashboard />,
  Settings: <Settings />,
};

export default function NavigationProvider({
  children,
}: INavigationProviderProps) {
  return (
    <Router>
      <Slider />
      {children}
      <Routes>
        {Object.keys(components).map((key, index) => (
          <Route
            key={`${key}-${index}-route`}
            path={key.toLowerCase()}
            element={components[key]}
          />
        ))}
      </Routes>
    </Router>
  );
}
