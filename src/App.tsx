import { Button, Layout } from 'antd'
import React, { useEffect, useState } from 'react'

import Fill from './components/Fill'
import Gallery from './components/Gallery'
import Greeting from './components/Greeting'
import Location from './components/Location'
import Share from './components/Share'
import TitleLayout from './components/Title'
import Configs from './configs'

const { Footer } = Layout

function App() {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(true)

  useEffect(() => {
    // Start playing music when showDetails becomes true
    if (showDetails) {
      const audio = new Audio(Configs.music)
      audio.loop = true

      // Play the audio
      audio.play().catch((error) => {
        // Handle errors, e.g., autoplay is prevented
        console.error('Error playing music:', error.message)
      })

      // Cleanup function
      return () => {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [showDetails])

  const handleShowDetails = () => {
    setShowDetails(true)

    // Set a timer to hide the button after a delay (e.g., 500ms)
    setTimeout(() => {
      setButtonVisible(false)

      // Scroll to the Greeting section
      const greetingSection = document.getElementById('greeting-section')
      if (greetingSection) {
        const start = window.scrollY
        const end = greetingSection.offsetTop
        const distance = end - start
        const duration = 1000
        const startTime = performance.now()

        const step = (time: any) => {
          const elapsed = time - startTime
          const progress = Math.min(elapsed / duration, 1)
          window.scrollTo(0, start + distance * progress)

          if (progress < 1) {
            requestAnimationFrame(step)
          }
        }

        requestAnimationFrame(step)
      }
    }, 500)
  }

  const footerStyles: React.CSSProperties = {
    background: '#D7CCC8',
    opacity: 0.8,
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    transition: 'opacity 0.5s',
    fontFamily: 'Bad Script'
  }

  return (
    <main style={{ height: '100%' }}>
      <TitleLayout config={Configs} showDetails={showDetails} />
      {showDetails && (
        <>
          <Greeting id="greeting-section" config={Configs} />
          <Gallery config={Configs} />
          <Location config={Configs} />
          <Fill config={Configs} />
          <Share config={Configs} />
        </>
      )}
      <div>
        <Footer
          style={
            showDetails
              ? { ...footerStyles, opacity: 0.6, fontFamily: 'Great Vibes, cursive', fontSize: 20 }
              : footerStyles
          }
        >
          {buttonVisible && (
            <div>
              <Button
                style={{
                  background: '#F5838F',
                  borderColor: '#F5838F',
                  opacity: showDetails ? 0 : 1,
                  padding: '0px 30px',
                  fontSize: 20
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
  )
}

export default App
