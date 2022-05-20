import { Story, Meta } from '@storybook/react';
import { TermFilter } from './TermFilter';

export default {
  component: TermFilter,
  title: 'TermFilter',
} as Meta;

const Template: Story = (args) => <TermFilter {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
