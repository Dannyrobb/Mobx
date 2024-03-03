import * as React from 'react';
import { flexCenterStart, flexStartCenter, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import { SidePanel, Typography, Tag, Tabs, TabItem, Toggle, TooltipSmall, Tooltip } from '@cellxpert/ui-lib';
import { LockedIcon, CopyTextIcon, DownloadIcon } from '@cellxpert/icons';
import downloadTxtToFile from '../../utils/download-code-as-text';

export interface MarketingSidePanelProps {
  brand?: string;
  term?: string;
  onClose?: (e: React.MouseEvent) => void;
  campaignBreakdownDetails?: string;
  isPrivate?: boolean;
  clickUrl?: string;
  previewHtml?: string;
  activeMarketingcampaignTabId?: TabKey;
  content?: string;
  medium?: string;
  creative?: string;
  id?: string | null | undefined;
}

const SidePanelMenu = styled('div')(() => ({
  paddingTop: theme.gutters.base * 4.75,
}));

const MarketingCampaignDetails = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: theme.gutters.base * 2,
}));

const CampaignDetails = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.gutters.base * 1,
}));

const CampaignDescriptionBreakdown = styled('span')(() => ({
  ...theme.typography.meta.body2,
  color: theme.palette.additional.grey[700],
  padding: `${theme.gutters.base * 2}px 0px ${theme.gutters.base * 2.5}px 0px`,
  ...flexStartCenter,
  marginTop: 'auto',
}));

const ClickUrlHtmlCodeWrapper = styled('div')<Pick<MarketingSidePanelProps, 'previewHtml'>>(({ previewHtml }) => ({
  display: 'flex',
  backgroundColor: theme.palette.additional.grey[100],
  height: previewHtml ? 'min-content' : '33vh',
  padding: `11px 8px 11px 16px`,
}));

const ClickUrlHtmlCodeText = styled('div')(() => ({
  ...flexCenterStart,
  ...theme.typography.meta.body2,
  color: theme.palette.text.main,
  wordWrap: 'break-word',
  overflowWrap: 'anywhere',
}));

const CopyIconWrapper = styled('div')(() => ({
  height: 'min-content',
  display: 'flex',
  margin: 8,
  cursor: 'pointer',
  flexDirection: 'row-reverse',
}));

const ShortenUrlWrapper = styled('div')(() => ({
  display: 'flex',
  paddingTop: theme.gutters.base,
  'span:first-of-type': {
    paddingRight: theme.gutters.base,
  },
}));

const CopiedTooltipWrapper = styled('div')(({}) => ({
  paddingBottom: 10,
}));

const CopiedTooltip = styled('div')(() => ({
  ...theme.typography.meta.body2,
  backgroundColor: theme.palette.text.main,
  color: theme.palette.text.contrast,
  padding: `4px ${theme.gutters.base * 2}px`,
  ':after': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 0,
    borderWidth: '5',
    borderStyle: 'solid',
    borderColor: `${theme.palette.text.main} transparent transparent transparent`,
    top: 24,
    left: 37,
  },
}));

type TabKey = 'url' | 'html';

export const MarketingSidePanel: React.FC<MarketingSidePanelProps> = ({
  brand,
  onClose,
  isPrivate,
  term,
  clickUrl,
  previewHtml,
  activeMarketingcampaignTabId,
  content,
  medium,
  creative,
  id,
}) => {
  const campaignBreakdownDetails = [content, medium, creative]
    .map((item) => item)
    .filter(Boolean)
    .join(' | ');

  const uniqueHtmlFilenameForDownloadCampaign = [brand, content, creative, term, medium, id]
    .join('_')
    .replaceAll(' ', '-');

  const [isShortenUrl, setShortenUrl] = React.useState<boolean>(false);
  const shortenUrl = 'shorten URL Goes Here';
  const urlHtmlCodeTabArray: Array<TabItem> = [
    {
      label: 'Click URL',
      id: 'url',
    },
    {
      label: 'Html code',
      id: 'html',
    },
  ];
  const [activeTabId, setActiveTabId] = React.useState<TabItem['id']>(urlHtmlCodeTabArray[0].id);
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopyClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };
  return (
    <SidePanel
      {...{
        onClose,
        whichSide: 'right',
        children: (
          <SidePanelMenu>
            <MarketingCampaignDetails {...{ isPrivate }}>
              <CampaignDetails>
                <Typography {...{ component: 'span', variant: 'body2', color: 'dark' }}>{brand}</Typography>
                <Typography {...{ component: 'span', variant: 'h6', color: 'main', fontFamilyIndex: 0 }}>
                  {term}
                </Typography>
              </CampaignDetails>
              {/* Private still to be implemented */}
              {isPrivate && (
                <Tag
                  {...{
                    color: 'secondary1',
                    label: 'Private',
                    withIcon: true,
                    svgIcon: <LockedIcon {...{ color: 'secondary1', height: 16, width: 16 }} />,
                  }}
                />
              )}
              <CampaignDescriptionBreakdown>{campaignBreakdownDetails}</CampaignDescriptionBreakdown>
            </MarketingCampaignDetails>
            <Tabs
              {...{
                tabs: urlHtmlCodeTabArray,
                position: 'center',
                activeTabId: activeMarketingcampaignTabId,
                onChange: (tab) => setActiveTabId(tab),
              }}
            />
            {activeTabId === 'url' ? (
              <>
                <ClickUrlHtmlCodeWrapper>
                  <ClickUrlHtmlCodeText>{isShortenUrl ? shortenUrl : clickUrl}</ClickUrlHtmlCodeText>
                  <Tooltip
                    {...{
                      placement: 'top',
                      isOpen: isCopied,
                      toggleFunc: () => {
                        handleCopyClick();
                      },
                      button: (
                        <CopyIconWrapper>
                          <CopyTextIcon
                            {...{
                              height: 16,
                              width: 16,
                              color: 'main',
                              onClick: () => navigator.clipboard.writeText(clickUrl || ''),
                            }}
                          />
                        </CopyIconWrapper>
                      ),
                    }}
                  >
                    <CopiedTooltipWrapper>
                      <CopiedTooltip>Copied!</CopiedTooltip>
                    </CopiedTooltipWrapper>
                  </Tooltip>
                </ClickUrlHtmlCodeWrapper>
                <ShortenUrlWrapper>
                  <Typography {...{ component: 'span', variant: 'caption', color: 'dark' }}>Shorten URL</Typography>
                  <Toggle
                    {...{ variant: 'small', onClick: () => setShortenUrl(!isShortenUrl), checked: isShortenUrl }}
                  />
                  <Typography {...{ component: 'span', variant: 'buttonRegular', color: 'main' }}>
                    {isShortenUrl ? 'On' : 'Off'}
                  </Typography>
                </ShortenUrlWrapper>
              </>
            ) : (
              <ClickUrlHtmlCodeWrapper {...{ previewHtml }}>
                <ClickUrlHtmlCodeText>{previewHtml}</ClickUrlHtmlCodeText>
                <CopyIconWrapper>
                  <DownloadIcon
                    {...{
                      height: 16,
                      width: 16,
                      color: 'main',
                      onClick: () => downloadTxtToFile(previewHtml, uniqueHtmlFilenameForDownloadCampaign),
                    }}
                  />
                </CopyIconWrapper>
                <Tooltip
                  {...{
                    placement: 'top',
                    isOpen: isCopied,
                    toggleFunc: () => {
                      handleCopyClick();
                    },
                    button: (
                      <CopyIconWrapper>
                        <CopyTextIcon
                          {...{
                            height: 16,
                            width: 16,
                            color: 'main',
                            onClick: () => navigator.clipboard.writeText(previewHtml || ''),
                          }}
                        />
                      </CopyIconWrapper>
                    ),
                  }}
                >
                  <CopiedTooltipWrapper>
                    <CopiedTooltip>Copied!</CopiedTooltip>
                  </CopiedTooltipWrapper>
                </Tooltip>
              </ClickUrlHtmlCodeWrapper>
            )}
          </SidePanelMenu>
        ),
      }}
    />
  );
};
