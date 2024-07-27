import { styled } from '@stitches/react'
import { Carousel, Col, Image, Row } from 'antd'
import { useRef, useState } from 'react'
import { Blurhash } from 'react-blurhash'
// import LazyLoad from 'react-lazyload'
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
                {/* <LazyLoad height={200} offset={100}> */}
                <ImageWithBlurhash src={image} width={isPortrait ? width * 0.7 : width * 0.2} />
                {/* </LazyLoad> */}
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
                  {/* <LazyLoad height={200} offset={100}> */}
                  <ImageWithBlurhash
                    src={image}
                    width={isPortrait ? width / 4 - 10 : width / 8 - 10}
                  />
                  {/* </LazyLoad> */}
                </Col>
              ))}
            </Image.PreviewGroup>
          </Row>
        )}
      </Layout>
    </section>
  )
}

type ImageWithBlurhashProps = {
  src: string
  width: number
}

const ImageWithBlurhash = ({ src, width }: ImageWithBlurhashProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {!imageLoaded && (
        <Blurhash
          hash="L03l5OWBofayofayj[ayayj[ayj["
          width="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <Image
        src={src}
        width={width}
        style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
        onLoad={() => setImageLoaded(true)}
        preview={true}
      />
    </div>
  )
}

export default Gallery
