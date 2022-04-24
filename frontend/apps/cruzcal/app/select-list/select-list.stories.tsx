import { Story, Meta } from '@storybook/react';
import { SelectList, SelectListProps } from './select-list';

export default {
  component: SelectList,
  title: 'SelectList',
  argTypes: {
    listName: {
      control: 'text'
    },
    listOptions: {
      control: 'object'
    }
  }
} as Meta;

const Template: Story<SelectListProps> = (args) => <SelectList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  listName: "Test",
  listOptions: [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
  ]
};
