import { Story, Meta } from '@storybook/react';
import { ClientOnly } from './ClientOnly';

export default {
  component: ClientOnly,
  title: 'ClientOnly',
} as Meta;

const Template: Story = (args) => <ClientOnly {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
