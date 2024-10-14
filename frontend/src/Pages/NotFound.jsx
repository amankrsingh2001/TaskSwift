import { Link, useRouteError } from 'react-router-dom';

const NotFound = () => {
    const error = useRouteError();
    console.error(error);

  return (
    <section className="flex p-5  items-center  justify-center h-dvh">
      {/** image container */}
      <div></div>

      <div className='border-2 p-2 rounded-md'>
        <h1 className='text-2xl'>Oops! Something went wrong.</h1>
        <p className='text-red-400'>Error: {error.message || "Unknown error"}</p>
        <p className='text-yellow-400'>Status: {error.status || "Unknown status"}</p>
        Go back to the 
        <button className="text-md ml-1 underline underline-offset-2 text-green-400" onClick={() => {
          window.history.back(); // go back 
        }}> Previous page </button>
      </div>
    </section>
  );
};

export default NotFound;
