import { useContext } from 'react';
import WeatherContext from '../context/weather.context';
import Place from './Place';
import Search from './Search';
import Settings from './Settings';
import '../styles/components/Header.scss';

function Header() {
  const { fetchWeatherByCoordinates } = useContext(WeatherContext);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          fetchWeatherByCoordinates(coords.latitude, coords.longitude);
        },
        (error) => {
          console.error('Error fetching location', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (

    <div className="Header">
      <Search />
      <Place />
      <button className="get-location-btn" onClick={handleGetLocation}>
        Get Current Location
      </button>


      <Settings />
    </div>
  );
}

export default Header;
