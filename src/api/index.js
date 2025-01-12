import axios from 'axios';

const API_KEY = '79b12584b5mshc3f7e2a4f82dccep169a30jsn5936c557c87b';
console.log(API_KEY);

// Function to fetch the nearest place based on coordinates
export async function getNearestPlaceByCoordinates(latitude, longitude) {
  const options = {
    method: 'GET',
    url: 'https://ai-weather-by-meteosource.p.rapidapi.com/nearest_place',
    params: {
      lat: latitude,
      lon: longitude,
      language: 'en',
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;  // This should return the place info like name, country, etc.
  } catch (error) {
    console.error('Error fetching nearest place:', error);
  }
}

// Modified getWeatherDataByCoordinates function to include place info
export async function getWeatherDataByCoordinates(
  latitude,
  longitude,
  measurementSystem,
  type = 'current'
) {
  const options = {
    method: 'GET',
    url: `https://ai-weather-by-meteosource.p.rapidapi.com/${type}`,
    params: {
      lat: latitude,
      lon: longitude,
      language: 'en',
      units: measurementSystem,
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const weatherData = response.data;

    // Now fetch the nearest place information using coordinates
    const placeData = await getNearestPlaceByCoordinates(latitude, longitude);

    return {
      weather: weatherData,  // Current weather data
      place: placeData,       // Nearest place data
    };
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
  }
}

// You can still use the getWeatherData function as is
export async function getWeatherData(
  endpoint,
  place_id,
  measurementSystem
) {
  const options = {
    method: 'GET',
    url: `https://ai-weather-by-meteosource.p.rapidapi.com/${endpoint}`,
    params: {
      place_id,
      language: 'en',
      units: measurementSystem,
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

export async function searchPlaces(text) {
  const options = {
    method: 'GET',
    url: 'https://ai-weather-by-meteosource.p.rapidapi.com/find_places',
    params: {
      text,
      language: 'en',
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error searching for places:', error);
  }
}
