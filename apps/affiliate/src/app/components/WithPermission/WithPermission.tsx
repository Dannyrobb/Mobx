import React from 'react';

import PermissionsStore from '../../stores/PermissionsStore';
import { useStore } from '../../stores/setupContext';

export interface WithPermissionProps {
  permission: keyof PermissionsStore;
}

export const WithPermission: React.FunctionComponent<WithPermissionProps> = ({ children, permission }) => {
  const { permissions } = useStore();

  return permissions[permission] ? <>{children}</> : null;
};

export default WithPermission;
