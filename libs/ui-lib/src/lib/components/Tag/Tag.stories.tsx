import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Tag, TagProps } from './Tag';

export default {
  title: 'UI Lib / Tag',
  component: Tag,
  argTypes: {},
} as Meta;

const Template: Story<TagProps> = (args) => (
  <div style={{ margin: 20 }}>
    <Tag {...args} />
  </div>
);

export const grey = Template.bind({});
grey.args = {
  label: 'Grey Tag',
  color: 'grey',
};

export const brown = Template.bind({});
brown.args = {
  label: 'Brown Tag',
  color: 'brown',
};

export const red = Template.bind({});
red.args = {
  label: 'Red Tag',
  color: 'red',
};

export const magenta = Template.bind({});
magenta.args = {
  label: 'Magenta Tag',
  color: 'magenta',
};

export const secondary1 = Template.bind({});
secondary1.args = {
  label: 'Secondary1 Tag',
  color: 'secondary1',
};

export const primary01 = Template.bind({});
primary01.args = {
  label: 'Primary1 Tag',
  color: 'primary1',
};

export const primary2 = Template.bind({});
primary2.args = {
  label: 'Primary2 Tag',
  color: 'primary2',
};

export const teal = Template.bind({});
teal.args = {
  label: 'Teal Tag',
  color: 'teal',
};

export const green = Template.bind({});
green.args = {
  label: 'Green Tag',
  color: 'green',
};

export const isRemovable = Template.bind({});
isRemovable.args = {
  label: 'Removable',
  color: 'magenta',
  isRemovable: true,
};

export const isDraggable = Template.bind({});
isDraggable.args = {
  label: 'Draggable',
  color: 'magenta',
  isDraggable: true,
};

export const withIcon = Template.bind({});
withIcon.args = {
  label: 'Icon and Draggable',
  color: 'magenta',
  withIcon: true,
  isDraggable: true,
};

export const withIconAndRemovable = Template.bind({});
withIconAndRemovable.args = {
  label: 'Icon and Removable',
  color: 'magenta',
  withIcon: true,
  isRemovable: true,
};
