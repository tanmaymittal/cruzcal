/* eslint-disable @next/next/no-img-element */
import { useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';

import { versionAtom } from '../atoms/version';

import Header from '../app/header/header';
import Footer from '../app/footer/footer';
import Mobile from '../app/mobile/mobile';
import Desktop from '../app/desktop/desktop';

export function Index() {
  const dispatchVersion = useUpdateAtom(versionAtom);

  useEffect(() => {
    dispatchVersion({type: 'check'});
  }, []);

  return (
    <>
      <Header />
      <div className='block lg:hidden'>
        <Mobile />
      </div>
      <div className='hidden lg:block'>
        <Desktop />
      </div>
      <Footer />
    </>
  );
}

export default Index;