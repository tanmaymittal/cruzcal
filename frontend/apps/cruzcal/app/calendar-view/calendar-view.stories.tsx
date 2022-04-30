import { Story, Meta } from '@storybook/react';
import { CalendarView, CalendarViewProps } from './calendar-view';

export default {
  component: CalendarView,
  title: 'CalendarView',
} as Meta;

const Template: Story<CalendarViewProps> = (args) => <CalendarView {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
