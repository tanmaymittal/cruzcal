import { Story, Meta } from '@storybook/react';
import { SubjectDropDown, SubjectDropDownProps } from './subject-drop-down';

export default {
  component: SubjectDropDown,
  title: 'SubjectDropDown',
  argTypes: {
    subjects: {
      control: 'object',
    }
  }
} as Meta;

const Template: Story<SubjectDropDownProps> = (args) => (
  <div className="flex flex-col items-center justify-center w-full">
    <SubjectDropDown {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  subjects: ["apple", "banana", "orange"]
};
