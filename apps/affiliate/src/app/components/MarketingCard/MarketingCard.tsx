import React from 'react';
import { Button, Dialog, Typography } from '@cellxpert/ui-lib';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import styled from '@emotion/styled';
import { flexStartCenter, theme } from '@cellxpert/theme';
import { Campaign } from '../MarketingCards/MarketingCards';
import { Merge } from 'type-fest';

const MarketingCardWrapper = styled('div')(() => ({
  backgroundColor: theme.palette.text.contrast,
  boxShadow: `0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14)`,
  marginTop: theme.gutters.base * 3,
  display: 'grid',
  // media queries
  gridTemplateColumns: '224px 1fr',
  gridTemplateRows: '176px',
}));

const ThumbnailImage = styled('img')<{ isThumbnailModal?: boolean }>(({ isThumbnailModal }) => ({
  display: 'inline-block',
  maxWidth: '100%',
  maxHeight: '100%',
  width: '100%',
  height: '100%',
  objectFit: 'scale-down',
  backgroundColor: theme.palette.additional.grey[200],
  ':hover': {
    backgroundColor: theme.palette.additional.grey[500],
    opacity: 0.5,
    cursor: 'zoom-in',
  },
}));

const MarketingCampaignContent = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: theme.gutters.base * 3,
  padding: `${theme.gutters.base * 2}px ${theme.gutters.base * 4}px ${theme.gutters.base * 3}px ${
    theme.gutters.base * 4
  }px`,
}));

const MarketingCampaignDetails = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}));

const CampaignDetails = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.gutters.base * 1,
}));

const CampaignDescriptionBreakdown = styled('span')(({}) => ({
  ...theme.typography.meta.body2,
  color: theme.palette.additional.grey[700],
  paddingBottom: theme.gutters.base * 1,
  ...flexStartCenter,
  marginTop: 'auto',
  // ...(isPrivate && {
  //   paddingBottom: theme.gutters.base * 0.5,
  //   gap: theme.gutters.base * 2,
  // }),
}));

const MarketingCopyAndMoreOptionsButtons = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingTop: theme.gutters.base * 2,
  'button:last-of-type': {
    marginTop: 'auto',
  },
}));

export interface MarketingCardProps {
  campaign: Campaign;
  breakdownKeys: string[];
  setModalData: (data: CampaignWithImage) => void;
  setSidePanelData: (data: Campaign) => void;
}

export type CampaignWithImage = Merge<Campaign, { ImageLink: string }>;

const brokenOrNullImageFallback = 'https://cx-admin-prod.cellxpert.com/assets/images/placeholder-thumb.jpg';

function extractBreakdownCampaignDetails(
  breakdownKeys: string[],
  item: {
    [x: string]: string | undefined | null;
    Content?: string | undefined;
    Creative?: string | undefined;
    medium?: string | undefined;
  }
) {
  return breakdownKeys
    .map((key) => item[key])
    .filter(Boolean)
    .join(' | ');
}

export const MarketingCard: React.FunctionComponent<MarketingCardProps> = ({
  campaign,
  breakdownKeys = ['Content', 'medium', 'Creative'],
  setModalData,
  setSidePanelData,
}) => {
  const campaignBreakdownDetails = extractBreakdownCampaignDetails(breakdownKeys, campaign);
  const isPrivate = false;
  return (
    <MarketingCardWrapper>
      <ThumbnailImage
        {...{
          src: campaign.ImageLink ?? brokenOrNullImageFallback,
          onError: (e) => {
            e.currentTarget.src = brokenOrNullImageFallback;
          },
          onClick: () => {
            setModalData({ ...campaign, ImageLink: campaign.ImageLink ?? brokenOrNullImageFallback });
          },
        }}
      />

      <MarketingCampaignContent>
        <MarketingCampaignDetails>
          <CampaignDetails>
            <Typography {...{ component: 'span', variant: 'body2', color: 'dark' }}>{campaign.Brand}</Typography>
            <Typography {...{ component: 'span', variant: 'h6', color: 'main', fontFamilyIndex: 0 }}>
              {campaign.Term}
            </Typography>
            <Typography {...{ component: 'span', variant: 'body2', color: 'helper' }}>
              {format(parseISO(campaign.Created), 'MM/dd/yyyy')}
            </Typography>
          </CampaignDetails>
          <CampaignDescriptionBreakdown {...{ isPrivate }}>
            {campaignBreakdownDetails}
            {/* Private still to be implemented */}
            {/* {isPrivate && (
                    <Tag
                      {...{
                        color: 'secondary1',
                        label: 'Private',
                        withIcon: true,
                        svgIcon: <LockedIcon {...{ color: 'secondary1', height: 16, width: 16 }} />,
                      }}
                    />
                  )} */}
          </CampaignDescriptionBreakdown>
        </MarketingCampaignDetails>
        <MarketingCopyAndMoreOptionsButtons>
          <Button
            {...{
              variant: 'secondary',
              label: 'Copy Click URL',
              onClick: () => navigator.clipboard.writeText(campaign.ClickURL),
            }}
          />
          <Button
            {...{
              variant: 'secondary',
              label: 'Copy Html Code',
              onClick: () => navigator.clipboard.writeText(campaign.PreviewHTML),
            }}
          />
          <Button
            {...{
              variant: 'ghostBlueText',
              label: 'More options',
              onClick: () => {
                setSidePanelData(campaign);
              },
            }}
          />
        </MarketingCopyAndMoreOptionsButtons>
      </MarketingCampaignContent>
    </MarketingCardWrapper>
  );
};

export default MarketingCard;
