import { useRef, useState } from 'react'
import { styled } from '@stitches/react'
import { Col, Image, Row } from 'antd'
import useOnScreen from '../hooks/useOnScreen'
import { useWindowSize } from 'react-use'
import { ConfigsType } from '../configs'

const isPortrait = window.matchMedia('(orientation: portrait)').matches

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '30% 0% 15% 5%' : '5% 0% 5% 10%',
})

const Title = styled('p', {
  color: '#FFFFFF',
  width: '100%',
  fontSize: isPortrait ? '2.5em' : '3.5em',
  margin: 0,
  fontWeight: '500',
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
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 1s ease-in',
      }}
    >
      <Layout>
        <Title>Our Beautiful Moments</Title>
      </Layout>
      <Row gutter={[16, 16]}>
        <Image.PreviewGroup
          preview={{
            visible: previewVisible,
            onVisibleChange: (visible) => setPreviewVisible(visible),
            current: previewIndex,
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
    </section>
  )
}

export default Gallery
