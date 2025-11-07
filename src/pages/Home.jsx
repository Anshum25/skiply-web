import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

  // Hero carousel slides (placeholder content/images for now)
  const slides = useMemo(() => ([
    {
      id: 3,
      date: 'Fri, 12 Dec, 7:00 PM',
      title: 'Skip The Wait | Book Your Turn Nearby',
      subtitle: 'Reserve your place in line at restaurants, hospitals, salons, banks and more. Arrive exactly when it\'s your turn.',
      cta: 'Explore now',
      coming: 'Available in select locations',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 2,
      date: 'Open Today',
      title: 'Hospitals & Clinics | Real‑time Queues',
      subtitle: 'Check wait times, book your spot, and spend less time in waiting rooms.',
      cta: 'Explore',
      coming: 'Made partners added weekly',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 1,
      date: 'Trending',
      title: 'Dining & Salons | Book Before You Go',
      subtitle: 'Beat the rush at popular places. Simple, fast, and reliable.',
      cta: 'Browse places',
      coming: 'Experience smoother outings',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop',
    },
  ]), []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((s) => (s + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const id = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(id);
  }, [nextSlide]);

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
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
      isOpen: false
    }
    ,
    {
      id: 5,
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
      imageUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
      isOpen: true
    },
    {
      id: 8,
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
      imageUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
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
      {/* Hero Carousel */}
      <section className={`hero-carousel variant-${currentSlide}`}>
        <div className="carousel-inner">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`carousel-slide ${idx === currentSlide ? 'active' : ''}`}
              aria-hidden={idx !== currentSlide}
            >
              <div className="slide-left">
                <p className="slide-date">{slide.date}</p>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <div className="slide-cta-row">
                  <span className="slide-coming">{slide.coming}</span>
                  <button className="slide-cta" onClick={() => navigate('/')}>
                    {slide.cta}
                  </button>
                </div>
              </div>
              <div className="slide-right">
                <div className="poster">
                  <img src={slide.image} alt="highlight" />
                </div>
              </div>
            </div>
          ))}

          <button className="nav-arrow left" onClick={prevSlide} aria-label="Previous">
            ‹
          </button>
          <button className="nav-arrow right" onClick={nextSlide} aria-label="Next">
            ›
          </button>

          <div className="dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
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
                    {business.imageUrl && (
                      <div className="business-image-container">
                        <img src={business.imageUrl} alt={business.name} className="business-image" />
                        
                      </div>
                    )}
                    {!business.imageUrl && (
                      <div className="business-icon">{business.image}</div>
                    )}
                    <div className="business-detail">
                      <div className="business-info">
                        <h3 className="business-name">{business.name}</h3>
                        <p className="business-addresss">{business.address}</p>
                        <div className="business-meta">
                          <span className="rating">★ {business.rating}</span>
                          <span className="distance">{business.distance} km</span>
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
