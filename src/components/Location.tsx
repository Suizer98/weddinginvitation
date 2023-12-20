import { useRef } from 'react';
import { styled } from '@stitches/react';
import { ConfigsType } from '../configs';

const isPortrait = window.matchMedia('(orientation: portrait)').matches;

const Section = styled('section', {
  background: '#EFEBE9',
  overflow: 'hidden',
  position: 'relative',
});

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '20% 0% 15% 5%' : '5% 0% 5% 10%',
});

const Title = styled('p', {
  color: '#795548',
  width: '100%',
  fontSize: isPortrait ? '2.5em' : '3.5em',
  margin: 0,
  fontWeight: '500',
});

const SubTitle = styled('p', {
  color: '#795548',
  width: '100%',
  fontSize: isPortrait ? '1.2em' : '2em',
  margin: '24px 0',
  fontWeight: '300',
  lineHeight: 1.8,
});

type LocationProps = {
  config: ConfigsType;
};

const Location = ({ config }: LocationProps) => {
  const ref = useRef<HTMLSelectElement>(null);

  // eslint-disable-next-line jsx-a11y/img-redundant-alt
  return (
    <Section ref={ref}>
      <Layout>
        <Title>Wedding Avenue</Title>
        <SubTitle>
          億家主题宴会厅 - Yijia Theme Banquet Hall
          <br />
          Address:
          <br />
          8, Jln Adda 2, Adda Heights, 81100 Johor Bahru, Johor
          <br />
          <img
            style={{ width: isPortrait ? '90%' : '60%' }}
            src={config.locationMapImage}
            alt="Wedding Invitation Title"
          />
        </SubTitle>
      </Layout>
    </Section>
  );
};

export default Location;
