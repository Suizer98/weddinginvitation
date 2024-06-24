import LocationMapImage from './resources/LocationMap.png'
// @ts-ignore
import Music from './resources/music.mp3'
// @ts-ignore
import GalleryPhoto1 from './resources/photo1.jpg'
import GalleryPhoto2 from './resources/photo2.jpg'
import GalleryPhoto3 from './resources/photo3.jpg'
import GalleryPhoto4 from './resources/photo4.jpg'
import GalleryPhoto5 from './resources/photo5.jpg'
import GalleryPhoto6 from './resources/photo6.jpg'
import GalleryPhoto7 from './resources/photo7.jpg'
import TitleImage from './resources/ring.jpg'

const Configs: ConfigsType = {
  url: 'http://localhost:3000',
  kakaoToken: '',
  kakaoImage: '',
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
  galleryImages: [
    GalleryPhoto1,
    GalleryPhoto2,
    GalleryPhoto3,
    GalleryPhoto4,
    GalleryPhoto5,
    GalleryPhoto6,
    GalleryPhoto7
  ],
  music: Music,
  backendURL: 'https://weddingbackend-ba3z.onrender.com/users'
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
  galleryImages: string[]
  music: string
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
