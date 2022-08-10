import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm } from 'react-hook-form';
import {
  UpdateCustomerType,
  useUpdateCustomer,
} from '@framework/supabase/auth/use-update-customer';
import { useTranslation } from 'next-i18next';
import { useCustomerQuery } from '@framework/supabase/auth/use-customer';
import useToast from '@utils/use-toast';
import * as object from '@utils/object';

const AccountDetails: React.FC = () => {
  const { data: customer } = useCustomerQuery();
  const toast = useToast();
  const { mutate: updateCustomer, isLoading } = useUpdateCustomer({
    onSuccess: () => toast('OK!', { status: 'success' }),
    onError: ({ message }) => toast(message, { status: 'error' }),
  });
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCustomerType>();

  function onSubmit(input: UpdateCustomerType) {
    updateCustomer({
      ...object.map<UpdateCustomerType>(input, ([key, value]) => [
        key,
        value || (customer as any)[key],
      ]),
      id: customer?.id as string,
    });
  }
  return (
    <div className="w-full flex flex-col">
      <Heading variant="titleLarge" className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        {t('common:text-account-details-personal')}
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center"
        noValidate
      >
        <div className="pb-5 md:pb-6 lg:pb-8">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                label={t('forms:label-first-name')}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.firstName?.message}
                defaultValue={customer?.firstName}
                {...register('firstName', {
                  required: 'forms:first-name-required',
                })}
              />
              <Input
                label={t('forms:label-last-name')}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.lastName?.message}
                defaultValue={customer?.lastName}
                {...register('lastName', {
                  required: 'forms:last-name-required',
                })}
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                inputClassName="cursor-not-allowed"
                disabled
                type="email"
                label={t('forms:label-email-star')}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.email?.message}
                value={customer?.email}
                {...register('email', {
                  required: 'forms:email-required',
                  value: customer?.email,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'forms:email-error',
                  },
                })}
              />
              <Input
                type="tel"
                label={t('forms:label-phone')}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.phone?.message}
                defaultValue={customer?.phone}
                {...register('phone', {
                  pattern: {
                    value: /^\(?[0-9]{2}\)?\s?[0-9]{5}\-?[0-9]{4}$/,
                    message: 'forms:phone-error',
                  },
                })}
              />
            </div>
          </div>
        </div>
        <div className="relative flex sm:ms-auto mt-5 pb-2 lg:pb-0">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            variant="formButton"
            className="w-full sm:w-auto"
          >
            {t('common:button-save-changes')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
