import { DownOutlined } from '@ant-design/icons'
import { styled } from '@stitches/react'
import { Carousel, Col, Image, Row } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'

import { ConfigsType } from '../configs'
import useOnScreen from '../hooks/useOnScreen'

const isPortrait = window.matchMedia('(orientation: portrait)').matches

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '10% 0% 10% 0%' : '2.5% 0% 2.5% 0%',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  overflow: 'hidden'
})

const Title = styled('p', {
  color: '#795548',
  width: '100%',
  fontSize: isPortrait ? '2em' : '2.5em',
  fontWeight: '500',
  fontFamily: 'Great Vibes'
})

type GalleryProps = {
  config: ConfigsType
}

const Gallery = ({ config }: GalleryProps) => {
  const { width } = useWindowSize()

  const ref = useRef<HTMLSelectElement>(null)
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '-125px')

  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewIndex] = useState<number>(0)

  const [arrowStates, setArrowStates] = useState([
    { size: 32, color: '#795548' },
    { size: 44, color: '#DADADA' },
    { size: 56, color: '#FFFFFF' }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setArrowStates((prevStates) => {
        const newStates = [
          prevStates[2],
          { size: prevStates[0].size, color: prevStates[0].color },
          { size: prevStates[1].size, color: prevStates[1].color }
        ]
        return newStates
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={ref}
      style={{
        height: '100vh',
        background: onScreen ? '#D8BDA8' : '#EFEBE9',
        transition: 'background 1s ease-in'
      }}
    >
      <Layout>
        <Title>Our Precious Moments...</Title>
        {isPortrait && (
          <Carousel
            autoplay={true}
            effect="fade"
            arrows={true}
            draggable={true}
            slidesToShow={1}
            centerMode={true}
            speed={300}
          >
            {config.galleryImages.map((image, index) => (
              <div key={index} onClick={() => {}}>
                <Image src={image} width={isPortrait ? width * 0.7 : width * 0.2} preview={true} />
              </div>
            ))}
          </Carousel>
        )}
        {!isPortrait && (
          <Row gutter={[16, 16]}>
            <Image.PreviewGroup
              preview={{
                visible: previewVisible,
                onVisibleChange: (visible) => setPreviewVisible(visible),
                current: previewIndex
              }}
            >
              {config.galleryImages.map((image, index) => (
                <Col key={index} span={isPortrait ? 6 : 3}>
                  <Image
                    key={index}
                    src={image}
                    width={isPortrait ? width / 4 - 10 : width / 8 - 10}
                  />
                </Col>
              ))}
            </Image.PreviewGroup>
          </Row>
        )}
        {/* <div
          style={{
            marginTop: isPortrait ? '20px' : '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <DownOutlined
            className="blinking-arrow-1"
            style={{
              fontSize: `${arrowStates[0].size}px`,
              color: arrowStates[0].color,
              margin: '5px 0'
            }}
          />
          <DownOutlined
            className="blinking-arrow-2"
            style={{
              fontSize: `${arrowStates[1].size}px`,
              color: arrowStates[1].color,
              margin: '5px 0'
            }}
          />
          <DownOutlined
            className="blinking-arrow-3"
            style={{
              fontSize: `${arrowStates[2].size}px`,
              color: arrowStates[2].color,
              margin: '5px 0'
            }}
          />
        </div> */}
      </Layout>
    </section>
  )
}

export default Gallery
