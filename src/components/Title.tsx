import { styled } from '@stitches/react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { ConfigsType } from '../configs';

const isPortrait = window.matchMedia('(orientation: portrait)').matches;

const Section = styled('section', {
  height: '100%',
  background: '#DADADA',
  overflow: 'hidden',
  position: 'relative',
});

const Layout = styled('div', {
  width: '100%',
  color: '#5D4037',
  textAlign: 'center',
  marginTop: '3.5%',
  animation: 'fadein 2.5s',
});

const TitleLayout = styled('p', {
  width: '100%',
  fontSize: isPortrait ? '2.5em' : '3.5em',
  margin: 0,
  fontWeight: '500',
});

const SubTitleLayout = styled('p', {
  width: '100%',
  fontSize: isPortrait ? '1.2em' : '2em',
  margin: '24px 0',
  fontWeight: '300',
});

const ImageLayout = styled('div', {
  width: '100%',
  background: '#DADADA',
  bottom: '-5px',
  textAlign: 'center',
  position: 'absolute',
});

const Image = styled('img', {
  width: isPortrait ? '100%' : '40%',
});

type TitleProps = {
  config: ConfigsType;
};

const Title = ({ config }: TitleProps) => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        gravity={0.2}
        colors={['#FFCDD2', '#F8BBD0', '#D1C4E9']}
        recycle={false}
        style={{ position: 'fixed' }}
      />
      <Section>
        <Layout>
          <SubTitleLayout>WEDDING INVITATION</SubTitleLayout>
          <TitleLayout>
            {config.groom.name} &amp; {config.bride.name}
          </TitleLayout>
          <SubTitleLayout>
            {config.weddingDate}
            <br />
            {config.weddingLocation}
          </SubTitleLayout>
        </Layout>
        <ImageLayout>
          <Image src={config.titleImage} alt="Wedding Invitation Title Picutre" />
        </ImageLayout>
      </Section>
    </>
  );
};

export default Title;
