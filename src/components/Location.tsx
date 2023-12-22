import { useRef, useEffect } from 'react'
import { styled } from '@stitches/react'
import { ConfigsType } from '../configs'
import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

const isPortrait = window.matchMedia('(orientation: portrait)').matches

const Section = styled('section', {
  background: '#EFEBE9',
  overflow: 'hidden',
  position: 'relative',
})

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '20% 0% 15% 5%' : '5% 0% 5% 10%',
})

const Title = styled('p', {
  color: '#795548',
  width: '100%',
  fontSize: isPortrait ? '2.5em' : '3.5em',
  margin: 0,
  fontWeight: '500',
})

const SubTitle = styled('p', {
  color: '#795548',
  width: '100%',
  fontSize: isPortrait ? '1.2em' : '2em',
  margin: '24px 0',
  fontWeight: '300',
  lineHeight: 1.8,
})

const MapWrapper = styled('div', {
  width: '100%',
  height: '400px', // Adjust the height as needed
  marginTop: '20px',
})

type LocationProps = {
  config: ConfigsType
}

const Location = ({ config }: LocationProps) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [1.5493705212948794, 103.74600638294491],
          zoom: 15,
        }),
      })

      return () => {
        map.dispose()
      }
    }
  }, [mapRef])

  return (
    <Section>
      <Layout>
        <Title>Wedding Avenue</Title>
        <SubTitle>
          億家主题宴会厅 - Yijia Theme Banquet Hall
          <br />
          Address:
          <br />
          8, Jln Adda 2, Adda Heights, 81100 Johor Bahru, Johor
        </SubTitle>
        <MapWrapper
          ref={mapRef}
          style={{ width: isPortrait ? '90%' : '60%', height: '500px' }}
        ></MapWrapper>
      </Layout>
    </Section>
  )
}

export default Location
