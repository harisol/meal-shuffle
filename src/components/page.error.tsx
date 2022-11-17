import { useRouteError } from 'react-router-dom';

type ErrorType = { statusText: string; message: string };
export default function ErrorPage() {
  const error = useRouteError() as ErrorType;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
