import { styled } from '@stitches/react'
import { message } from 'antd'
import { Map, View } from 'ol'
import Feature from 'ol/Feature'
import Overlay from 'ol/Overlay'
import { defaults } from 'ol/control'
import Control from 'ol/control/Control'
import Point from 'ol/geom/Point'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import 'ol/ol.css'
import * as olProj from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Icon, Style } from 'ol/style'
import { useEffect, useRef } from 'react'

import { ConfigsType } from '../configs'

const isPortrait = window.matchMedia('(orientation: portrait)').matches

const Section = styled('section', {
  background: '#EFEBE9',
  overflow: 'hidden',
  position: 'relative'
})

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '20% 0% 15% 0%' : '5% 0% 5% 0%',
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
  fontSize: isPortrait ? '1.4em' : '2em',
  fontFamily: 'Bad Script',
  margin: '24px 0',
  fontWeight: '300',
  lineHeight: 1.8,
  span: {
    color: '#FF8D00'
  }
})

const MapWrapper = styled('div', {
  width: '100%',
  height: '400px',
  marginTop: '20px'
})

const center = olProj.fromLonLat([103.74600638294491, 1.5493705212948794])

type LocationProps = {
  config: ConfigsType
}

const Location = ({ config }: LocationProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const copyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    message.success('Address copied!')
  }

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
              attributions: '&copy; <a href="https://www.carto.com/">CARTO</a>'
            })
          })
        ],
        view: new View({
          center: center,
          zoom: 15
        }),
        controls: defaults().extend([
          // Add Recenter Button Control
          new Control({
            element: (() => {
              const button = document.createElement('button')
              button.innerHTML = 'Recenter'
              button.style.position = 'absolute'
              button.style.top = '10px'
              button.style.right = '10px'
              button.style.fontFamily = 'Bad Script'
              // button.style.fontSize = '20'
              button.addEventListener('click', () => {
                const view = map.getView()
                view.setCenter(center)
                view.setZoom(15)
                popup.setPosition(center)
              })
              return button
            })()
          })
        ])
      })

      // Add Marker with a bigger point
      const marker = new Feature({
        geometry: new Point(center)
      })

      // Define the style for the marker
      const markerStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '/marker.svg',
          scale: 1.5
        })
      })

      marker.setStyle(markerStyle)

      const markerLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker]
        })
      })

      map.addLayer(markerLayer)

      // Add Popup
      const popup = new Overlay({
        element: popupRef.current!,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -45]
      })

      map.addOverlay(popup)
      popup.setPosition(center)

      // Show Popup when clicking on the marker
      map.on('click', (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature)

        if (feature instanceof Feature && feature.getGeometry() instanceof Point) {
          // Copy the address to clipboard when clicking on the red dot
          popup.setPosition(undefined)
          copyToClipboard(config.weddingAddress)
        } else {
          popup.setPosition(center)
        }
      })

      return () => {
        map.dispose()
      }
    }
  }, [mapRef, config.weddingAddress])

  return (
    <Section>
      <Layout>
        <Title>Wedding Avenue</Title>
        <SubTitle>
          {config.weddingLocation}
          <br />
          <br />
          {config.weddingAddress}
          <br />
          <br />
          Click on the <span>marker</span> to copy address!
        </SubTitle>
        <MapWrapper
          ref={mapRef}
          style={{ width: isPortrait ? '90%' : '60%', height: '500px' }}
        ></MapWrapper>
        <div
          ref={popupRef}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(0, 0, 0, 0.2)'
          }}
        >
          <p style={{ fontFamily: 'Bad Script', fontSize: 20 }}>We are here!</p>
        </div>
      </Layout>
    </Section>
  )
}

export default Location
