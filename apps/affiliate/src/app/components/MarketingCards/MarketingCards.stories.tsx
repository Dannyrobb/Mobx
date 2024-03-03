import { Story, Meta } from '@storybook/react';

import { MarketingCards, MarketingCardProps } from './MarketingCards';

export default {
  title: 'Marketing Tools / MarketingCards',
  component: MarketingCards,
  argTypes: {},
} as Meta;

const Template: Story<MarketingCardProps> = (args) => (
  <>
    <MarketingCards {...args} />
  </>
);

export const base = Template.bind({});
export const dummyResponse = Template.bind({});
base.args = {};
dummyResponse.args = {
  campaigns: [
    {
      Brand: 'AffiliatesRandom',
      ClickURL: 'https://dev.cellxpert.com/visit/?bta=35482&nci=6025&campaign=666666&[LinkAdditions]',
      Content: 'English',
      Created: '2021-12-28T08:49:14.653Z',
      Creative: '250x250',
      ImageLink:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*', // image just for testing
      PreviewHTML:
        '<canvas id="qr-code"></canvas>\n            <script src="https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js"></script>\n            <script>\n            var qr;\n            (function() {\n            qr = new QRious({\n            element: document.getElementById("qr-code"),\n            size: 250,\n            value: "https://dev.cellxpert.com/visit/?bta=35482&nci=17378&campaign=666666&[LinkAdditions]"\n            });\n            })();            \n            </script>',
      Term: 'test',
      id: '17378',
      medium: 'QR Code',
    },
    {
      Brand: '24Bulls',
      ClickURL: 'https://dev.cellxpert.com/visit/?bta=35482&nci=6025&campaign=666666&[LinkAdditions]',
      Content: 'Spanish',
      Created: '2014-12-10T11:38:01.930Z',
      Creative: '728x90',
      ImageLink: 'http://6partners.ck-cdn.com/banners/2014-12-10/038economic-events-728x90-sp.jpg',
      PreviewHTML:
        '<a href="https://dev.cellxpert.com/visit/?bta=35482&nci=6025&campaign=666666&[LinkAdditions]" Target="_Top"><img border="0" src="http://6partners.ck-cdn.com/banners/2014-12-10/038economic-events-728x90-sp.jpg"  width="728" height="90"></a>\r\n',
      Term: 'economic events_SP',
      id: '6025',
      medium: 'GIF/JPEG',
    },
    {
      Brand: '24bulls',
      ClickURL: 'https://dev.cellxpert.com/visit/?bta=35482&nci=7121&campaign=666666&[LinkAdditions]',
      Content: 'English',
      Created: '2019-08-05T07:12:02.307Z',
      Creative: '1200x1600',
      ImageLink: 'https://blog.publer.io/wp-content/uploads/2020/07/twitter.png',
      PreviewHTML:
        '<a href="https://dev.cellxpert.com/visit/?bta=35482&nci=7121&campaign=666666&[LinkAdditions]" target="_blank"><iframe frameborder="0" src="null&clickTag=https%3A%2F%2Fdev.cellxpert.com%2Fvisit%2F%3Fbta%3D35482%26nci%3D7121%26campaign%3D666666%26%5BLinkAdditions%5D"  width="1200" height="1600"></iframe></a>',
      Term: 'test',
      id: '7121',
      medium: 'html5',
    },
    {
      Brand: '24bulls',
      ClickURL: 'https://dev.cellxpert.com/visit/?bta=95874&nci=7121&campaign=666666&[LinkAdditions]',
      Content: 'English',
      Created: '2019-08-05T07:12:02.307Z',
      Creative: '1200x1600',
      // ImageLink: 'https://miro.medium.com/max/700/0*wcj4W_Q0LcJKMZjo',
      ImageLink: null,
      PreviewHTML:
        '<a href="https://dev.cellxpert.com/visit/?bta=35482&nci=7121&campaign=666666&[LinkAdditions]" target="_blank"><iframe frameborder="0" src="null&clickTag=https%3A%2F%2Fdev.cellxpert.com%2Fvisit%2F%3Fbta%3D35482%26nci%3D7121%26campaign%3D666666%26%5BLinkAdditions%5D"  width="1200" height="1600"></iframe></a>',
      Term: 'testing',
      id: '7121',
      medium: 'html5',
    },
  ],
  isPrivate: true,
};
