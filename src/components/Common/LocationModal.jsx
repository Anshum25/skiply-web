import React, { useState, useEffect } from 'react';
import { locationAPI } from '../../services/api';
import '../../css/Common/location-modal.css';

const LocationModal = ({ isOpen, onClose, onLocationSelect, currentLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allCities, setAllCities] = useState([]);
  const [groupedCities, setGroupedCities] = useState({});
  const [popularCities, setPopularCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState('');

  // Fetch cities on mount
  useEffect(() => {
    if (isOpen) {
      fetchCities();
      fetchPopularCities();
    }
  }, [isOpen]);

  // Filter cities when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allCities.filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [searchQuery, allCities]);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await locationAPI.getAllCities();
      if (response.success) {
        setAllCities(response.data.cities);
        setGroupedCities(response.data.groupedCities);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularCities = async () => {
    try {
      const response = await locationAPI.getPopularCities();
      if (response.success) {
        setPopularCities(response.data.cities);
      }
    } catch (error) {
      console.error('Error fetching popular cities:', error);
    }
  };

  const handleUseCurrentLocation = () => {
    setLoadingLocation(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await locationAPI.getCurrentLocation(latitude, longitude);
          
          if (response.success) {
            const city = response.data.city;
            onLocationSelect(city);
            onClose();
          }
        } catch (error) {
          console.error('Error fetching location:', error);
          alert('Failed to get your location. Please select manually.');
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to access your location. Please enable location services and try again.');
        setLoadingLocation(false);
      }
    );
  };

  const handleCitySelect = (city) => {
    onLocationSelect(city);
    onClose();
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isOpen) return null;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="location-modal-overlay" onClick={onClose}>
      <div className="location-modal" onClick={(e) => e.stopPropagation()}>
        <div className="location-modal-header">
          <h2>Select Location</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="location-modal-content">
          {/* Search Bar */}
          <div className="location-search">
            <input
              type="text"
              placeholder="Search city, area or locality"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="location-search-input"
            />
          </div>

          {/* Use Current Location */}
          <button 
            className="current-location-button"
            onClick={handleUseCurrentLocation}
            disabled={loadingLocation}
          >
            <span className="location-icon">📍</span>
            {loadingLocation ? 'Getting location...' : 'Use Current Location'}
          </button>

          {/* Search Results */}
          {searchQuery && filteredCities.length > 0 && (
            <div className="search-results">
              <h3>Search Results</h3>
              <div className="city-list">
                {filteredCities.map((city, index) => (
                  <div
                    key={index}
                    className="city-item"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!searchQuery && (
            <>
              {/* Popular Cities */}
              {popularCities.length > 0 && (
                <div className="popular-cities-section">
                  <h3>Popular Cities</h3>
                  <div className="popular-cities-grid">
                    {popularCities.map((city, index) => (
                      <div
                        key={index}
                        className="popular-city-card"
                        onClick={() => handleCitySelect(city.name)}
                      >
                        <span className="city-icon">{city.icon}</span>
                        <span className="city-name">{city.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Cities */}
              <div className="all-cities-section">
                <h3>All Cities</h3>
                
                {/* Alphabet Navigation */}
                <div className="alphabet-nav">
                  {alphabet.map((letter) => (
                    <button
                      key={letter}
                      className={`alphabet-letter ${groupedCities[letter] ? 'active' : 'disabled'} ${selectedLetter === letter ? 'selected' : ''}`}
                      onClick={() => groupedCities[letter] && handleLetterClick(letter)}
                      disabled={!groupedCities[letter]}
                    >
                      {letter}
                    </button>
                  ))}
                </div>

                {/* Cities List */}
                <div className="cities-list-container">
                  {loading ? (
                    <div className="loading-cities">Loading cities...</div>
                  ) : (
                    Object.keys(groupedCities).sort().map((letter) => (
                      <div key={letter} id={`letter-${letter}`} className="letter-group">
                        <h4 className="letter-heading">{letter}</h4>
                        <div className="cities-in-group">
                          {groupedCities[letter].map((city, index) => (
                            <div
                              key={index}
                              className="city-item"
                              onClick={() => handleCitySelect(city)}
                            >
                              {city}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
