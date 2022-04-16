import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CourseListProps {}

const StyledCourseList = styled.div`
  color: pink;
`;

export function CourseList(props: CourseListProps) {
  return (
    <StyledCourseList>
      <h1>Welcome to CourseList!</h1>
    </StyledCourseList>
  );
}

export default CourseList;
