import { styled } from '@stitches/react'
import React, { useEffect, useRef, useState } from 'react'
import Resizer from 'react-image-file-resizer'

import { ConfigsType } from '../configs'
import useOnScreen from '../hooks/useOnScreen'

const Container = styled('div', {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  overflowX: 'hidden'
})

const TitleContainer = styled('div', {
  width: '100%',
  textAlign: 'center',
  marginBottom: '2rem'
})

const Title = styled('h1', {
  color: '#B65D3E',
  fontFamily: 'Great Vibes, cursive',
  fontSize: '3.5rem',
  margin: '0 0 1rem 0'
})

const ProfileContainer = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '2rem'
})

const Profile = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 2rem'
})

const Image = styled('img', {
  width: '250px',
  height: 'auto',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '1rem'
})

const Name = styled('h3', {
  color: '#B65D3E',
  fontFamily: 'Bad Script',
  fontSize: '1.5rem',
  margin: '0.5rem 0'
})

const SubTitle = styled('h2', {
  color: '#B65D3E',
  fontFamily: 'Bad Script, cursive',
  fontSize: '2rem',
  margin: '0 0 1rem 0',
  textAlign: 'center'
})

type IntroductionProps = {
  config: ConfigsType
}

const Introduction = ({ config }: IntroductionProps) => {
  const ref = useRef(null)
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '-125px')
  const isPortrait = window.matchMedia('(orientation: portrait)').matches
  const [resizedBrideImage, setResizedBrideImage] = useState<string | null>(null)
  const [resizedGroomImage, setResizedGroomImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchImageAsBlob = async (imageUrl: string) => {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      return blob
    }

    const resizeImage = (
      imageBlob: Blob,
      setImage: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
      Resizer.imageFileResizer(
        imageBlob,
        800, // max width
        600, // max height
        'JPEG', // format
        70, // quality
        0, // rotation
        (uri) => {
          setImage(uri as string)
        },
        'base64'
      )
    }

    fetchImageAsBlob(config.mainImages[0]).then((blob) => resizeImage(blob, setResizedBrideImage))
    fetchImageAsBlob(config.mainImages[1]).then((blob) => resizeImage(blob, setResizedGroomImage))
  }, [config.mainImages])

  return (
    <Container
      ref={ref}
      style={{
        backgroundColor: onScreen ? '#F6F6ED' : '#DADADA',
        transition: 'background 1s ease-in'
      }}
    >
      <TitleContainer>
        <Title>Introducing you</Title>
      </TitleContainer>
      <ProfileContainer style={{ flexDirection: isPortrait ? 'column' : 'row' }}>
        <Profile style={{ margin: isPortrait ? '1rem 0' : '0 2rem' }}>
          <SubTitle>The Bride</SubTitle>
          <Image
            src={resizedBrideImage || config.mainImages[0]}
            alt="Bride"
            style={{ width: isPortrait ? '150px' : '250px' }}
          />
          <Name>
            {config.bride.name} {config.bride.mandarin}
          </Name>
        </Profile>
        <Profile style={{ margin: isPortrait ? '1rem 0' : '0 2rem' }}>
          <SubTitle>And The Groom</SubTitle>
          <Image
            src={resizedGroomImage || config.mainImages[1]}
            alt="Groom"
            style={{ width: isPortrait ? '150px' : '250px' }}
          />
          <Name>
            {config.groom.name} {config.groom.mandarin}
          </Name>
        </Profile>
      </ProfileContainer>
    </Container>
  )
}

export default Introduction
