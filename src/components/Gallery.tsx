import { styled } from '@stitches/react'
import { Carousel, Col, Image, Row } from 'antd'
import { useRef, useState } from 'react'
import { useWindowSize } from 'react-use'

import { ConfigsType } from '../configs'
import useOnScreen from '../hooks/useOnScreen'

const isPortrait = window.matchMedia('(orientation: portrait)').matches

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '10% 0% 10% 0%' : '2.5% 0% 2.5% 0%',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
})

const Title = styled('p', {
  color: '#FFFFFF',
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

  return (
    <section
      ref={ref}
      style={{
        height: '100vh',
        background: onScreen ? '#212121' : '#EFEBE9',
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
      </Layout>
    </section>
  )
}

export default Gallery
