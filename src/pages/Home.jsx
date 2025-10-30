import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';
import "../css/Common/globals.css";
import "../css/pages/home.css";

const Home = ({ searchQuery, setSearchQuery, location, setLocation, setOnSearch }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    distance: '',
    rating: '',
    sortBy: 'distance'
  });
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle card click to navigate to business details
  const handleCardClick = (business) => {
    navigate(`/business/${business.id}`, { state: { business } });
  };

  // Mock business data
  const mockBusinesses = [
    {
      id: 1,
      name: "City General Hospital",
      category: "hospital",
      rating: 4.5,
      distance: 0.8,
      address: "123 Main St, Downtown",
      waitTime: "15-20 min",
      queueLength: 12,
      departments: ["General", "Cardiology", "Emergency"],
      priceRange: "₹500 - ₹2000",
      image: "🏥",
      isOpen: true
    },
    {
      id: 2,
      name: "Bella Vista Restaurant",
      category: "restaurant",
      rating: 4.2,
      distance: 1.2,
      address: "456 Food Ave, Central",
      waitTime: "25-30 min",
      queueLength: 8,
      departments: ["Dining", "Takeaway", "Loans", "Customer Service", "Loans", "Customer Service",, "Loans", "Customer Service", "Loans", "Customer Service",],
      priceRange: "₹300 - ₹800",
      image: "🍽️",
      isOpen: true
    },
    {
      id: 3,
      name: "Glamour Hair Salon",
      category: "salon",
      rating: 4.7,
      distance: 0.5,
      address: "789 Beauty Blvd, Uptown",
      waitTime: "10-15 min",
      queueLength: 5,
      departments: ["Hair Cut", "Hair Color", "Styling"],
      priceRange: "₹200 - ₹1500",
      image: "💇‍♀️",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch qwwqwaadfghfttfdegyytfuywegdutuyghgtugyhhdrytgyuhurdfytgh",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service", "Lasoans", "Csaustomer Service", "Loans", "Customer Service"],
      image: "🏦",
      isOpen: false
    }
    ,
    {
      id: 4,
      name: "M",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District 321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: false
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    },
    {
      id: 4,
      name: "Metro Bank Branch",
      category: "bank",
      rating: 4.0,
      distance: 2.1,
      address: "321 Finance St, Business District",
      waitTime: "30-35 min",
      queueLength: 15,
      departments: ["Teller", "Loans", "Customer Service"],
      priceRange: "Free - ₹100",
      image: "🏦",
      isOpen: true
    }
  ];

  useEffect(() => {
    // Set default location
    if (setLocation && !location) {
      setLocation('Current Location');
    }

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
    
    // Load initial businesses
    setBusinesses(mockBusinesses);
    
    // Set search callback for navbar
    if (setOnSearch) {
      setOnSearch(() => handleSearch);
    }
  }, [setOnSearch, setLocation, location]);

  const handleSearch = (query, loc) => {
    if (setSearchQuery) setSearchQuery(query);
    if (setLocation) setLocation(loc);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockBusinesses.filter(business => {
        const matchesQuery = !query || 
          business.name.toLowerCase().includes(query.toLowerCase()) ||
          business.category.toLowerCase().includes(query.toLowerCase());
        
        const matchesLocation = !loc || loc === 'Current Location' ||
          business.address.toLowerCase().includes(loc.toLowerCase());
        
        return matchesQuery && matchesLocation;
      });
      
      setBusinesses(filtered);
      setLoading(false);
    }, 1000);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  const handleBookNow = (business) => {
    setSelectedBusiness(business);
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = (booking) => {
    console.log('Booking completed:', booking);
    // TODO: Store booking in state/localStorage or navigate to queue tracker
    alert(`Booking confirmed! Your queue position is #${booking.queuePosition}`);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedBusiness(null);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="highlight"> Skip the Wait, Book Your Spot</span>
          </h1>
          <p className="hero-subtitle">
            Reserve your place in line at restaurants, hospitals, salons, and more. 
            Track your position in real-time and arrive exactly when it's your turn.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="hospital">Hospital/Clinic</option>
                <option value="restaurant">Restaurant</option>
                <option value="salon">Salon/Spa</option>
                <option value="bank">Bank</option>
                <option value="government">Government</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Distance:</label>
              <select 
                value={filters.distance}
                onChange={(e) => handleFilterChange('distance', e.target.value)}
              >
                <option value="">Any Distance</option>
                <option value="1">Within 1 km</option>
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Sort by:</label>
              <select 
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
                <option value="waitTime">Wait Time</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Business Results */}
      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <h2>Available Businesses</h2>
            <p>{businesses.length} businesses found</p>
          </div>
          
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Searching for businesses...</p>
            </div>
          ) : (
            <div className="business-grid">
              {businesses.map(business => (
                <div 
                  key={business.id} 
                  className="business-card"
                  onClick={() => handleCardClick(business)}
                >
                  <div className="business-header">
                    <div className="business-icon">{business.image}</div>
                    <div className="business-detail">
                      <div className="business-info">
                        <h3 className="business-name">{business.name}</h3>
                        <p className="business-addresss">{business.address}</p>
                        <div className="business-meta">
                          <span className="rating">⭐ {business.rating}</span>
                          <span className="distance">📍 {business.distance} km</span>
                          <span className={`status ${business.isOpen ? 'open' : 'closed'}`}>
                            {business.isOpen ? 'Open' : 'Closed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="queue-info">
                    <div className="queue-stats">
                      <div className="stat">
                        <span className="stat-label">Wait Time</span>
                        <span className="stat-value">{business.waitTime}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Queue Length</span>
                        <span className="stat-value">{business.queueLength} people</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="departments">
                    <p className="departments-label">Departments:</p>
                    <div className="department-tags">
                      {[...new Set(business.departments)].slice(0, 4).map((dept, index) => (
                        <span key={index} className="department-tag">{dept}</span>
                      ))}
                      {[...new Set(business.departments)].length > 4 && (
                        <span className="department-tag more-indicator">+{[...new Set(business.departments)].length - 4} more</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="price-range">
                    <span className="price-label">Starting from</span>
                    <span className="price-value">{business.priceRange}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    
      {/* Booking Modal */}
    
    </div>
  );
};

export default Home;
