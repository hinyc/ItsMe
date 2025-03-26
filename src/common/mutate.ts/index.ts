import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateUserPayload } from '@/app/api/user/PUT';
import api from '../api';

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateUserPayload) => {
      const response = await api.put('/api/user', payload);

      if (!response.data) {
        throw new Error('사용자 정보 업데이트에 실패했습니다.');
      }

      console.log(response.data);
      return response.data;
    },
    onSuccess: () => {
      // 사용자 정보가 업데이트되면 캐시된 데이터를 무효화
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
};
