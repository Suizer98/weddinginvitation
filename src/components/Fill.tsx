import { styled } from '@stitches/react'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import { useRef } from 'react'

import { ConfigsType } from '../configs'
import useOnScreen from '../hooks/useOnScreen'

const isPortrait = window.matchMedia('(orientation: portrait)').matches

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '15% 0% 15% 0%' : '5% 0% 5% 0%',
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
  margin: 0,
  fontWeight: '500',
  fontFamily: 'Great Vibes, cursive'
})

const SubTitle = styled('p', {
  color: '#795548',
  width: '100%',
  fontSize: isPortrait ? '1.29em' : '2em',
  fontFamily: 'Bad Script',
  margin: '24px 0',
  fontWeight: '400',
  lineHeight: 1.8
})

const FormContainer = styled(Form, {
  width: isPortrait ? '90%' : '35%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
})

const FormItem = styled(Form.Item, {
  width: '80%',
  marginBottom: '16px',
  fontFamily: 'Bad Script',
  fontWeight: 'bold',
  textAlign: 'left',
  fontSize: 30
})

const StyledButton = styled(Button, {
  width: '30%',
  fontSize: 20
})

type FillProps = {
  config: ConfigsType
}

const Fill = ({ config }: FillProps) => {
  const ref = useRef<HTMLSelectElement>(null)
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '-125px')
  const [form] = Form.useForm()

  const TELEGRAM_TOKEN = process.env.REACT_APP_TELEGRAM_TOKEN
  const TELEGRAM_CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID

  const onFinish = async (values: any) => {
    // Notify via Telegram regardless of backend response
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: `New submission:\nName: ${values.name}\nNumber of Pax: ${values.numberOfPax}\nAllergic: ${values.allergic}`
      })
    } catch (telegramError) {
      console.error('Failed to send message to Telegram', telegramError)
    }

    try {
      const response = await axios.post(
        config.backendURL,
        {
          name: values.name,
          pax: values.numberOfPax,
          allergic: values.allergic
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        message.success('Successfully saved!')
      } else {
        const data = response.data // Assuming the server returns additional information in the response
        if (data && data.error === 'User already exists') {
          message.error('User already existed!')
        } else {
          // Handle other error cases
          message.error('Failed to save data. Please try again.')
        }
      }
    } catch (error) {
      message.error('User already existed!')
    }
  }

  return (
    <section
      ref={ref}
      style={{
        height: '100vh',
        background: onScreen ? '#e3b7a6' : '#DADADA',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 1s ease-in',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Layout>
        <Title>Date: {config.weddingDate}</Title>
        <SubTitle>Let us know if you are attending!</SubTitle>
        <FormContainer form={form} onFinish={onFinish}>
          <FormItem label="Name" name="name">
            <Input />
          </FormItem>
          <FormItem label="Pax" name="numberOfPax">
            <Input />
          </FormItem>
          <FormItem label="Vegeterian" name="allergic">
            <Input />
          </FormItem>
          <FormItem style={{ textAlign: 'center' }}>
            {' '}
            {/* Center the button */}
            <StyledButton type="primary" htmlType="submit">
              Submit
            </StyledButton>
          </FormItem>
        </FormContainer>
      </Layout>
    </section>
  )
}

export default Fill
