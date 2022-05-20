import { Story, Meta } from '@storybook/react';
import { SubmitICS } from './SubmitICS';

export default {
  component: SubmitICS,
  title: 'SubmitICS',
} as Meta;

const Template: Story = (args) => <SubmitICS {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
