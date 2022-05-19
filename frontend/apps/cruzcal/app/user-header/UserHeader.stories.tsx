import { Story, Meta } from '@storybook/react';
import { UserHeader } from './UserHeader';

export default {
  component: UserHeader,
  title: 'UserHeader',
} as Meta;

const Template: Story = (args) => <UserHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
