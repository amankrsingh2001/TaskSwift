import { useRouteError, Link } from 'react-router-dom';

const NotFound = () => {
    const error = useRouteError();
    console.error(error);

  return (
    <section className="grid grid-cols-2">
      {/** image container */}
      <div></div>

      <div>
        <h1>Oops! Something went wrong.</h1>
        <p>Error: {error.message || "Unknown error"}</p>
        <p>Status: {error.status || "Unknown status"}</p>
        <Link to="/user">Go back to the homepage</Link>
      </div>
    </section>
  );
};

export default NotFound;
