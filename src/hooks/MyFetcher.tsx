import { useState } from 'react';

export default function useMyFetcher(): FetchState {
  const [status, setStatus] = useState('iddle');

  const load = (url: string) => {
    setStatus('loading');

    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status.toString());
        }
        return res.json();
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(`failed when open ${url}.\nerror: ${err.message || err}`);
      })
      .finally(() => {
        setStatus('iddle');
      });
  };

  return { status, load };
}

type FetchState = {
  status: string;
  load: (url: string) => Promise<unknown>;
};
