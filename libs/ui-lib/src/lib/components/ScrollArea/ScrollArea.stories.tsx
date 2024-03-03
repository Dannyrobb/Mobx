import { Story, Meta } from '@storybook/react';
import { ScrollArea, ScrollAreaProps } from './ScrollArea';

export default {
  title: 'UI Lib / Scroll Area',
  component: ScrollArea,
  argTypes: {},
} as Meta;

const Template: Story<ScrollAreaProps> = (args) => (
  <div style={{ margin: 30, height: 400, width: 400 }}>
    <ScrollArea {...args} />
  </div>
);

export const base = Template.bind({});
base.args = {
  content: <>sadsa</>,
};

export const prefilledContent = Template.bind({});
prefilledContent.args = {
  dualAxis: true,
  content: (
    <>
      <div style={{ whiteSpace: 'nowrap' }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur id aperiam, sed adipisci repudiandae
        iusto alias amet cumque reiciendis aspernatur vel asperiores inventore rerum commodi dignissimos nemo vero, iste
        earum!
      </div>
      {Array.from(new Array(100), (_) => (
        <div>testing</div>
      ))}
    </>
  ),
};
