import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  // Redirect to /notes after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/notes');
    }, 1000); // 1.5 seconds delay
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <img 
        src="/Images/Samsung_Notes_icon.png" 
        alt="App Logo" 
        style={styles.logo} 
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full screen height
    backgroundColor: '#FFFFFF', // White background
    animation: 'fadeIn 1s ease-out', // Container fade-in animation
  },
  logo: {
    height: '170px', 
    width: '170px',
    animation: 'scaleUp 1.5s ease-in-out', // Scale-up animation for the logo
  }
};

// CSS Animations
const cssAnimation = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes scaleUp {
    0% { transform: scale(0.8); }
    100% { transform: scale(1); }
  }
`;

// Inject the CSS animation styles without the deprecated `type` attribute
const styleSheet = document.createElement("style");
styleSheet.innerText = cssAnimation;
document.head.appendChild(styleSheet);

export default SplashScreen;
