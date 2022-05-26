/* eslint-disable @next/next/no-img-element */
import { useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';

import CourseSelectionList from '../app/course-selection/CourseSelectionList';
import Header from '../app/header/header';
import Footer from '../app/footer/footer';
import { versionAtom } from '../atoms/version';
import dynamic from 'next/dynamic'
import Mobile from './mobile';
import Desktop from './desktop';

const Calendar = dynamic(
  () => import('../app/calendar-view/calendar-view'),
  { ssr: false}
)

export function Index() {
  const dispatchVersion = useUpdateAtom(versionAtom);

  useEffect(() => {
    dispatchVersion({type: 'check'});
  }, []);

  return (
    <>
      <Header />
      <Mobile />
      <Desktop />
      <Footer />
    </>
  );
}

export default Index;