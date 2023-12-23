// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { styled } from '@stitches/react'
import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
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
})

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '20% 0% 10% 5%' : '5% 0% 5% 10%',
})

const Title = styled('p', {
  color: '#795548',
  width: '100%',
  fontSize: isPortrait ? '2.5em' : '3.5em',
  margin: 0,
  fontWeight: '500',
})

const ButtonGroup = styled('div', {
  width: '100%',
  textAlign: 'center',
  paddingBottom: isPortrait ? '10%' : '5%',
})

const LinkShareButton = styled(Button, {
  background: '#53acee',
  borderColor: '#53acee',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#9fcbed !important',
    borderColor: '#9fcbed !important',
    color: '#ffffff !important',
  },
  '&:focus': {
    backgroundColor: '#9fcbed !important',
    borderColor: '#9fcbed !important',
    color: '#ffffff !important',
  },
})

const WhatsAppButton = styled(Button, {
  background: '#25d366', // WhatsApp green color
  borderColor: '#25d366',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#128C7E !important', // Darker shade on hover
    borderColor: '#128C7E !important',
    color: '#ffffff !important',
  },
  '&:focus': {
    backgroundColor: '#128C7E !important',
    borderColor: '#128C7E !important',
    color: '#ffffff !important',
  },
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
      // Replace Kakao share logic with WhatsApp share logic
      const whatsappLink = `https://api.whatsapp.com/send?phone=601128655756`
      window.open(whatsappLink, '_blank')
    }
  }, [config, shareCount])

  return (
    <Section>
      <Layout>
        <Title>Share and contact us about this joyful event!</Title>
      </Layout>
      <ButtonGroup>
        <WhatsAppButton
          style={{ margin: 8 }}
          size="large"
          onClick={() => setShareCount(shareCount + 1)}
        >
          Contact us through WhatsApp
        </WhatsAppButton>
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
