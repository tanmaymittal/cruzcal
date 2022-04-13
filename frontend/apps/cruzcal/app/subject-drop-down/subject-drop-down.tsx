import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SubjectDropDownProps {}

const StyledSubjectDropDown = styled.div`
  color: pink;
`;

export function SubjectDropDown(props: SubjectDropDownProps) {
  return (
    <StyledSubjectDropDown>
      <h1>Welcome to SubjectDropDown!</h1>
    </StyledSubjectDropDown>
  );
}

export default SubjectDropDown;
