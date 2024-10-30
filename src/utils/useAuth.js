import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp < currentTime) {
          // Token has expired
          localStorage.removeItem('token');
          navigate('/login'); // Redirect to login
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        navigate('/login'); // Redirect if token is invalid
      }
    } else {
      navigate('/login'); // Redirect if no token is found
    }
  }, [navigate]);
};

export default useAuth;
