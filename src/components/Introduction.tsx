import { styled } from '@stitches/react'

import { ConfigsType } from '../configs'

const Container = styled('div', {
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#EFF4E2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem'
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
  return (
    <Container>
      <TitleContainer>
        <Title>Hey There!</Title>
      </TitleContainer>
      <ProfileContainer>
        <Profile>
          <SubTitle>Introducing The Groom...</SubTitle>
          <Image src={config.galleryImages[0]} alt="Groom" />
          <Name>{config.groom.name}</Name>
        </Profile>
        <Profile>
          <SubTitle>And The Bride</SubTitle>
          <Image src={config.galleryImages[1]} alt="Bride" />
          <Name>{config.bride.name}</Name>
        </Profile>
      </ProfileContainer>
    </Container>
  )
}

export default Introduction