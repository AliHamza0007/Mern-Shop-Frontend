import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="contentBox">
        <h1>404</h1>
        <h2>Page not found</h2>

        <div>
          <Link to="/">Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
