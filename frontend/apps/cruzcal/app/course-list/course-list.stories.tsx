import { Story, Meta } from '@storybook/react';
import { CourseList, CourseListProps } from './course-list';

export default {
  component: CourseList,
  title: 'CourseList',
} as Meta;

const Template: Story<CourseListProps> = (args) => <CourseList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
