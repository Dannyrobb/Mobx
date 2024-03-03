import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Modal, ModalProps } from './Modal';

export default {
  title: 'UI Lib / Modal',
  component: Modal,
  argTypes: {},
} as Meta;

const Template: Story<ModalProps> = (args) => (
  <>
    <Modal {...args}>Some body of a modal explaning stuff</Modal>
  </>
);
export const base = Template.bind({});
base.args = {};
