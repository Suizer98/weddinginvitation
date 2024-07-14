import LocationMapImage from './resources/LocationMap.png'
// @ts-ignore
import GalleryPhotoGreeting from './resources/cover.jpg'
import TitleImage from './resources/cover.jpg'
// @ts-ignore
import Music2 from './resources/music2.mp3'
// @ts-ignore
import Music3 from './resources/music3.mp3'
// @ts-ignore
import Music4 from './resources/music4.mp3'
// @ts-ignore
import Music5 from './resources/music5.mp3'
// @ts-ignore
import Music from './resources/music.mp3'
import WS from './resources/ws.png'

// Utility function to import all images from a directory
const importAll = (requireContext: any) => requireContext.keys().map(requireContext)

// Automatically load all images from the ./resources directory
const musicPlayerImages: string[] = importAll(
  // @ts-ignore
  require.context('./resources/musicplayerphotos', false, /\.(png|jpe?g|svg)$/)
)

const galleryImages: string[] = importAll(
  // @ts-ignore
  require.context('./resources/galleryphotos', false, /\.(png|jpe?g|svg)$/)
)

const introduceImages: string[] = importAll(
  // @ts-ignore
  require.context('./resources/couple', false, /\.(png|jpe?g|svg)$/)
)

const Configs: ConfigsType = {
  url: 'http://localhost:3000',
  kakaoToken: '',
  kakaoImage: WS,
  weddingDate: 'May 25th, 2025',
  weddingLocation: '億家主题宴会厅 - Yijia Theme Banquet Hall',
  weddingAddress: '8, Jln Adda 2, Adda Heights, 81100 Johor Bahru, Johor',
  groom: {
    name: 'Sui Zer',
    mandarin: '绥泽',
    accountNumber: 'Bank: ***-***-******',
    fatherName: 'Father Name',
    fatherAccountNumber: 'Bank: ***-***-******',
    motherName: 'Mother Name',
    motherAccountNumber: 'Bank: ***-***-******'
  },
  bride: {
    name: 'Lycia',
    mandarin: '丽萱',
    accountNumber: 'Bank: ***-***-******',
    fatherName: 'Father Name',
    fatherAccountNumber: 'Bank: ***-***-******',
    motherName: 'Mother Name',
    motherAccountNumber: 'Bank: ***-***-******'
  },
  titleImage: TitleImage,
  locationMapImage: LocationMapImage,
  greetingImage: GalleryPhotoGreeting,
  mainImages: introduceImages,
  galleryImages: galleryImages,
  musicPlayerImages: musicPlayerImages,
  music: [
    { src: Music, artist: 'Calum Scott', title: 'You are the reason' },
    { src: Music2, artist: '梁心頤(南拳媽媽) · 王威登(鐵竹堂)', title: 'Say U Love Me' },
    { src: Music3, artist: 'Skylar Grey', title: 'Everything I need' },
    { src: Music4, artist: 'Christina Perri', title: 'A Thousand Years' },
    { src: Music5, artist: '王藍茵', title: '恶作剧' }
  ],
  backendURL: 'https://weddingbackend-ba3z.onrender.com/users'
}

export type MusicDetail = {
  src: string
  artist: string
  title: string
}

export type ConfigsType = {
  url: string
  kakaoToken: string
  kakaoImage: string
  weddingDate: string
  weddingLocation: string
  weddingAddress: string
  groom: Person
  bride: Person
  titleImage: string
  locationMapImage: string
  greetingImage: string
  mainImages: string[]
  galleryImages: string[]
  musicPlayerImages: string[]
  music: MusicDetail[]
  backendURL: string
}

type Person = {
  name: string
  mandarin: string
  accountNumber: string
  fatherName?: string
  fatherAccountNumber?: string
  motherName?: string
  motherAccountNumber?: string
}

export default Configs
