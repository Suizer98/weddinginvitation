import LocationMapImage from './resources/LocationMap.png'
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
import GalleryPhoto1 from './resources/photo1.jpg'
import GalleryPhoto2 from './resources/photo2.jpg'
import GalleryPhoto3 from './resources/photo3.jpg'
import GalleryPhoto4 from './resources/photo4.jpg'
import GalleryPhoto5 from './resources/photo5.jpg'
import GalleryPhoto6 from './resources/photo6.jpg'
import G1 from './resources/photo8.jpg'
import G2 from './resources/photo9.jpg'
// @ts-ignore
import GalleryPhotoGreeting from './resources/photoGreeting.jpg'
import TitleImage from './resources/ring.jpg'
import WS from './resources/ws.png'

const Configs: ConfigsType = {
  url: 'http://localhost:3000',
  kakaoToken: '',
  kakaoImage: WS,
  weddingDate: 'May 25th, 2025',
  weddingLocation: '億家主题宴会厅 - Yijia Theme Banquet Hall',
  weddingAddress: '8, Jln Adda 2, Adda Heights, 81100 Johor Bahru, Johor',
  groom: {
    name: 'Sui Zer',
    accountNumber: 'Bank: ***-***-******',
    fatherName: 'Father Name',
    fatherAccountNumber: 'Bank: ***-***-******',
    motherName: 'Mother Name',
    motherAccountNumber: 'Bank: ***-***-******'
  },
  bride: {
    name: 'Lycia',
    accountNumber: 'Bank: ***-***-******',
    fatherName: 'Father Name',
    fatherAccountNumber: 'Bank: ***-***-******',
    motherName: 'Mother Name',
    motherAccountNumber: 'Bank: ***-***-******'
  },
  titleImage: TitleImage,
  locationMapImage: LocationMapImage,
  greetingImage: GalleryPhotoGreeting,
  mainImages: [G1, G2],
  galleryImages: [
    GalleryPhoto1,
    GalleryPhoto2,
    GalleryPhoto3,
    GalleryPhoto4,
    GalleryPhoto5,
    GalleryPhoto6
  ],
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
  music: MusicDetail[]
  backendURL: string
}

type Person = {
  name: string
  accountNumber: string
  fatherName?: string
  fatherAccountNumber?: string
  motherName?: string
  motherAccountNumber?: string
}

export default Configs
