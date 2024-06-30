import { styled } from '@stitches/react'
import React, { useEffect, useRef } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import { ConfigsType } from '../configs'

const Layout = styled('div', {
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '5% 0',
  backgroundColor: '#FCE4E3'
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
  fontFamily: 'Great Vibes, cursive',
  fontSize: '2.5em',
  margin: '20px 0 10px 0'
})

const SubTitle = styled('p', {
  color: '#795548',
  fontFamily: 'Bad Script',
  fontSize: '1.5em',
  margin: '10px 0',
  lineHeight: 1.8
})

const PlayerWrapper = styled('div', {
  width: '80%',
  maxWidth: '600px',
  marginBottom: '20px'
})

const StyledAudioPlayer = styled(AudioPlayer, {
  backgroundColor: '#FFE4E1',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
})

const SongTitle = styled('p', {
  color: '#795548',
  fontFamily: 'Great Vibes, cursive',
  fontSize: '1.5em',
  margin: '10px 0 5px 0',
  textAlign: 'center'
})

const SongArtist = styled('p', {
  color: '#795548',
  fontFamily: 'Bad Script',
  fontSize: '1.2em',
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

  useEffect(() => {
    if (showDetails && playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.play().catch((error) => {
        console.error('Error playing music:', error.message)
      })
    }
  }, [showDetails])

  return (
    <section
      id={id}
      ref={ref}
      style={{
        height: '100vh',
        backgroundColor: '#FCE4E3',
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
        <SongTitle>Everything - The Black Skirt</SongTitle>
        <SongArtist>The Black Skirt - Our Wedding Song</SongArtist>
        <PlayerWrapper>
          <StyledAudioPlayer
            ref={playerRef}
            src={config.music}
            loop
            customAdditionalControls={[]}
            autoPlayAfterSrcChange={false}
            showJumpControls={false}
          />
        </PlayerWrapper>
      </Layout>
    </section>
  )
}

export default MusicPlayer
