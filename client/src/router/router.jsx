import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import App from '../App.jsx'; 
import Home from '../components/Home.jsx';
import AdminPanel from '../pages/AdminPanel.jsx';
import UserDashboard from '../pages/UserDashboard.jsx';
import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Profile from '../components/Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <Login /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

export default router;
