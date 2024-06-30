import { styled } from '@stitches/react'
import React, { useEffect, useRef } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import { ConfigsType } from '../configs'

const PlayerContainer = styled('div', {
  position: 'fixed',
  top: 10,
  right: 10,
  zIndex: 1000,
  width: '300px',
  background: '#FCE4EC',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  borderRadius: '10px'
})

const Title = styled('p', {
  color: '#795548',
  fontFamily: 'Great Vibes, cursive',
  fontSize: '1.5em',
  margin: 0,
  textAlign: 'center'
})

type MusicPlayerProps = {
  id: string
  config: ConfigsType
  showDetails: boolean
}

const MusicPlayer = ({ id, config, showDetails }: MusicPlayerProps) => {
  const playerRef = useRef<AudioPlayer>(null)

  useEffect(() => {
    if (showDetails && playerRef.current) {
      playerRef!.current!.audio!.current!.play().catch((error) => {
        console.error('Error playing music:', error.message)
      })
    }
  }, [showDetails])

  return (
    <PlayerContainer>
      <Title>Music Player</Title>
      <AudioPlayer
        ref={playerRef}
        src={config.music}
        loop
        customAdditionalControls={[]}
        autoPlayAfterSrcChange={false}
        showJumpControls={false}
      />
    </PlayerContainer>
  )
}

export default MusicPlayer
