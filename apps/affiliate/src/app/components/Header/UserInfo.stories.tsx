import React from 'react';

import { Meta, Story } from '@storybook/react';

import { UserInfo, UserInfoProps } from './UserInfo';

export default {
  title: 'Account Details / Components / UserInfo',
  component: UserInfo,
  argTypes: {},
} as Meta;

const Template: Story<UserInfoProps> = (args) => <UserInfo {...args} />;

export const withNameAndNumberId = Template.bind({});
withNameAndNumberId.args = {
  name: 'Alex Raihelgaus',
  affiliateId: 93,
};

export const withNameAndStringId = Template.bind({});
withNameAndStringId.args = {
  name: 'Alex Raihelgaus',
  affiliateId: '234',
};

export const withAvatar = Template.bind({});
withAvatar.args = {
  avatarUrl: 'https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk',
  name: 'Alex Raihelgaus',
  affiliateId: '234234',
};
