import { useRef } from 'react';
import { styled } from '@stitches/react';
import useOnScreen from '../hooks/useOnScreen';
import { ConfigsType } from '../configs';

const isPortrait = window.matchMedia('(orientation: portrait)').matches;

const Layout = styled('div', {
  width: '100%',
  padding: isPortrait ? '30% 0% 15% 5%' : '5% 0% 5% 10%',
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

type GreetingProps = {
  config: ConfigsType;
};

const Greeting = ({ config }: GreetingProps) => {
  const ref = useRef<HTMLSelectElement>(null);
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '-125px');

  return (
    <section
      ref={ref}
      style={{
        height: '100vh',
        background: onScreen ? '#EFEBE9' : '#DADADA',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 1s ease-in',
      }}
    >
      <Layout>
        <Title>We're Getting Married</Title>
        <SubTitle>
          {config.bride.name}, born in winter,
          <br />
          {config.groom.name}, born in autumn,
          <br />
          <br />
          Two people with different interests and values
          <br />
          Have become alike through love
          <br />
          And are about to embark on the journey of life together.
          <br />
          <br />
          With warm encouragement and blessings,
          <br />
          Please illuminate the place of our energetic start.
          <br />
          <br />
          Son of {config.groom.fatherName} and {config.groom.motherName}, {config.groom.name}
          <br />
          Daughter of {config.bride.fatherName} and {config.bride.motherName}, {config.bride.name}
        </SubTitle>
      </Layout>
    </section>
  );
};

export default Greeting;
