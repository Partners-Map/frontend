import { FunctionComponent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../__data__/services/auth';
import { RoutesList } from '../../routers';
import { LoginButtonS, LoginFormS, LoginInputWrapperS } from '../../styles/login-form';
import { AuthIcon } from '../auth-icon';
import { LoginInput } from '../login-input';

type TFormData = {
  email: string;
  password: string;
};

export const LoginForm: FunctionComponent = (): JSX.Element => {
  const [login, { error: loginError }] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TFormData>();

  const onSubmit: SubmitHandler<TFormData> = async (data: TFormData): Promise<void> => {
    const clearEmail = data.email.trim();
    const clearPassword = data.password.trim();

    if (clearEmail.length > 0 && clearPassword.length > 0) {
      await login({
        email: clearEmail,
        password: clearPassword
      })
        .unwrap()
        .then(() => {
          navigate(RoutesList.PlacesPage);
        });
    }
  };

  return (
    <LoginFormS onSubmit={handleSubmit(onSubmit)}>
      <AuthIcon />
      <LoginInputWrapperS>
        <LoginInput
          type='text'
          name={'email'}
          register={register}
          placeholder='Email'
          errorStatus={Boolean(errors.email) || Boolean(loginError)}
        />
        <LoginInput
          type='password'
          name={'password'}
          register={register}
          placeholder='Пароль'
          style={{
            marginTop: '2vh'
          }}
          errorStatus={Boolean(errors.password) || Boolean(loginError)}
        />
      </LoginInputWrapperS>
      <LoginButtonS type='submit'>Войти</LoginButtonS>
    </LoginFormS>
  );
};
