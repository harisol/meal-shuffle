import { useEffect, useState } from 'react';

export default function useMyFetcher(): FetchState {
  const [x, setX] = useState(initialState);
  useEffect(() => {
    if (x.state !== 'loading') {
      return;
    }

    fetch(x.url)
      .then((res) => res.json())
      .then((data) => {
        setX((v) => {
          return { ...v, data };
        });
      })
      .finally(() => {
        setX((v) => {
          return { ...v, state: 'iddle' };
        });
      });
  }, [x]);

  const load = (url: string) => {
    setX((v) => {
      return { ...v, state: 'loading', url };
    });
  };

  return { ...x, load };
}

const initialState = {
  state: 'idle',
  data: null,
  url: ''
};

type FetchState = {
  state: string;
  data: unknown;
  load: (url: string) => void;
};
