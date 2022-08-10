import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useMutation } from 'react-query';
import supabase from '../utils/supabase';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function logout() {
  const res = await supabase.auth.signOut();
  if (res.error) throw res.error.message;
  return {
    ok: true,
    message: 'Logout Successful!',
  };
}
export const useLogoutMutation = (params: {
  onError: ({ message }: { message: string }) => void;
}) => {
  const { unauthorize } = useUI();
  return useMutation(() => logout(), {
    onSuccess: () => {
      Cookies.remove('auth_token');
      unauthorize();
      Router.push('/');
    },
    onError: message => {
      console.error('logout error response:', message);
      // @ts-ignore
      params.onError({ message });
    },
  });
};
