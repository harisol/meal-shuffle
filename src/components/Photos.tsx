import { useEffect, useState } from 'react';
import useMyFetcher from '../hooks/MyFetcher';

export default function Photos(props: PhotosProps) {
  const [photoData, setPhotoData] = useState<TImage[]>([]);
  const fetcher = useMyFetcher();

  useEffect(() => {
    fetcher.load(urlPhotos).then((resultData) => {
      if (!Array.isArray(resultData)) return;

      const listPhoto = (resultData as TImage[]).slice(0, props.limit);
      setPhotoData(listPhoto);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.limit]);

  if (fetcher.status === 'loading') {
    return <p>Loading..</p>;
  }

  return (
    <div>
      {photoData.map((row) => (
        <li key={row.id}>
          <img alt="thumbnail" src={row.thumbnailUrl} style={{ verticalAlign: 'middle' }} />{' '}
          {row.title}
        </li>
      ))}
    </div>
  );
}

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

type TImage = {
  id: number;
  title: string;
  thumbnailUrl: string;
};

type PhotosProps = {
  limit: number;
};
