import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useAtom, PrimitiveAtom } from 'jotai';
import { userAtom, UserSession } from '../../atoms/user';
import ClientOnly from '../client-only/ClientOnly';

export const LoginButton = () => {
  return (
    <form action="/api/auth/google">
      <button type="submit" className="flex gap-3 align-middle">
        <div className="text-white">Sign in with Google</div>
        <div>
          <FontAwesomeIcon icon={faGoogle} className="text-white" />
        </div>
      </button>
    </form>
  );
};

export const LogoutButton = ({onClick}) => {
  return (
    <form action="/api/logout" method="post">
      <button type="submit" className="flex gap-3 align-middle">
        <div className="text-white">Log out</div>
        <div>
          <FontAwesomeIcon icon={faSignOut} className="text-white" />
        </div>
      </button>
    </form>
  );
}

const UserHeaderAsync = () => {
  const [user, setUser] = useAtom(userAtom as PrimitiveAtom<UserSession>);
  
  if (user === null)
    return <LoginButton />;
  
  return (
    <div className="flex gap-3 align-middle text-white">
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