import { createBrowserRouter } from 'react-router-dom';
import ComplexForm from './components/ComplexForm';
import ErrorPage from './components/page.error';
import MealShuffle from './components/page.meal-shuffle';
import Playground from './components/page.playground';
import Photos from './components/Photos';

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
            <p>I'm page 1</p>
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
            <p>I'm page 2</p>
            <div>
              <Photos />
            </div>
          </>
        )
      }
    ]
  }
]);
