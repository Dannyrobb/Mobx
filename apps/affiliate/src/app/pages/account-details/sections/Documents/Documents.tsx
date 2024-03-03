import * as React from 'react';
import {FileUpload, Tag, Typography} from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import {observer} from 'mobx-react';
import DocumentsForm from '../../../../stores/models/DocumentsForm';
import {useStore} from '../../../../stores/setupContext';
// eslint-disable-next-line import/no-unresolved
import {Messages} from '../../../../strings';

export interface DocumentsProps {
  uploadFile: DocumentsForm['uploadFile'];
  messages: Messages;
  submitDocument: DocumentsForm['submitDocument'];
  documentsMeta: DocumentsForm['documentsMeta'];
}

const Table = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
}));

const TableRow = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1fr',
  borderBottom: `1px solid ${theme.palette.blacks.border}`,
  padding: `${theme.gutters.base * 2}px ${theme.gutters.base * 4}px`,
  gap: `${theme.gutters.base * 4}px`,
}));

export const Documents: React.FunctionComponent<DocumentsProps> = ({ uploadFile, submitDocument, documentsMeta }) => {
  return (
    <>
      <Table>
        <TableRow>
          <Typography {...{ variant: 'body2', color: 'main', bold: true }}>File name</Typography>
          <Typography {...{ variant: 'subtitle2', color: 'main', bold: true }}>File</Typography>
          <Typography {...{ variant: 'subtitle2', color: 'main', bold: true }}>Status</Typography>
        </TableRow>

        {documentsMeta &&
          documentsMeta.map((doc) => {
            return (
              <TableRow key={doc.label}>
                <Typography {...{ variant: 'body2', color: 'dark' }}>{doc.label}</Typography>
                <FileUpload
                  {...{
                    label: 'File Upload',
                    status: doc.status,
                    onChange: (file: any) => uploadFile(file),
                    onError: () => {
                      console.log('error');
                    },
                    onDelete: () => {
                      console.log('delete');
                    },
                    onSuccess: (fileLink: any) => {
                      submitDocument(fileLink, doc.documentKey);
                      console.log('great');
                    },
                    accept: ['image/jpeg', 'image/png'],
                  }}
                />
                <div>
                  {doc.status && (
                    <Tag
                      {...{
                        label: doc.status,
                        color: doc.status == 'Approved' ? 'green' : doc.status == 'Pending' ? 'grey' : 'red',
                      }}
                    />
                  )}
                </div>
              </TableRow>
            );
          })}
      </Table>
    </>
  );
};

const Observed = observer(Documents);

const WithStoreConnection = () => {
  const { accountDetails, i18n } = useStore();

  const { documentsForm } = accountDetails;
  const { submitDocument, uploadFile, documentsMeta } = documentsForm;
  const { messages } = i18n;

  return <Observed {...{ messages, uploadFile, submitDocument, documentsMeta }} />;
};

export default observer(WithStoreConnection);
