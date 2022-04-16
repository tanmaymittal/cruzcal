import {FC} from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
  .page {
  }
`;

const PageHeader: FC = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="font-bold text-5xl mb-2">CruzCal</h1>
      </div>

      <div className="flex justify-center items-center">
        <p className="font-bold text-xl mb-2">All your classes. One calendar file.</p>
      </div>
    </>
  );
}

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <PageHeader />
    </StyledPage>
  );
}

export default Index;
