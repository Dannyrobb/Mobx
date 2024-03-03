import React, { useState } from 'react';
import PopupStore from '../../stores/PopupStore';
import {
  PopupContainer,
  CloseButton,
  TabsContainer,
  Tab,
  ContentContainer,
  Label,
  Input,
  TextArea,
  ButtonContainer,
  Button,
  UploadedFileContainer,
  AffiliatesInputContainer,
  AffiliateListItem,
} from './PopupStyledComponents';
import { Typography } from '@cellxpert/ui-lib';
import { theme } from '@cellxpert/theme';

interface MyPopUpProps {
  onClose?: () => void;
}
const MyPopUpComponent: React.FC<MyPopUpProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('Details');
  const [successfulSubmit, setSuccesfulSubmit] = useState(false);

  const [existingAffiliates, setexistingAffiliates] = useState([
    { name: 'Bobby Green', status: 'Approved' },
    { name: 'Connor Mcgregor', status: 'Declined' },
    { name: 'Shimmy Tavori', status: 'Pending' },
  ]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleContinue = () => {
    const tabs = ['Details', 'Upload Files', 'Share'];
    const currentIndex = tabs.findIndex((tab) => tab === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const tabs = ['Details', 'Upload Files', 'Share'];
    const currentIndex = tabs.findIndex((tab) => tab === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleFinish = () => {
    handleClose();
    setIsVisible(false);
    setSuccesfulSubmit(true);
  };

  return (
    <>
      {isVisible && (
        <PopupContainer>
          {console.log(PopupStore)}
          <CloseButton onClick={handleClose}>X</CloseButton>
          <TabsContainer>
            <Tab onClick={() => handleTabClick('Details')} active={activeTab === 'Details'} color="#f5cb6b">
              Details
            </Tab>
            <Tab onClick={() => handleTabClick('Upload Files')} active={activeTab === 'Upload Files'} color="#3b9ffc">
              Upload Files
            </Tab>
            <Tab onClick={() => handleTabClick('Share')} active={activeTab === 'Share'} color="#9d1fec">
              Share
            </Tab>
          </TabsContainer>
          <ContentContainer>
            {activeTab === 'Details' && (
              <>
                <Typography {...{ variant: 'body2' }}>
                  Provide essential information and specifications for the creative, such as the name, schedule, date,
                  and description.
                </Typography>
                <Label>Name</Label>
                <Input type="text" placeholder="Project Title" />
                <Label>Destination URL</Label>
                <Input type="text" placeholder="Insert Destination URL of Creative" />
                <Typography {...{ fontSize: '12px', Color: '#999' }}>
                  Has to be a functional URL (usually starts with https://)
                </Typography>
                <Label>Date Range</Label>
                <Input type="date" />
                <Input type="date" />
                <Label>Duration</Label>
                <Input type="number" placeholder="Duration in days" />
                <Label>Description (Optional)</Label>
                <TextArea placeholder="Creative Description" rows={4} />
                <ButtonContainer>
                  <Button onClick={handleContinue}>Continue</Button>
                </ButtonContainer>
              </>
            )}
            {activeTab === 'Upload Files' && (
              <>
                <Typography {...{ variant: 'body2' }}>Upload and attach the creative file.</Typography>
                <div
                  style={{
                    border: `1px dashed ${theme.palette.blacks.border}`,
                    padding: `${theme.gutters.base}px`,
                    marginBottom: `${theme.gutters.base * 2}px`,
                    position: 'relative',
                  }}
                >
                  <Typography {...{ textAlign: 'center' }}>Click to upload or drag and drop</Typography>
                  <Typography {...{ fontSize: '12px', Color: '#999', textAlign: 'center' }}>
                    Max file size is 500KB. Supported file types are .jpg and .png
                  </Typography>
                </div>
                <UploadedFileContainer>
                  <Typography {...{}}>
                    Uploaded File: <strong>Filename.jpg</strong>
                  </Typography>
                </UploadedFileContainer>
                <ButtonContainer>
                  <Button onClick={handleBack}>Back</Button>
                  <Button onClick={handleContinue}>Continue</Button>
                </ButtonContainer>
              </>
            )}
            {activeTab === 'Share' && (
              <>
                <Typography {...{ variant: 'body2' }}>Share this marketing creative with your affiliates.</Typography>
                <AffiliatesInputContainer>
                  <Input type="text" placeholder="🔍Add affiliates" />
                </AffiliatesInputContainer>
                <Typography {...{}}>Affiliates with access:</Typography>
                <ul>
                  {existingAffiliates.map((affiliate) => (
                    <AffiliateListItem key={affiliate.name} status={affiliate.status}>
                      {`${affiliate.name} - ${affiliate.status}`}
                    </AffiliateListItem>
                  ))}
                </ul>
                <ButtonContainer>
                  <Button onClick={handleBack}>Back</Button>
                  <Button onClick={handleFinish}>Finish</Button>
                </ButtonContainer>
              </>
            )}
          </ContentContainer>
        </PopupContainer>
      )}
      {successfulSubmit && (
        <PopupContainer>
          <ContentContainer>
            <Typography {...{ variant: 'body2' }}>Thanks for submitting 😊</Typography>
          </ContentContainer>
        </PopupContainer>
      )}
    </>
  );
};

export default MyPopUpComponent;
