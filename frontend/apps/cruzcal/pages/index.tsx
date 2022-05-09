/* eslint-disable @next/next/no-img-element */
import ClientOnly from '../app/client-only/ClientOnly';
import SubmitGoogle from '../app/submit-google/SubmitGoogle';
import UserHeader from '../app/user-header/UserHeader';

const Title = ({className, children}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export function Index() {
  /*
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <div className="w-screen p-2">
      <div className="p-2">
        <div className="mb-10 text-white">
          <Title className="flex flex-row justify-between">
            <h1 className="basis-6/10 text-6xl mb-2">CruzCal</h1>
            <UserHeader />
          </Title>
          <div className="flex justify-center items-center">
            <p className="text-xl mb-2">All your classes. One calendar file.</p>
          </div>
          <SubmitGoogle/>
        </div>
        <div className="flex flex-col md:flex-row gap-x-14">
          <div className="basis-3/5 border-solid border-2 border-white text-white">
            <h2 className="text-3xl mb-5">April 2022</h2>
          </div>
          <div className="basis-2/5">
            <div className="flex justify-center">
            </div>
          </div>
        </div>
        <div className="">
          Footer
        </div>
      </div>

    </div>
  );
}

export default Index;
