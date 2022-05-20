import { Story, Meta } from '@storybook/react';
import { CourseFilter } from './CourseFilter';

export default {
  component: CourseFilter,
  title: 'CourseFilter',
} as Meta;

const Template: Story = (args) => <CourseFilter {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
