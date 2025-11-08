import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import BusinessDetails from "./pages/BusinessDetails";
import BusinessPanel from "./features/business-panel/pages/BusinessPanel";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/Common/Loader";
import "./App.css";

// Component to handle conditional navbar/footer rendering
function AppContent() {
  const location = useLocation();
  
  // Search state for navbar
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [onSearch, setOnSearch] = useState(null);

  // Check if current route is Business Panel (including nested routes)
  const isBusinessPanel = location.pathname.startsWith('/business-panel');

  return (
    <>
      {!isBusinessPanel && (
        <Navbar 
          onSearch={onSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={searchLocation}
          setLocation={setSearchLocation}
        />
      )}
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              location={searchLocation}
              setLocation={setSearchLocation}
              setOnSearch={setOnSearch}
            />
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
        <Route path="/business-panel/*" element={<BusinessPanel />} />
        {/* TODO: Add more routes */}
        {/* <Route path="/search" element={<BusinessSearch />} /> */}
      </Routes>
      {!isBusinessPanel && <Footer />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate initial load (you can replace with real data check later)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Reduced loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <AppContent />
      )}
    </Router>
  );
}

export default App;
