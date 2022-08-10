import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import supabase from '../utils/supabase';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
export async function login(input: LoginInputType) {
  const res = await supabase.auth.signIn(input);
  if (res.error) throw res.error.message;
  return {
    input,
    token: res.session?.access_token as string,
  };
}
export const useLoginMutation = (params: {
  onSuccess: (ev: { input: LoginInputType }) => void;
  onError: (ev: { message: string }) => void;
}) => {
  const { authorize } = useUI();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: ev => {
      ev.input.remember_me && Cookies.set('auth_token', ev.token);
      authorize();
      params.onSuccess(ev);
    },
    onError: message => {
      console.error('login error response:', message);
      // @ts-ignore
      params.onError({ message });
    },
  });
};
