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
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TFormData>();

  const onSubmit: SubmitHandler<TFormData> = async (data: TFormData): Promise<void> => {
    if (data.email.trim().length > 0 && data.password.trim().length > 0) {
      await login(data)
        .unwrap()
        .then(() => {
          navigate(RoutesList.DashboardPage);
        });
    }
  };

  return (
    <LoginFormS onSubmit={handleSubmit(onSubmit)}>
      <AuthIcon />
      <LoginInputWrapperS>
        <LoginInput type='text' name={'email'} register={register} placeholder='Email' />
        {errors.email && <p>Это поле обязательно</p>}
        <LoginInput
          type='password'
          name={'password'}
          register={register}
          placeholder='Пароль'
          style={{
            marginTop: '4vh'
          }}
        />
        {errors.password && <p>Это поле обязательно</p>}
      </LoginInputWrapperS>
      <LoginButtonS type='submit'>Отправить</LoginButtonS>
    </LoginFormS>
  );
};
