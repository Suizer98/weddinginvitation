import { LinkOutlined } from '@ant-design/icons'
import { styled } from '@stitches/react'
import { Button, Modal, message } from 'antd'
import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { ConfigsType } from '../configs'

const Section = styled('section', {
  background: '#EFEBE9',
  overflow: 'hidden',
  position: 'relative',
  height: '60vh',
  '@media (max-width: 768px)': {
    height: 'auto',
    paddingBottom: '20px'
  }
})

const Layout = styled('div', {
  width: '100%',
  padding: '5% 0%',
  paddingTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  '@media (max-width: 768px)': {
    padding: '10% 0%'
  }
})

const Title = styled('p', {
  color: '#795548',
  width: '100%',
  fontSize: '3.5em',
  fontFamily: 'Great Vibes, cursive',
  margin: 0,
  fontWeight: '500',
  '@media (max-width: 768px)': {
    fontSize: '2.5em'
  }
})

const ButtonGroup = styled('div', {
  width: '100%',
  textAlign: 'center',
  paddingBottom: '5%',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  flexWrap: 'wrap',
  '@media (max-width: 768px)': {
    paddingBottom: '20%'
  }
})

const commonButtonStyles = {
  fontFamily: 'Bad Script',
  fontSize: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'auto',
  padding: '8px 16px',
  '@media (max-width: 768px)': {
    fontSize: '16px',
    padding: '6px 12px'
  }
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
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Section>
      <Layout>
        <Title>Share & contact us!</Title>
      </Layout>
      <ButtonGroup>
        <WhatsAppButton
          style={{ margin: 8 }}
          size="large"
          onClick={showModal}
          icon={
            <img
              src={config.kakaoImage}
              alt="WhatsApp Icon"
              style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 8 }}
            />
          }
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

      <Modal
        title={
          <div style={{ textAlign: 'center', fontFamily: 'Bad Script', fontSize: 15 }}>
            Contact via WhatsApp
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Button
          style={{
            width: '50%',
            marginBottom: 8,
            fontFamily: 'Bad Script',
            backgroundColor: '#6EC5E9',
            borderColor: '#6EC5E9',
            color: '#ffffff',
            fontSize: 15
          }}
          onClick={() => window.open('https://wa.link/fnq7ti', '_blank')}
        >
          Contact Groom
        </Button>
        <Button
          style={{
            width: '50%',
            fontFamily: 'Bad Script',
            backgroundColor: '#FF69B4',
            borderColor: '#FF69B4',
            color: '#ffffff',
            fontSize: 15
          }}
          onClick={() => window.open('https://wa.link/mabe0w', '_blank')}
        >
          Contact Bride
        </Button>
      </Modal>
    </Section>
  )
}

export default Share
