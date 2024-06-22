import { styled } from '@stitches/react'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import { useRef } from 'react'

import { ConfigsType } from '../configs'
import useOnScreen from '../hooks/useOnScreen'

const isPortrait = window.matchMedia('(orientation: portrait)').matches

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '15% 0% 15% 5%' : '5% 0% 5% 10%'
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
  fontSize: isPortrait ? '1.2em' : '2em',
  fontFamily: 'Bad Script',
  margin: '24px 0',
  fontWeight: '400',
  lineHeight: 1.8
})

type FillProps = {
  config: ConfigsType
}

const Fill = ({ config }: FillProps) => {
  const ref = useRef<HTMLSelectElement>(null)
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '-125px')
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
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
        transition: 'background 1s ease-in'
      }}
    >
      <Layout>
        <Title>Date: {config.weddingDate}</Title>
        <SubTitle>Let us know if you are attending!</SubTitle>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            style={{
              width: isPortrait ? '90%' : '35%',
              fontFamily: 'Bad Script',
              fontWeight: 'bold'
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Number of Pax"
            name="numberOfPax"
            style={{
              width: isPortrait ? '90%' : '35%',
              fontFamily: 'Bad Script',
              fontWeight: 'bold'
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Allergic"
            name="allergic"
            style={{
              width: isPortrait ? '90%' : '35%',
              fontFamily: 'Bad Script',
              fontWeight: 'bold'
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </section>
  )
}

export default Fill
