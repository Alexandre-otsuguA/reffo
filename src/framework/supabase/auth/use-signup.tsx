import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import supabase from '../utils/supabase';

export interface SignUpInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function signUp(input: SignUpInputType) {
  const res = await supabase.auth.signUp(input);
  if (res.error) throw res.error.message;
  return {
    input,
    token: res.session?.access_token as string,
  };
}
export const useSignUpMutation = (params: {
  onSuccess: (ev: { input: SignUpInputType }) => void;
  onError: (ev: { message: string }) => void;
}) => {
  const { authorize } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
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
