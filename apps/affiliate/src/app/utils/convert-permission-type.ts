import { GetUIConfigItem } from '@cellxpert/api-types';
import { PermissionItem } from '../stores/PermissionsStore';

export function extractDataType(item: GetUIConfigItem): PermissionItem | null {
  if (item.type.toLowerCase() === 'boolean') {
    return {
      [item.name]:
        item.data === '1' || item.data.toLowerCase() === 'true'
          ? true
          : item.data === '0' || item.data.toLowerCase() === 'false'
          ? false
          : false,
    };
  } else if (item.type.toLowerCase() === 'string') {
    return {
      [item.name]: item.data,
    };
  } else if (item.type.toLowerCase() === 'json') {
    return {
      [item.name]: JSON.parse(item.data),
    };
  } else if (item.type.toLowerCase() === 'array') {
    return {
      [item.name]: item.data.split(','),
    };
  } else {
    return null;
  }
}
