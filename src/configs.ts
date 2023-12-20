import TitleImage from './resources/Title.png';
import LocationMapImage from './resources/LocationMap.png';
import GalleryPhoto1 from './resources/Gallery_Photo_1.png';
import GalleryPhoto2 from './resources/Gallery_Photo_2.png';
import GalleryPhoto3 from './resources/Gallery_Photo_3.png';
import GalleryPhoto4 from './resources/Gallery_Photo_4.png';
import GalleryPhoto5 from './resources/Gallery_Photo_5.png';
import GalleryPhoto6 from './resources/Gallery_Photo_6.png';


const Configs: ConfigsType = {
  url: 'http://localhost:3000',
  kakaoToken: '',
  kakaoImage: '',
  weddingDate: 'March 1, 2025',
  weddingLocation: '億家主题宴会厅 - 𝗬𝗶𝗝𝗶𝗮 𝗧𝗵𝗲𝗺𝗲 𝗕𝗮𝗻𝗾𝘂𝗲𝘁 𝗛𝗮𝗹𝗹',
  groom: {
    name: 'Sui Zer',
    accountNumber: 'Bank: ***-***-******',
    fatherName: 'Father Name',
    fatherAccountNumber: 'Bank: ***-***-******',
    motherName: 'Mother Name',
    motherAccountNumber: 'Bank: ***-***-******',
  },
  bride: {
    name: 'Lycia',
    accountNumber: 'Bank: ***-***-******',
    fatherName: 'Father Name',
    fatherAccountNumber: 'Bank: ***-***-******',
    motherName: 'Mother Name',
    motherAccountNumber: 'Bank: ***-***-******',
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
  ],
};

export type ConfigsType = {
  url: string;
  kakaoToken: string;
  kakaoImage: string;
  weddingDate: string;
  weddingLocation: string;
  groom: Person;
  bride: Person;
  titleImage: string;
  locationMapImage: string;
  galleryImages: string[];
};

type Person = {
  name: string;
  accountNumber: string;
  fatherName?: string;
  fatherAccountNumber?: string;
  motherName?: string;
  motherAccountNumber?: string;
};

export default Configs;
