import { Story, Meta } from '@storybook/react';
import { SubjectFilter } from './SubjectFilter';

export default {
  component: SubjectFilter,
  title: 'SubjectFilter',
} as Meta;

const Template: Story = (args) => <SubjectFilter {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
