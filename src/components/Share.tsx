// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LinkOutlined } from '@ant-design/icons'
import { styled } from '@stitches/react'
import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { ConfigsType } from '../configs'

declare global {
  interface Window {
    Kakao: any
  }
}

const isPortrait = window.matchMedia('(orientation: portrait)').matches

const Section = styled('section', {
  background: '#EFEBE9',
  overflow: 'hidden',
  position: 'relative',
  height: '60vh'
})

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '15% 0% 10% 0%' : '5% 0% 5% 0%',
  paddingTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
})

const Title = styled('p', {
  color: '#795548',
  width: '100%',
  fontSize: isPortrait ? '2.5em' : '3.5em',
  fontFamily: 'Great Vibes, cursive',
  margin: 0,
  fontWeight: '500'
})

const ButtonGroup = styled('div', {
  width: '100%',
  textAlign: 'center',
  paddingBottom: isPortrait ? '10%' : '5%'
})

const LinkShareButton = styled(Button, {
  background: '#53acee',
  borderColor: '#53acee',
  color: '#ffffff',
  fontFamily: 'Bad Script',
  '&:hover': {
    backgroundColor: '#9fcbed !important',
    borderColor: '#9fcbed !important',
    color: '#ffffff !important'
  },
  '&:focus': {
    backgroundColor: '#9fcbed !important',
    borderColor: '#9fcbed !important',
    color: '#ffffff !important'
  }
})

const EmailButton = styled(Button, {
  background: '#007bff', // Email button color
  borderColor: '#007bff',
  color: '#ffffff',
  fontFamily: 'Bad Script',
  '&:hover': {
    backgroundColor: '#128C7E !important', // Darker shade on hover
    borderColor: '#128C7E !important',
    color: '#ffffff !important'
  },
  '&:focus': {
    backgroundColor: '#128C7E !important',
    borderColor: '#128C7E !important',
    color: '#ffffff !important'
  }
})

type ShareProps = {
  config: ConfigsType
}

const Share = ({ config }: ShareProps) => {
  const [shareCount, setShareCount] = useState<number>(0)

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(config.kakaoToken)
  }

  useEffect(() => {
    if (shareCount !== 0) {
      const mailtoLink = `mailto:teysuizer1998@gmail.com`
      window.open(mailtoLink, '_blank')
    }
  }, [shareCount])

  return (
    <Section>
      <Layout>
        <Title>Share and contact us about this joyful event!</Title>
      </Layout>
      <ButtonGroup>
        <EmailButton
          style={{ margin: 8 }}
          size="large"
          onClick={() => setShareCount(shareCount + 1)}
        >
          Contact us through Email
        </EmailButton>
        <CopyToClipboard text={config.url}>
          <LinkShareButton
            style={{ margin: 8 }}
            icon={<LinkOutlined />}
            size="large"
            onClick={() => message.success('Invitation link copied!')}
          >
            Share via Link
          </LinkShareButton>
        </CopyToClipboard>
      </ButtonGroup>
    </Section>
  )
}

export default Share
