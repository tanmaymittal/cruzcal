/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <div className="flex min-h-screen justify-center items-center">
        <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
          <img
            className="w-full"
            src="https://tailwindcss.com/img/card-top.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Next + Tailwind ❤️</div>
            <p className="text-grey-darker text-base">
              Next and Tailwind CSS are a match made in heaven, check out this article on how
              you can combine these two for your next app.
            </p>
          </div>
        </div>
      </div>
    </StyledPage>
  );
}

export default Index;
