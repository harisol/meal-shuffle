import { createBrowserRouter } from 'react-router-dom';
import ComplexForm from './components/ComplexForm';
import ErrorPage from './components/page.error';
import MealShuffle from './components/page.meal-shuffle';
import Playground from './components/page.playground';
import Photos from './components/Photos';
import Logos from './components/Logos';

export default createBrowserRouter([
  {
    path: '/',
    element: <MealShuffle />,
    errorElement: <ErrorPage /> // only works on '/' path
  },
  {
    path: 'playground',
    element: <Playground />,
    children: [
      {
        path: '',
        element: (
          <>
            <h4>Title of Page 1</h4>
            <div>
              <ComplexForm />
            </div>
          </>
        )
      },
      {
        path: '2',
        element: (
          <>
            <h4>Title of Page 2</h4>
            <div>
              <Photos limit={5} />
            </div>
          </>
        )
      },
      {
        path: '3',
        element: (
          <>
            <h4>Title of Page 3</h4>
            <div>
              <Logos />
            </div>
          </>
        )
      }
    ]
  }
]);
