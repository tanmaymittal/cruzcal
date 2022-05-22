import { Story, Meta } from '@storybook/react';
import { SubmitGoogle } from './SubmitGoogle';

export default {
  component: SubmitGoogle,
  title: 'SubmitGoogle',
} as Meta;

const Template: Story = (args) => <SubmitGoogle {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
