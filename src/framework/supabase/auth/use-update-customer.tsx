import { useMutation } from 'react-query';
import db from '@framework/idb/utils/db';

export interface UpdateCustomerType {
  id: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
}
async function updateCustomer(input: UpdateCustomerType) {
  await db.writeData({ table: 'customer', content: input });
  return input;
}
export const useUpdateCustomer = (params: {
  onSuccess: (ev: UpdateCustomerType) => void;
  onError: (ev: { message: string }) => void;
}) => {
  return useMutation((input: UpdateCustomerType) => updateCustomer(input), {
    onSuccess: ev => {
      params.onSuccess(ev);
    },
    onError: message => {
      console.error('UpdateUser error response:', message);
      // @ts-ignore
      params.onError({ message });
    },
  });
};
