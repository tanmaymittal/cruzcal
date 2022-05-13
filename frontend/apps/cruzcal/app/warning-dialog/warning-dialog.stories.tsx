import { Story, Meta } from '@storybook/react';
import { WarningDialog, WarningDialogProps } from './warning-dialog';

export default {
  component: WarningDialog,
  title: 'WarningDialog',
} as Meta;

const Template: Story<WarningDialogProps> = (args) => (
  <WarningDialog {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  name: "warnings",
};

