import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      const role = Cookies.get('role');
      setRole(role);
    }
  }, []);

  const login = () => {
    const role = Cookies.get('role');
    setRole(role);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('role');
    Cookies.remove('name');
    Cookies.remove('email');
    setRole(null);
  };

  return (
    <UserContext.Provider value={{ role, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
