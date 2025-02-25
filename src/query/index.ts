import { IUser } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUser = () => {
  return useQuery<IUser>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get('/api/user');
      const data = response.data;
      return data;
    }
  });
};

const userGlobalQuery = {
  useUser
};

export default userGlobalQuery;
