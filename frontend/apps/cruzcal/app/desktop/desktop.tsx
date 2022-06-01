import CourseSelectionList from '../course-selection/CourseSelectionList';
import dynamic from 'next/dynamic'

export interface DesktopProps {}

const Calendar = dynamic(
  () => import('../calendar-view/calendar-view'),
  { ssr: false}
)

export const Desktop = () => {
  return (
    <div className="container mx-auto p-3">
      <div className="flex flex-col md:flex-row gap-x-14 mb-5">
        <div className="basis-2/3 border-solid border-2 border-white rounded-lg text-white">
          <Calendar />
        </div>
        <div className="basis-1/3">
          <CourseSelectionList />
        </div>
      </div>
    </div>    
  );
}

export default Desktop