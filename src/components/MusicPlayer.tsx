import { keyframes, styled } from '@stitches/react'
import React, { useEffect, useRef, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import { ConfigsType, MusicDetail } from '../configs'

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
})

const Layout = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5% 5%',
  overflow: 'hidden',
  backgroundColor: '#EDEBDD',
  '@media (max-width: 768px)': {
    padding: '3% 3%'
  }
})

const TextContainer = styled('div', {
  width: '80%',
  textAlign: 'center',
  marginBottom: '20px',
  '@media (max-width: 768px)': {
    width: '90%',
    marginBottom: '10px'
  }
})

const ImageContainer = styled('div', {
  width: '80%',
  textAlign: 'center',
  marginBottom: '20px',
  '@media (max-width: 768px)': {
    width: '90%',
    marginBottom: '10px'
  }
})

const Image = styled('img', {
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  marginTop: '10px',
  marginBottom: '10px',
  animation: `${spin} 5s linear infinite`, // Add the spinning animation
  animationPlayState: 'paused', // Start in paused state
  objectFit: 'cover', // Ensure the image content fits well within the circle
  overflow: 'hidden', // Ensure content stays within the circular boundary
  '@media (max-width: 768px)': {
    width: '200px',
    height: '200px'
  }
})

const Title = styled('p', {
  color: '#795548',
  fontFamily: 'Great Vibes',
  fontSize: '2.5em',
  margin: '50px 0 10px 0',
  '@media (max-width: 768px)': {
    fontSize: '2em',
    margin: '10px 0'
  }
})

const SubTitle = styled('p', {
  color: '#795548',
  fontFamily: 'Bad Script',
  fontSize: '1.8em',
  margin: '10px 0',
  lineHeight: 1.8,
  '@media (max-width: 768px)': {
    fontSize: '1.5em',
    margin: '5px 0'
  }
})

const PlayerWrapper = styled('div', {
  width: '85%',
  maxWidth: '600px',
  marginBottom: '30px',
  '@media (max-width: 768px)': {
    width: '90%',
    marginBottom: '20px'
  }
})

const StyledAudioPlayer = styled(AudioPlayer, {
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
})

const SongTitle = styled('p', {
  color: '#795548',
  fontFamily: 'Bad Script',
  fontSize: '2em',
  margin: '5px 0 5px 0',
  textAlign: 'center',
  '@media (max-width: 768px)': {
    fontSize: '1.5em',
    margin: '5px 0'
  }
})

const SongArtist = styled('p', {
  color: '#795548',
  fontFamily: 'Bad Script',
  fontSize: '1.5em',
  margin: '5px 0 5px 0',
  textAlign: 'center',
  '@media (max-width: 768px)': {
    fontSize: '1.2em',
    margin: '3px 0'
  }
})

type MusicPlayerProps = {
  id: string
  config: ConfigsType
  showDetails: boolean
}

const MusicPlayer = ({ id, config, showDetails }: MusicPlayerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const playerRef = useRef<AudioPlayer>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [musicIndex, setMusicIndex] = useState(() =>
    Math.floor(Math.random() * config.music.length)
  )
  const [imageIndex, setImageIndex] = useState(() =>
    Math.floor(Math.random() * config.musicPlayerImages.length)
  )
  const musicDetail: MusicDetail = config.music[musicIndex]

  useEffect(() => {
    if (showDetails && playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.play().catch((error) => {
        console.error('Error playing music:', error.message)
      })
    }
  }, [showDetails, musicIndex])

  useEffect(() => {
    const audioElement = playerRef.current?.audio.current

    const handlePlay = () => {
      if (imageRef.current) {
        imageRef.current.style.animationPlayState = 'running'
      }
    }

    const handlePause = () => {
      if (imageRef.current) {
        imageRef.current.style.animationPlayState = 'paused'
      }
    }

    audioElement?.addEventListener('play', handlePlay)
    audioElement?.addEventListener('pause', handlePause)
    audioElement?.addEventListener('ended', handlePause)

    return () => {
      audioElement?.removeEventListener('play', handlePlay)
      audioElement?.removeEventListener('pause', handlePause)
      audioElement?.removeEventListener('ended', handlePause)
    }
  }, [])

  const handleClickNext = () => {
    setMusicIndex((prevIndex) => (prevIndex + 1) % config.music.length)
    setImageIndex(() => Math.floor(Math.random() * config.musicPlayerImages.length))
    if (playerRef.current?.audio.current) {
      playerRef.current.audio.current.pause()
      playerRef.current.audio.current.play().catch((error) => {
        console.error('Error playing music:', error.message)
      })
    }
  }

  const handleClickPrevious = () => {
    setMusicIndex((prevIndex) => (prevIndex - 1 + config.music.length) % config.music.length)
    setImageIndex(() => Math.floor(Math.random() * config.musicPlayerImages.length))
    if (playerRef.current?.audio.current) {
      playerRef.current.audio.current.pause()
      playerRef.current.audio.current.play().catch((error) => {
        console.error('Error playing music:', error.message)
      })
    }
  }

  const handleEnded = () => {
    setMusicIndex((prevIndex) => (prevIndex + 1) % config.music.length)
    setImageIndex(() => Math.floor(Math.random() * config.musicPlayerImages.length))
    if (playerRef.current?.audio.current) {
      playerRef.current.audio.current.pause()
      playerRef.current.audio.current.play().catch((error) => {
        console.error('Error playing music:', error.message)
      })
    }
  }

  return (
    <section
      id={id}
      ref={ref}
      style={{
        height: '100vh',
        backgroundColor: '#EDEBDD',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 1s ease-in',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Layout>
        <TextContainer>
          <Title>Every Song Tells a Story, Here Is Ours</Title>
          <SubTitle>Check out the playlist we’ve curated together.</SubTitle>
        </TextContainer>
        <ImageContainer>
          <Image src={config.musicPlayerImages[imageIndex]} alt="Album cover" ref={imageRef} />
        </ImageContainer>
        <SongTitle>{musicDetail.title}</SongTitle>
        <SongArtist>{musicDetail.artist}</SongArtist>
        <PlayerWrapper>
          <StyledAudioPlayer
            style={{ fontFamily: 'Bad Script' }}
            ref={playerRef}
            src={musicDetail.src}
            loop={false}
            customAdditionalControls={[]}
            autoPlayAfterSrcChange={true}
            showJumpControls={true}
            showSkipControls={true}
            onClickNext={handleClickNext}
            onClickPrevious={handleClickPrevious}
            onEnded={handleEnded}
          />
        </PlayerWrapper>
      </Layout>
    </section>
  )
}

export default MusicPlayer
