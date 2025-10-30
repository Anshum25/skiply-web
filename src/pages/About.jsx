import React from 'react';
import '../css/pages/about.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>About Skiply</h1>
          <p>Revolutionizing queue management for businesses and customers</p>
        </div>

        <div className="about-content">
          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>
              At Skiply, we believe that waiting in long queues is a thing of the past. 
              Our innovative queue management platform connects businesses with customers, 
              providing real-time updates and seamless booking experiences.
            </p>
          </section>

          <section className="features-section">
            <h2>Why Choose Skiply?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h3>Real-time Updates</h3>
                <p>Get live queue status and estimated wait times</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <h3>Easy Booking</h3>
                <p>Book your spot in advance from anywhere</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <h3>Smart Matching</h3>
                <p>Find the right business for your needs</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💼</div>
                <h3>Business Tools</h3>
                <p>Comprehensive dashboard for business owners</p>
              </div>
            </div>
          </section>

          <section className="team-section">
            <h2>Our Team</h2>
            <p>
              We're a passionate team of developers, designers, and business experts 
              dedicated to making queue management effortless for everyone.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
