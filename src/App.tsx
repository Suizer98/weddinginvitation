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

  const handleShowDetails = () => {
    setShowDetails(true);
  }

  useEffect(() => {
    // Start playing music when showDetails becomes true
    if (showDetails) {
      const audio = new Audio('./resources/music.mp3');
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

  return (
    <main style={{ height: '100%' }}>
      <TitleLayout config={Configs} />
      {!showDetails && (
        <div>
        <Footer
          style={{
            background: '#D7CCC8',
            opacity: 1,
            textAlign: 'center',
            position: 'fixed',
            bottom: 0,
            width: '100%',
          }}
        >
          <Button onClick={handleShowDetails} type="primary">
            Show Details
          </Button>
        </Footer>
        </div>
      )}

      {showDetails && (
        <>
          <Greeting config={Configs} />
          <Gallery config={Configs} />
          <Location config={Configs} />
          <CongratulatoryMoney config={Configs} />
          <Share config={Configs} />
          <Footer
            style={{
              background: '#D7CCC8',
              opacity: 0.6,
              textAlign: 'center',
              position: 'fixed',
              bottom: 0,
              width: '100%',
            }}
          >
            Sui Zer & Lycia's Wedding
          </Footer>
        </>
      )}
    </main>
  );
}

export default App;
