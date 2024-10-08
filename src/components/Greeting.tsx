import { styled } from '@stitches/react'
import { useRef } from 'react'

import { ConfigsType } from '../configs'
import useOnScreen from '../hooks/useOnScreen'

const isPortrait = window.matchMedia('(orientation: portrait)').matches

const Layout = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: isPortrait ? 'column' : 'row',
  alignItems: 'center',
  padding: isPortrait ? '20% 0% 15% 5%' : '5% 0% 5% 10%'
})

const TextContainer = styled('div', {
  width: isPortrait ? '100%' : '60%'
})

const RedSpan = styled('span', {
  color: '#FF69B4' // Light Pink
})

const BlueSpan = styled('span', {
  color: '#6EC5E9' // Pastel Blue
})

const OrenSpan = styled('span', {
  color: '#FFA726' // Soft Orange
})

const BrownSpan = styled('span', {
  color: '#CC6A0E' // Soft Brown
})

const Title = styled('p', {
  color: '#795548',
  width: '100%',
  fontFamily: 'Great Vibes, cursive',
  fontSize: isPortrait ? '2.5em' : '3.5em',
  margin: 0,
  fontWeight: '500'
})

const SubTitle = styled('p', {
  color: '#795548',
  width: '100%',
  fontFamily: 'Bad Script',
  fontSize: isPortrait ? '1.29em' : '2em',
  margin: '5px 0 5px 0',
  fontWeight: '300',
  lineHeight: 1.8
})

type GreetingProps = {
  id: string
  config: ConfigsType
}

const Greeting = ({ id, config }: GreetingProps) => {
  const ref = useRef<HTMLSelectElement>(null)
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '-125px')

  return (
    <section
      id={id}
      ref={ref}
      style={{
        height: '100vh',
        background: onScreen ? '#F6F6ED' : '#DADADA',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 1s ease-in'
      }}
    >
      <Layout>
        <TextContainer>
          <Title>We're Getting Married</Title>
          <SubTitle>
            <RedSpan>{config.bride.name}</RedSpan> born in
            <OrenSpan> February</OrenSpan>,
            <br />
            <BlueSpan>{config.groom.name}</BlueSpan> born in
            <BrownSpan> September</BrownSpan>,
            <br />
            <br />
            Two people with different interests and values
            <br />
            Have become alike through love
            <br />
            And are about to embark on the journey of life together.
            <br />
            <br />
            With warm encouragement and blessings,
            <br />
            you are welcome to illuminate the place of our new start.
            <br />
            <br />
            Scroll down to see the love story of
            <RedSpan> {config.bride.name}</RedSpan> & <BlueSpan>{config.groom.name}</BlueSpan>
            <br />
          </SubTitle>
        </TextContainer>
      </Layout>
    </section>
  )
}

export default Greeting
