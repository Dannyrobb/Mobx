import React, { useRef, useState } from 'react';

import { CheckedOutlineIcon, CloseIcon, InfoFilledIcon, LoadingIcon } from '@cellxpert/icons';
import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

import Button from '../Button/Button';

export interface FileMeta {
  url: string;
}

export type AcceptedMimeType = 'image/png' | 'image/jpeg' | 'application/pdf' | 'image/jpg';

export interface FileUploadProps {
  /**
   * What size should it be?
   * @default small
   */
  size?: 'small' | 'medium' | 'large';
  label: string | 'File Upload';
  /**
   * If there is already a primary button on the page, use a secondary button for the file uploader so it does not conflict with the primary action.
   * @default 'ghostBlue'
   */
  buttonVariant?: 'primary' | 'secondary' | 'ghostBlue';
  /**
   * What to do when the user selects a file, where should it upload?
   * If we want the file to auto publish, we put it in this onChange.
   */
  onChange: (file: File) => Promise<Partial<FileMeta>>;
  onSuccess: (data: string) => void;
  onError: ({ message }: { message: string }) => void;
  onDelete: (fileName: string) => void;
  /**
   * Timeout for changing the icons
   * @default 2000
   */
  successTimeout?: number;
  status?: string;
  multiple?: boolean;
  fileNameInProp?: string;
  errorTextInProp?: string;
  /**
   * in Kb
   * @default limitless
   */
  maxFileSize?: number;

  accept: AcceptedMimeType[];
}

const FileWrapper = styled('div')<{ hasError: boolean }>(({ hasError }) => ({
  ...theme.typography.meta.body2,

  color: theme.palette.text.main,
  fontWeight: 600,
  position: 'relative',
  backgroundColor: theme.palette.additional.grey[100],
  width: '224px',
  maxWidth: '224px',
  ...(hasError && {
    border: `2px solid ${theme.palette.main.primary1.base}`,
    borderColor: theme.palette.indicators.error,
  }),
}));

export const TextWrapper = styled('div')<Pick<FileUploadProps, 'size'>>(({ size }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  ...(size === 'small' && {
    padding: `${theme.gutters.base * 0.75}px ${theme.gutters.base * 2}px`,
  }),
  ...(size === 'medium' && {
    padding: `${theme.gutters.base * 1.25}px ${theme.gutters.base * 2}px`,
    //padding: 10px 16px;
  }),
  ...(size === 'large' && {
    padding: `${theme.gutters.base * 1.75}px ${theme.gutters.base * 2}px`,
  }),
}));

const IconWrapper = styled('div')(() => ({
  alignSelf: 'center',
  cursor: 'pointer',
  alignItems: 'center',
}));

const ErrorWrapper = styled('div')(() => ({
  color: theme.palette.text.error,
  borderTop: `1px solid ${theme.palette.blacks.border}`,
}));

const AlignCenter = styled('div')(() => ({
  display: 'flex',
  alignSelf: 'center',
}));

export const ErrorInfo = styled('div')<Pick<FileUploadProps, 'size'>>(({ size }) => ({
  color: theme.palette.text.error,
  fontSize: 12,
  display: 'block',
  ...(size === 'small' && {
    padding: `${theme.gutters.base * 0.75}px ${theme.gutters.base * 2}px`,
  }),
  ...(size === 'medium' && {
    padding: `${theme.gutters.base * 1.25}px ${theme.gutters.base * 2}px`,
  }),
  ...(size === 'large' && {
    padding: `${theme.gutters.base * 1.75}px ${theme.gutters.base * 2}px`,
  }),
}));

const Label = styled('label')(() => ({
  ...theme.typography.meta.body2,
  color: theme.palette.text.main,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

export const FileUpload: React.FunctionComponent<FileUploadProps> = ({
  onChange,
  size = 'small',
  label,
  onSuccess,
  status,
  maxFileSize,
  onError,
  onDelete,
  accept,
  buttonVariant = 'ghostBlue',
  fileNameInProp,
  errorTextInProp,
  successTimeout,
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setName] = useState<Array<string>>([]);
  const [files, setFiles] = useState<Array<File>>([]);
  const [errorText, setErrorText] = useState<string>('');
  const [isSucceeded, setIsSucceeded] = useState<boolean>(false);
  const [allowRemoval, setAllowRemoval] = useState<boolean>(false);
  console.log({ files });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const click = () => {
    if (null !== fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  React.useEffect(() => {
    if (status) {
      setName(['File Uploaded']); //TODO check status text to know what to do with
      setAllowRemoval(true);
    }
    if (fileNameInProp) {
      setName([fileNameInProp]);
    }
    if (errorTextInProp) {
      setErrorText(errorTextInProp);
    }
  }, []);

  const handleChange = async (e: React.SyntheticEvent<HTMLInputElement>): Promise<void> => {
    const currentFile = (e.target as HTMLInputElement).files?.[0];

    if (!currentFile) {
      return;
    }

    if (maxFileSize && currentFile.size >= maxFileSize) {
      setErrorText(`Max file size is ${maxFileSize}kb.`);
      onError({ message: errorText });
      return;
    }

    if (!accept.includes(currentFile.type as FileUploadProps['accept'][0])) {
      setErrorText(`Supported file types are: ${accept.join()}`);
      onError({ message: errorText });
      return;
    }

    // setName((fName) => [...fName, currentFile.name]);TODO for multiple
    setName(['File Uploaded']);
    setFiles([currentFile]);
    setIsUploading(true);

    try {
      const { url } = await onChange(currentFile);

      if (!url) {
        setErrorText('Something is wrong');
        setIsUploading(false);
        setIsSucceeded(false);
        return;
      }

      await onSuccess(url); //undefined
      setIsUploading(false);
      setIsSucceeded(true);
      window.setTimeout(() => {
        setAllowRemoval(true);
      }, successTimeout);
    } catch (e: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onError({ message: e?.message ?? 'Unknown Error' });
      window.setTimeout(() => {
        setAllowRemoval(true);
      }, successTimeout);
    }
  };

  const handleDelete = async (fileName: string) => {
    try {
      setIsUploading(true);
      await onDelete(fileName);
      setName([]);
      setIsUploading(false);
      setIsSucceeded(false);
      setAllowRemoval(false);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onError({ message: e?.message ?? 'Unknown Error' });
    }
  };

  return (
    <>
      <input
        type="file"
        accept={accept.join()}
        onChange={handleChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />

      {fileName.length == 0 && <Button {...{ variant: buttonVariant, size: size, label: label, onClick: click }} />}
      {fileName &&
        fileName.map((name) => {
          return (
            <FileWrapper key={name} {...{ hasError: Boolean(errorText) }}>
              <TextWrapper {...{ size: size }}>
                <Label>{name}</Label>
                <IconWrapper>
                  {errorText && (
                    <AlignCenter>
                      <InfoFilledIcon {...{ color: 'error', width: 20, height: 17 }} />
                      <CloseIcon {...{ onClick: () => handleDelete(name), width: 16, height: 17, color: 'grey' }} />
                    </AlignCenter>
                  )}
                  {isUploading && (
                    <AlignCenter>
                      <LoadingIcon {...{ width: 16, height: 17, color: 'primary1' }} />
                    </AlignCenter>
                  )}
                  {allowRemoval && (
                    <AlignCenter>
                      <CloseIcon {...{ onClick: () => handleDelete(name), width: 16, height: 17, color: 'grey' }} />
                    </AlignCenter>
                  )}
                  {isSucceeded && !allowRemoval && (
                    <AlignCenter>
                      <CheckedOutlineIcon {...{ width: 16, height: 16 }} />
                    </AlignCenter>
                  )}
                </IconWrapper>
              </TextWrapper>
              {errorText && (
                <ErrorWrapper>
                  <ErrorInfo {...{ size: size }}>{errorText}</ErrorInfo>
                </ErrorWrapper>
              )}
            </FileWrapper>
          );
        })}
    </>
  );
};

export default FileUpload;
