import { IAuth, IUser } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAuth = () => {
  return useQuery<IAuth>({
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await axios.get('/api/auth');
      const data = response.data;
      return data;
    }
  });
};

const useUser = () => {
  return useQuery<IUser>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get('/api/user');
      const data = response.data;
      return data;
    },
    retry: false
  });
};

const userGlobalQuery = {
  useAuth,
  useUser
};

export default userGlobalQuery;
