import { Button, Layout } from 'antd'
import React, { useState } from 'react'

import Fill from './components/Fill'
import Gallery from './components/Gallery'
import Greeting from './components/Greeting'
import Introduction from './components/Introduction'
import Location from './components/Location'
import MusicPlayer from './components/MusicPlayer'
import Share from './components/Share'
import TitleLayout from './components/Title'
import Configs from './configs'

const { Footer } = Layout

function App() {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(true)

  const handleShowDetails = () => {
    setShowDetails(true)

    setTimeout(() => {
      setButtonVisible(false)

      const desiredSection = document.getElementById('music-section')
      if (desiredSection) {
        const start = window.scrollY
        const end = desiredSection.offsetTop
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
          <MusicPlayer id="music-section" config={Configs} showDetails={showDetails} />
          <Greeting id="greeting-section" config={Configs} />
          <Introduction config={Configs} />
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
                  background: '#B7A586',
                  borderColor: '#B7A586',
                  color: '#795548',
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
