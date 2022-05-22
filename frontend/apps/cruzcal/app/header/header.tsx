import UserHeader from '../user-header/UserHeader';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <div className="container mx-auto p-3">
      <h1 className="text-white text-7xl mb-2">CruzCal</h1>
      <p className="text-white text-xl mb-2">All your classes. One calendar file.</p>
      <div className='flex flex-row-reverse'>
        <UserHeader />
      </div>
    </div>
  )
}

export default Header;
