import { useQuery } from 'react-query';
import supabase from '../utils/supabase';
import { UpdateCustomerType } from './use-update-customer';
import db from '@framework/idb/utils/db';

export const getCustomer = async () => {
  const user = supabase.auth.user();
  return {
    id: user?.id,
    email: user?.email,
    ...(await db.getAllData({ table: 'customer' }))[0],
  };
};
export const useCustomerQuery = () => {
  return useQuery<UpdateCustomerType | null, Error>([], getCustomer);
};
