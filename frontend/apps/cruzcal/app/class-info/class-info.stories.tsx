import { Story, Meta } from '@storybook/react';
import { ClassInfo, ClassInfoProps } from './class-info';

export default {
  component: ClassInfo,
  title: 'ClassInfo',
} as Meta;

const Template: Story<ClassInfoProps> = (args) => <ClassInfo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: '',
};
