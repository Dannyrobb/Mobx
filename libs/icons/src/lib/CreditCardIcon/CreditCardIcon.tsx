import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface CreditCardIconProps extends SVGIconProps {}

export const CreditCardIcon: React.FunctionComponent<CreditCardIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="creditcardIcon" fill="none" width="32" height="32" />
      <rect x="6" y="20" width="10" height="2" />
      <path
        d="M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6Zm0,2v3H4V8ZM4,24V13H28V24Z"
        transform="translate(0 0)"
      />
    </SvgIcon>
  );
};
