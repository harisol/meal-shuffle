/* eslint-disable import/prefer-default-export */
export const isValidHttpUrl = (param: string) => {
  let url: URL;

  try {
    url = new URL(param);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};
