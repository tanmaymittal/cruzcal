import UserHeader from '../user-header/UserHeader';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <div className="container">
      <div className="mb-10 text-white">
        <div className="flex justify-center items-center">
          <h1 className="text-7xl mb-2">CruzCal</h1>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-xl mb-2">All your classes. One calendar file.</p>
        </div>
        <div className='flex flex-row-reverse'>
          <UserHeader />
        </div>
      </div>      
    </div>
  )
}

export default Header;
