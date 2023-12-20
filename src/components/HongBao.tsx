import { styled } from '@stitches/react';

const isPortrait = window.matchMedia('(orientation: portrait)').matches;

const Layout = styled('div', {
  textAlign: 'center',
  width: '100%',
  padding: '15px 10%',
  display: 'inline-block',
});

const Envelope = styled('div', {
  background: '#A5423A',
  width: '100%',
  borderRadius: '10px',
  margin: '0 auto',
  padding: '0px 0px 40% 0px',
});

const Cover = styled('div', {
  padding: '20% 0',
  border: '1px solid #BD503A',
  backgroundColor: '#BD503A',
  borderRadius: '10px 10px 50% 50% / 10px 10px 15% 15%',
  boxShadow: '0px 4px 0px -1px rgba(0,0,0,0.2)',
});

const Sticker = styled('div', {
  width: isPortrait ? '2.2em' : '6em',
  height: isPortrait ? '2.2em' : '6em',
  border: '1px solid #FFA73A',
  backgroundColor: '#FFA73A',
  borderRadius: '50%',
  color: '#FFF',
  display: 'inline-block',
  boxShadow: '0px 4px 0px 0px rgba(0, 0, 0, 0.2)',
  marginTop: '-3em',
});

const Title = styled('h2', { fontSize: isPortrait ? '1.5em' : '3em', color: '#FFF' });

const SubTitle = styled('div', {
  margin: '15px 0',
  fontSize: isPortrait ? '0.8em' : '2em',
  fontWeight: 600,
  color: '#EEEEEE',
});

type HongBaoProps = {
  title: string;
  subTitle: string;
  onClick?: () => void;
};

const HongBao = ({ title, subTitle, onClick }: HongBaoProps) => {
  return (
    <Layout onClick={onClick}>
      <Envelope>
        <Cover>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </Cover>
        <Sticker />
      </Envelope>
    </Layout>
  );
};

export default HongBao;
