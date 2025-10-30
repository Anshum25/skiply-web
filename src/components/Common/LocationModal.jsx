import React, { useState } from 'react';
import Popup from './Popup';
import InputField from './InputField';
import '../../css/Common/location-modal.css';

const LocationModal = ({ isOpen, onClose, onLocationSelect, currentLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(currentLocation || '');

  // Popular cities data
  const popularCities = [
    { name: 'Ahmedabad', icon: '🏢' },
    { name: 'Bangalore', icon: '🏢' },
    { name: 'Chandigarh', icon: '🏢' },
    { name: 'Chennai', icon: '🏢' },
    { name: 'Delhi NCR', icon: '🏢' },
    { name: 'Goa', icon: '🏖️' },
    { name: 'Hyderabad', icon: '🏢' },
    { name: 'Kolkata', icon: '🏢' },
    { name: 'Mumbai', icon: '🏢' },
    { name: 'Pune', icon: '🏢' }
  ];

  // All cities data (sample)
  const allCities = [
    'Abohar', 'Abu Road', 'Achampet', 'Acharapakkam',
    'Adilabad', 'Adilabad', 'Adipur', 'Adoni',
    'Agar', 'Agartala', 'Agra', 'Ahmedabad',
    'Ahmednagar', 'Ahmednagar', 'Ajmer', 'Akividu',
    'Akola', 'Alappuzha', 'Aligarh', 'Alirajpur',
    'Allahabad', 'Almora', 'Alwar', 'Amallapuram',
    'Ambala', 'Ambarnath', 'Amravati', 'Amreli',
    'Amritsar', 'Anand', 'Anantapur', 'Ankleshwar',
    // Add more cities as needed
  ];

  const filteredCities = allCities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
    onClose();
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = 'Current Location';
          setSelectedLocation(location);
          onLocationSelect(location);
          onClose();
        },
        (error) => {
          console.log('Location access denied');
          alert('Unable to access your location. Please select manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const alphabetGroups = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Select Location"
      size="large"
      className="location-modal"
    >
      <div className="location-modal-content">
        {/* Search Input */}
        <InputField
          type="text"
          placeholder="Search city, area or locality"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon="🔍"
          className="location-search"
        />

        {/* Use Current Location Button */}
        <button className="current-location-btn" onClick={handleUseCurrentLocation}>
          <span className="location-icon">📍</span>
          Use Current Location
        </button>

        {!searchQuery && (
          <>
            {/* Popular Cities */}
            <div className="popular-cities-section">
              <h3>Popular Cities</h3>
              <div className="popular-cities-grid">
                {popularCities.map((city, index) => (
                  <button
                    key={index}
                    className="city-card"
                    onClick={() => handleLocationSelect(city.name)}
                  >
                    <span className="city-icon">{city.icon}</span>
                    <span className="city-name">{city.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Alphabet Filter */}
            <div className="alphabet-section">
              <h3>All Cities</h3>
              <div className="alphabet-filter">
                {alphabetGroups.map(letter => (
                  <button key={letter} className="alphabet-btn">
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Cities List */}
        <div className="cities-list">
          {(searchQuery ? filteredCities : allCities.slice(0, 50)).map((city, index) => (
            <button
              key={index}
              className="city-item"
              onClick={() => handleLocationSelect(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </Popup>
  );
};

export default LocationModal;
