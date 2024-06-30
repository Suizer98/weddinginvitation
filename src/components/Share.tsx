// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LinkOutlined } from '@ant-design/icons'
import { styled } from '@stitches/react'
import { Button, message } from 'antd'
import CopyToClipboard from 'react-copy-to-clipboard'

import { ConfigsType } from '../configs'

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
  paddingBottom: isPortrait ? '10%' : '5%',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px'
})

const commonButtonStyles = {
  fontFamily: 'Bad Script',
  fontSize: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'auto',
  padding: '8px 16px'
}

const LinkShareButton = styled(Button, {
  ...commonButtonStyles,
  background: '#53acee',
  borderColor: '#53acee',
  color: '#ffffff',
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
  ...commonButtonStyles,
  background: '#007bff',
  borderColor: '#007bff',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#128C7E !important',
    borderColor: '#128C7E !important',
    color: '#ffffff !important'
  },
  '&:focus': {
    backgroundColor: '#128C7E !important',
    borderColor: '#128C7E !important',
    color: '#ffffff !important'
  }
})

const WhatsAppButton = styled(Button, {
  ...commonButtonStyles,
  background: '#25D366',
  borderColor: '#25D366',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#1DA855 !important',
    borderColor: '#1DA855 !important',
    color: '#ffffff !important'
  },
  '&:focus': {
    backgroundColor: '#1DA855 !important',
    borderColor: '#1DA855 !important',
    color: '#ffffff !important'
  }
})

type ShareProps = {
  config: ConfigsType
}

const Share = ({ config }: ShareProps) => {
  return (
    <Section>
      <Layout>
        <Title>Share & contact us!</Title>
      </Layout>
      <ButtonGroup>
        <WhatsAppButton
          style={{ margin: 8 }}
          size="large"
          icon={
            <img
              src={config.kakaoImage}
              alt="WhatsApp Icon"
              style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 8 }}
            />
          }
          onClick={() => window.open('https://wa.link/fnq7ti', '_blank')}
        >
          Contact via WhatsApp
        </WhatsAppButton>
        <EmailButton
          style={{ margin: 8 }}
          size="large"
          onClick={() => window.open(`mailto:teysuizer1998@gmail.com`, '_blank')}
        >
          Contact through Email
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
