import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import Logo from '@components/ui/logo';
import { useForm } from 'react-hook-form';
import { useForgetPasswordMutation } from '@framework/supabase/auth/use-forget-password';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import useToast from '@utils/use-toast';

type FormValues = {
  email: string;
};

const ForgetPasswordForm = () => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const toast = useToast();
  const { mutate: forgetPassword, isLoading } = useForgetPasswordMutation({
    onSuccess: handleSignIn,
    onError: ({ message }) => toast(message, { status: 'error' }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  });

  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }

  const onSubmit = ({ email }: FormValues) => {
    forgetPassword({ email });
  };

  return (
    <div className="py-6 px-5 sm:p-8 bg-skin-fill mx-auto rounded-lg w-full sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center pt-2.5 mb-8 sm:mb-10">
        <div onClick={closeModal}>
          <Logo />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(data => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          label={t('forms:label-email')}
          type="email"
          variant="solid"
          className="mb-4"
          {...register('email', {
            required: `${t('forms:email-required')}`,
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t('forms:email-error'),
            },
          })}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          variant="formButton"
          className="h-11 md:h-12 w-full mt-0"
        >
          {t('common:text-reset-password')}
        </Button>
      </form>
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-10 mb-6 sm:mb-7">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-skin-fill">
          {t('common:text-or')}
        </span>
      </div>
      <div className="text-sm sm:text-15px text-skin-muted text-center">
        {t('common:text-back-to')}{' '}
        <button
          type="button"
          className="text-skin-base underline font-medium hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          {t('common:text-login')}
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
