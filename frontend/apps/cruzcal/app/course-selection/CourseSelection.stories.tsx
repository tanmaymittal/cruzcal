import { Story, Meta } from '@storybook/react';
import { CourseSelection } from './CourseSelection';

export default {
  component: CourseSelection,
  title: 'CourseSelection',
} as Meta;

const Template: Story = (args) => <CourseSelection {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
