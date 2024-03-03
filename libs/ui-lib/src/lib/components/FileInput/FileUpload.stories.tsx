import React from 'react';

import { Story, Meta } from '@storybook/react';

import { FileMeta, FileUpload, FileUploadProps } from './FileUpload';

export default {
  title: 'UI Lib / File Upload',
  component: FileUpload,
  argTypes: {},
} as Meta;

const Template: Story<FileUploadProps> = (args) => (
  <>
    <FileUpload {...args} />
  </>
);

const uploadToS3Mock = async (): Promise<FileMeta> => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        url: 'http://localhost:8080/asdf.jpg',
      });
    }, 3000);
  });
};

const uploadToS3FailMock = async (): Promise<Partial<FileMeta>> => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        url: undefined,
      });
    }, 3000);
  });
};

const saveToServer = (url: string) => {
  console.log('url', url);
};
const deleteFromServerAndStorage = () => {
  console.log('delete');
};

export const base = Template.bind({});
base.args = {
  label: 'Upload File',
  onChange: uploadToS3Mock,
  onSuccess: async (url) => {
    await saveToServer(url);
  },
  onError: function () {
    console.log('error');
  },
  onDelete: async () => {
    // This will clear the DB from the uploaded file, and if needed, will delete the file from Storage
    await deleteFromServerAndStorage();
  },
  accept: ['image/png', 'image/jpeg', 'application/pdf', 'image/jpg'],
};

export const withSecondaryButton = Template.bind({});
withSecondaryButton.args = {
  ...base.args,
  buttonVariant: 'secondary',
};

export const withLongFileName = Template.bind({});
withLongFileName.args = {
  ...base.args,
  fileNameInProp: 'longFileNameWithCaption',
};

export const onlyPng = Template.bind({});
onlyPng.args = {
  ...base.args,
  accept: ['image/png'],
};

export const onlyJpeg = Template.bind({});
onlyJpeg.args = {
  ...base.args,
  accept: ['image/jpeg'],
};

export const onlyPdf = Template.bind({});
onlyPdf.args = {
  ...base.args,
  accept: ['application/pdf'],
};

export const withMaxFileSize = Template.bind({});
withMaxFileSize.args = {
  ...base.args,
  maxFileSize: 500000,
};

export const withoutMaxFileSize = Template.bind({});
withoutMaxFileSize.args = {
  ...base.args,
  maxFileSize: 5000000,
};

export const withError = Template.bind({});
withError.args = {
  ...base.args,
  fileNameInProp: 'longFileNameWithCaption',
  errorTextInProp: 'Max file size is 500kb.',
};

export const withoutUrl = Template.bind({});
withoutUrl.args = {
  ...base.args,
  onChange: uploadToS3FailMock,
};
