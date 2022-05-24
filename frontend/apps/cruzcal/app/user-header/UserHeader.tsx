import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useAtom, PrimitiveAtom } from 'jotai';
import { userAtom, UserSession } from '../../atoms/user';
import ClientOnly from '../client-only/ClientOnly';

export const LoginButton = () => {
  return (
    <form action="/api/auth/google">
      <button type="submit" className="flex gap-3 align-middle bg-white rounded-lg px-3 py-1 hover:bg-gray-300">
        Sign in with Google <FontAwesomeIcon icon={faGoogle} className="self-center" />
      </button>
    </form>
  );
};

export const LogoutButton = ({onClick}) => {
  return (
    <form action="/api/logout" method="post">
      <button type="submit" className="flex gap-3 align-middle text-black bg-white rounded-lg px-3 py-1 hover:bg-gray-300">
        Log out <FontAwesomeIcon icon={faSignOut} className='self-center'/>
      </button>
    </form>
  );
}

const UserHeaderAsync = () => {
  const [user, setUser] = useAtom(userAtom as PrimitiveAtom<UserSession>);
  
  if (user === null)
    return <LoginButton />;
  
  return (
    <div className="flex gap-3 align-middle text-white items-center">
      <div> Hi, {user.displayName}</div>
      <div>|</div>
      <LogoutButton onClick={() => setUser(null)}/>
    </div>
  )
}

export const UserHeader = () => {
  return (
    <ClientOnly>
      <UserHeaderAsync />
    </ClientOnly>
  );
}

export default UserHeader;