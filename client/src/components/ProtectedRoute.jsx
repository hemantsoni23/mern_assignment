import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookies?.get('accessToken');
  return token ? children : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;
