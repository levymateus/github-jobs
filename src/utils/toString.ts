/* eslint-disable import/prefer-default-export */
export const toString = (bool: boolean): 'true' | 'false' => (Boolean(bool).toString() as 'true' | 'false');
