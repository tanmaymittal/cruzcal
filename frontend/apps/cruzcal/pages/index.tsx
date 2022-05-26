/* eslint-disable @next/next/no-img-element */
import { useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';

import { versionAtom } from '../atoms/version';

import Header from '../app/header/header';
import Footer from '../app/footer/footer';
import Mobile from './mobile';
import Desktop from './desktop';

export function Index() {
  const dispatchVersion = useUpdateAtom(versionAtom);

  useEffect(() => {
    dispatchVersion({type: 'check'});
  }, []);

  return (
    <>
      <Header />
      <div className='block md:hidden'>
        <Mobile />
      </div>
      <div className='hidden md:block'>
        <Desktop />
      </div>
      <Footer />
    </>
  );
}

export default Index;