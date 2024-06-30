import { styled } from '@stitches/react'
import React, { useEffect, useRef, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import { ConfigsType, MusicDetail } from '../configs'

const Layout = styled('div', {
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '5% 5%',
  backgroundColor: '#EDEBDD'
})

const TextContainer = styled('div', {
  width: '80%',
  textAlign: 'center',
  marginBottom: '10px'
})

const ImageContainer = styled('div', {
  width: '80%',
  textAlign: 'center',
  marginBottom: '20px'
})

const Image = styled('img', {
  width: '50%',
  maxWidth: '300px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  marginBottom: '20px'
})

const Title = styled('p', {
  color: '#795548',
  fontFamily: 'Great Vibes',
  fontSize: '2.5em',
  margin: '20px 0 10px 0'
})

const SubTitle = styled('p', {
  color: '#795548',
  fontFamily: 'Bad Script',
  fontSize: '1.8em',
  margin: '10px 0',
  lineHeight: 1.8
})

const PlayerWrapper = styled('div', {
  width: '85%',
  maxWidth: '600px',
  marginBottom: '30px'
})

const StyledAudioPlayer = styled(AudioPlayer, {
  //   backgroundColor: '#EDEBDD',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
})

const SongTitle = styled('p', {
  color: '#795548',
  fontFamily: 'Bad Script',
  fontSize: '2em',
  margin: '10px 0 5px 0',
  textAlign: 'center'
})

const SongArtist = styled('p', {
  color: '#795548',
  fontFamily: 'Bad Script',
  fontSize: '1.5em',
  margin: '5px 0',
  textAlign: 'center'
})

type MusicPlayerProps = {
  id: string
  config: ConfigsType
  showDetails: boolean
}

const MusicPlayer = ({ id, config, showDetails }: MusicPlayerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const playerRef = useRef<AudioPlayer>(null)
  const [musicIndex, setMusicIndex] = useState(() =>
    Math.floor(Math.random() * config.music.length)
  )
  const musicDetail: MusicDetail = config.music[musicIndex]

  useEffect(() => {
    if (showDetails && playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.play().catch((error) => {
        console.error('Error playing music:', error.message)
      })
    }
  }, [showDetails, musicIndex])

  const handleClickNext = () => {
    setMusicIndex((prevIndex) => (prevIndex + 1) % config.music.length)
  }

  const handleClickPrevious = () => {
    setMusicIndex((prevIndex) => (prevIndex - 1 + config.music.length) % config.music.length)
  }

  const handleEnded = () => {
    setMusicIndex((prevIndex) => (prevIndex + 1) % config.music.length)
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
          <Image src={config.greetingImage} alt="Album cover" />
        </ImageContainer>
        <SongTitle>{musicDetail.title}</SongTitle>
        <SongArtist>{musicDetail.artist}</SongArtist>
        <PlayerWrapper>
          <StyledAudioPlayer
            key={musicIndex} // Force re-render by changing key
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
