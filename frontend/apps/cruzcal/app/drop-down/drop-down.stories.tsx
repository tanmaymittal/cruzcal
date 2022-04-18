import { Story, Meta } from '@storybook/react';
import { DropDown, DropDownProps } from './drop-down';

export default {
  component: DropDown,
  title: 'DropDown',
  argTypes: {
    name: {
      control: 'text',
    },
    items: {
      control: 'object',
    }
  }
} as Meta;

const Template: Story<DropDownProps> = (args) => (
  <div className="flex flex-col items-center justify-center w-full">
    <DropDown {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  name: "Subject",
  items: ["Computer Science & Engineering", "Education", "Mathematics"]
};
