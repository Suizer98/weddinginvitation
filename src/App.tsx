import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import Greeting from './components/Greeting';
import TitleLayout from './components/Title';
import Location from './components/Location';
import CongratulatoryMoney from './components/CongratulatoryMoney';
import Configs from './configs';
import Share from './components/Share';
import { Layout, Button } from 'antd';

const { Footer } = Layout;

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  useEffect(() => {
    // Start playing music when showDetails becomes true
    if (showDetails) {
      const audio = new Audio(Configs.music);
      audio.loop = true;

      // Play the audio
      audio.play().catch((error) => {
        // Handle errors, e.g., autoplay is prevented
        console.error('Error playing music:', error.message);
      });

      // Cleanup function
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [showDetails]);

  const handleShowDetails = () => {
    setShowDetails(true);

    // Set a timer to hide the button after a delay (e.g., 500ms)
    setTimeout(() => {
      setButtonVisible(false);
      
      // Scroll to the Greeting section
      const greetingSection = document.getElementById('greeting-section');
      if (greetingSection) {
        greetingSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }, 500);
  };

  const footerStyles: React.CSSProperties = {
    background: '#D7CCC8',
    opacity: 1,
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    transition: 'opacity 0.5s', // Apply a transition effect to opacity
  };

  return (
    <main style={{ height: '100%' }}>
      <TitleLayout config={Configs} showDetails={showDetails} />
      {showDetails && (
        <>
          <Greeting id="greeting-section" config={Configs} />
          <Gallery config={Configs} />
          <Location config={Configs} />
          <CongratulatoryMoney config={Configs} />
          <Share config={Configs} />
        </>
      )}
      <div>
        <Footer style={showDetails ? { ...footerStyles, opacity: 0.6 } : footerStyles}>
          {buttonVisible && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                style={{
                  background: '#E1306C',
                  borderColor: '#E1306C',
                  opacity: showDetails ? 0 : 1, // Adjust opacity based on showDetails
                }}
                onClick={handleShowDetails}
                type="primary"
              >
                Reveal Details
              </Button>
            </div>
          )}
          {!buttonVisible && "Sui Zer & Lycia's Wedding"}
        </Footer>
      </div>
    </main>
  );
}

export default App;
