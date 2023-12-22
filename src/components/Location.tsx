import { useRef, useEffect } from 'react'
import { styled } from '@stitches/react'
import { ConfigsType } from '../configs'
import 'ol/ol.css'
import { Map, View } from 'ol'
import * as olProj from 'ol/proj'
import Overlay from 'ol/Overlay'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style, Fill, Stroke, Circle } from 'ol/style'
import { defaults } from 'ol/control'
import Control from 'ol/control/Control'
import { message } from 'antd'

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
  span: {
    color: 'red',
  },
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
            source: new OSM(),
          }),
        ],
        view: new View({
          center: olProj.fromLonLat([103.74600638294491, 1.5493705212948794]),
          zoom: 15,
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
              button.addEventListener('click', () => {
                const view = map.getView()
                view.setCenter(
                  olProj.fromLonLat([103.74600638294491, 1.5493705212948794]),
                )
              })
              return button
            })(),
          }),
        ]),
      })

      // Add Marker with a bigger point
      const marker = new Feature({
        geometry: new Point(
          olProj.fromLonLat([103.74600638294491, 1.5493705212948794]),
        ),
      })

      // Define the style for the marker
      const markerStyle = new Style({
        image: new Circle({
          radius: 10, // Adjust the radius to make the point bigger
          fill: new Fill({
            color: 'rgba(255, 0, 0, 0.7)', // Red color with some transparency
          }),
          stroke: new Stroke({
            color: 'rgba(255, 0, 0, 0.9)', // Red color with more transparency for the border
            width: 2,
          }),
        }),
      })

      marker.setStyle(markerStyle)

      const markerLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      })

      map.addLayer(markerLayer)

      // Add Popup
      const popup = new Overlay({
        element: popupRef.current!,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10],
      })

      map.addOverlay(popup)

      // Show Popup when clicking on the marker
      map.on('click', (event) => {
        const feature = map.forEachFeatureAtPixel(
          event.pixel,
          (feature) => feature,
        )

        if (
          feature instanceof Feature &&
          feature.getGeometry() instanceof Point
        ) {
          const coordinates = (feature.getGeometry() as Point).getCoordinates()
          popup.setPosition(coordinates)

          // Copy the address to clipboard when clicking on the red dot
          copyToClipboard(config.weddingAddress)
        }
      })

      // Close Popup when clicking on the map
      map.on('click', () => {
        popup.setPosition(undefined)
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
          Address:
          <br />
          {config.weddingAddress}
          <br />
          <br />
          Click on the <span>red dot</span> to copy address!
        </SubTitle>
        <MapWrapper
          ref={mapRef}
          style={{ width: isPortrait ? '90%' : '60%', height: '500px' }}
        ></MapWrapper>
        <div ref={popupRef} style={{ display: 'none' }}>
          <p>We are here!</p>
        </div>
      </Layout>
    </Section>
  )
}

export default Location
