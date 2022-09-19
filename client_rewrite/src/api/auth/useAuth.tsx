import { useContext } from 'react';
import { authContext } from './AuthProvider';

const useAuth = () => useContext(authContext);
export default useAuth;
