import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useAtomValue } from 'jotai/utils'
import { PrimitiveAtom } from 'jotai';
import { userAtom, UserSession } from './user';

export const LoginButton = () => {
  return (
    <form action="/api/auth/google">
      <button type="submit" className='flex gap-3 align-middle'>
        <div>Log in</div>
        <div>
          <FontAwesomeIcon icon={faSignIn} />
        </div>
      </button>
    </form>
  );
};

export const LogoutButton = () => {
  return (
    <form action="/api/logout" method="post">
      <button type="submit" className='flex gap-3 align-middle'>
        <div>Log out</div>
        <div>
          <FontAwesomeIcon icon={faSignOut} />
        </div>
      </button>
    </form>
  );
}

export const UserHeader = () => {
  const user = useAtomValue(userAtom as PrimitiveAtom<UserSession>);
  
  if (user === null)
    return <LoginButton />;
  
  return (
    <div className='flex gap-3 align-middle'>
      <div> Hi, {user.displayName}</div>
      <div>|</div>
      <LogoutButton/>
    </div>
  )
}

export default UserHeader;