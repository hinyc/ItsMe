import { IAuth, IUser } from '@/types';
import { useQuery } from '@tanstack/react-query';
import api from '../api';

const useAuth = () => {
  return useQuery<IAuth>({
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await api.get('/auth');
      const data = response.data;
      return data;
    },
    retry: false
  });
};

const useUser = () => {
  return useQuery<IUser>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get('/user');
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
