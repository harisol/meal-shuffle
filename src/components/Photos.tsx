import { useEffect, useState } from 'react';
import useMyFetcher from '../hooks/MyFetcher';

type TImage = {
  id: number;
  title: string;
  thumbnailUrl: string;
};

export default function Photos() {
  const [photoData, setPhotoData] = useState<TImage[]>([]);
  const fetcher = useMyFetcher();

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load(urlPhotos);
    }

    if (fetcher.data) {
      const listPhoto = (fetcher.data as TImage[]).slice(0, limitData);
      setPhotoData(listPhoto);
    }
  }, [fetcher]);

  if (fetcher.state === 'loading') {
    return <p>Loading..</p>;
  }

  return (
    <ul>
      {photoData.map((row) => (
        <li key={row.id}>
          <img alt="thumbnail" src={row.thumbnailUrl} /> {row.title}
        </li>
      ))}
    </ul>
  );
}

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';
const limitData = 5;
