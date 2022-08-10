import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import supabase from '../utils/supabase';

export interface ForgetPasswordType {
  email: string;
}
async function forgetPassword(input: ForgetPasswordType) {
  let res = await supabase.auth.api.resetPasswordForEmail(input.email);
  if (res.error) throw res.error.message;
  return {
    input,
    ok: true,
    message: 'Forget password Successful!',
  };
}
export const useForgetPasswordMutation = (params: {
  onSuccess: (ev: { input: ForgetPasswordType }) => void;
  onError: (ev: { message: string }) => void;
}) => {
  return useMutation((input: ForgetPasswordType) => forgetPassword(input), {
    onSuccess: ev => {
      Cookies.remove('auth_token');
      params.onSuccess(ev);
    },
    onError: message => {
      console.error('forget password error response:', message);
      // @ts-ignore
      params.onError({ message });
    },
  });
};
