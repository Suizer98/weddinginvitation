import { styled } from '@stitches/react'
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import Resizer from 'react-image-file-resizer'
import { useWindowSize } from 'react-use'

import { ConfigsType } from '../configs'

const isPortrait = window.matchMedia('(orientation: portrait)').matches

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
  backgroundPosition: isPortrait ? 'center left 72%' : 'center 15%',
  // filter: 'blur(8px)',
  zIndex: 0
})

const Layout = styled('div', {
  color: '#5D4037',
  textAlign: 'center',
  animation: 'fadein 1.5s',
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

type FirstProps = {
  config: ConfigsType
  showDetails: boolean
}

const First = ({ config, showDetails }: FirstProps) => {
  const { width, height } = useWindowSize()
  const [extraConfetti, setExtraConfetti] = useState(false)
  const [resizedImage, setResizedImage] = useState<string | null>(null)

  useEffect(() => {
    if (showDetails) {
      setExtraConfetti(true)
      setTimeout(() => setExtraConfetti(false), 5000)
    }
  }, [showDetails])

  useEffect(() => {
    const fetchImageAsBlob = async (imageUrl: string) => {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      return blob
    }

    const resizeImage = (imageBlob: Blob) => {
      Resizer.imageFileResizer(
        imageBlob,
        1600, // max width
        1200, // max height
        'JPEG', // format
        100, // quality
        0, // rotation
        (uri) => {
          setResizedImage(uri as string)
        },
        'base64'
      )
    }

    fetchImageAsBlob(config.titleImage).then(resizeImage)
  }, [config.titleImage])

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
          numberOfPieces={200}
          initialVelocityX={{ min: -50, max: 50 }}
          initialVelocityY={{ min: -50, max: 50 }}
          recycle={false}
          style={{ position: 'fixed' }}
        />
      )}
      <Section>
        <BackgroundImage style={{ backgroundImage: `url(${resizedImage || config.titleImage})` }} />
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

export default First
