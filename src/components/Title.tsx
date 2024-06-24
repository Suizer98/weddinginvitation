import { styled } from '@stitches/react'
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

import { ConfigsType } from '../configs'

const Section = styled('section', {
  height: '100vh', // Ensure the section takes the full viewport height
  background: '#DADADA',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const BackgroundImage = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center 75%',
  // filter: 'blur(8px)',
  zIndex: 0
})

const Layout = styled('div', {
  color: '#5D4037',
  textAlign: 'center',
  animation: 'fadein 2.5s',
  background: 'rgba(255, 255, 255, 0.7)',
  padding: '1em 2em',
  borderRadius: '8px',
  zIndex: 1,
  position: 'relative'
})

const TitleLayout = styled('p', {
  fontSize: '3.5em',
  margin: 0,
  fontWeight: '500',
  fontFamily: 'Great Vibes, cursive'
})

const SubTitleLayout = styled('p', {
  fontSize: '2.5em',
  margin: '24px 0',
  fontWeight: '300',
  fontFamily: 'Great Vibes, cursive'
})

type TitleProps = {
  config: ConfigsType
  showDetails: boolean
}

const Title = ({ config, showDetails }: TitleProps) => {
  const { width, height } = useWindowSize()
  const [extraConfetti, setExtraConfetti] = useState(false)

  useEffect(() => {
    if (showDetails) {
      setExtraConfetti(true)
      setTimeout(() => setExtraConfetti(false), 3000) // Show extra confetti for 3 seconds
    }
  }, [showDetails])

  return (
    <>
      {showDetails && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={100}
          gravity={0.05}
          colors={['#FFCDD2', '#F8BBD0', '#D1C4E9', '#F5838F']}
          recycle={true}
          style={{ position: 'fixed' }}
        />
      )}
      {extraConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          initialVelocityX={{ min: -50, max: 50 }}
          initialVelocityY={{ min: -50, max: 50 }}
          recycle={false}
          style={{ position: 'fixed' }}
        />
      )}
      <Section>
        <BackgroundImage style={{ backgroundImage: `url(${config.titleImage})` }} />
        <Layout>
          <SubTitleLayout>Wedding Invitation</SubTitleLayout>
          <TitleLayout>
            {config.groom.name} &amp; {config.bride.name}
          </TitleLayout>
        </Layout>
      </Section>
    </>
  )
}

export default Title
