import { Link } from "react-router-dom";
import NotFoundImg from '../assets/404_NOT-FOUND.jpg'

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-indigo-900 p-4">
      {/* <img src={NotFoundImg} alt="img" className="w-full h-full object-cover"/> */}
      <div className="bg-white rounded-lg p-8 shadow-lg text-center">
        <h1 className="sm:text-9xl  text-6xl  font-bold text-indigo-500">404</h1>
        <p className="text-xl text-gray-700 mt-4">Looks like this page doesn’t exist!</p>
        <p className="text-md text-gray-500 mb-6">Go back to home and continue exploring.</p>
        <Link className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-all" onClick={() => {
          window.location = '/'; // go back 
        }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;