import { Story, Meta } from '@storybook/react';
import { CourseSelectionList } from './CourseSelectionList';

export default {
  component: CourseSelectionList,
  title: 'CourseSelectionList',
} as Meta;

const Template: Story = (args) => <CourseSelectionList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
