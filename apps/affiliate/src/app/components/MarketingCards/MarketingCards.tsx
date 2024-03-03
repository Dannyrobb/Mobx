import * as React from 'react';
import MarketingCard, { CampaignWithImage } from '../MarketingCard/MarketingCard';
import { Dialog } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { theme } from '@cellxpert/theme';
import { MarketingSidePanel } from '../MarketingSidePanel/MarketingSidePanel';

export type Campaign = {
  Brand: string;
  ClickURL: string;
  Content?: string;
  Created: string;
  Creative?: string;
  Term: string;
  medium?: string;
  ImageLink?: string | null;
  PreviewHTML: string;
  id?: string | null;
};

export interface MarketingCardProps {
  campaigns?: Array<Campaign>;
  isPrivate?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onClose?: (e: React.MouseEvent) => void;
  breakdownKeys: string[];
  cardImageKey: string[];
}

const MarketingModalWrapper = styled('div')(() => ({
  display: 'grid',
  gridTemplateRows: '449px',
  pointerEvents: 'none',
  objectFit: 'scale-down',
  padding: `0px 16px`,
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

export const MarketingCards: React.FC<MarketingCardProps> = ({
  isPrivate,
  campaigns,
  breakdownKeys = ['Content', 'medium', 'Creative'],
}) => {
  const [thumbnailModalData, setThumbnailModalData] = React.useState<CampaignWithImage | null>(null);
  const [sidePanelData, setSidePanelData] = React.useState<Campaign | null>(null);

  const campaignCards = React.useMemo(() => {
    return campaigns?.map((campaign, index) => {
      return (
        <MarketingCard
          campaign={campaign}
          breakdownKeys={breakdownKeys}
          setModalData={(modalData) => setThumbnailModalData(modalData)}
          setSidePanelData={(sidePanelData) => setSidePanelData(sidePanelData)}
        />
      );
    });
  }, [campaigns]);
  return (
    <>
      {sidePanelData && (
        <MarketingSidePanel
          {...{
            brand: sidePanelData.Brand,
            term: sidePanelData.Term,
            content: sidePanelData.Content,
            medium: sidePanelData.medium,
            creative: sidePanelData.Creative,
            isPrivate: isPrivate,
            clickUrl: sidePanelData.ClickURL,
            id: sidePanelData.id,
            previewHtml: sidePanelData.PreviewHTML,
            onClose: () => {
              setSidePanelData(null);
            },
          }}
        />
      )}
      {thumbnailModalData && (
        <Dialog
          {...{
            size: 'large',
            variant: 'passive',
            title: thumbnailModalData.Term,
            onConfirm: () => console.log('testing'),
            onClose: () => {
              setThumbnailModalData(null);
            },
            children: (
              <MarketingModalWrapper>
                <ThumbnailImage
                  {...{
                    src: thumbnailModalData.ImageLink,
                  }}
                />
              </MarketingModalWrapper>
            ),
          }}
        />
      )}

      {campaignCards}
    </>
  );
};

export default MarketingCards;
