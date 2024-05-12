import { FunctionComponent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../__data__/services/auth';
import { RoutesList } from '../../routers';
import { LoginButtonS, LoginFormS, LoginInputWrapperS } from '../../styles/login-form';
import { AuthIcon } from '../auth-icon';
import { LoginInput } from '../login-input';
import { Button, FormControl, TextField, useFormControl } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type TFormData = {
  email: string;
  password: string;
};

export const LoginForm: FunctionComponent = (): JSX.Element => {
  const [login, { error: loginError }] = useLoginMutation();
  const navigate = useNavigate();
  const formData = useFormControl();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TFormData>();

  const onSubmit: SubmitHandler<TFormData> = async (data: TFormData): Promise<void> => {
    const clearEmail = data.email.trim();
    const clearPassword = data.password.trim();
    console.log(formData);

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
      <LockOutlinedIcon fontSize='large' />
      <LoginInputWrapperS>
        <TextField
          type='text'
          label='Email'
          {...register('email')}
          placeholder='Email'
          fullWidth
          size='small'
          error={Boolean(errors.email) || Boolean(loginError)}
        />
        <TextField
          type='password'
          label='Пароль'
          {...register('password')}
          placeholder='Пароль'
          fullWidth
          size='small'
          error={Boolean(errors.password) || Boolean(loginError)}
        />
      </LoginInputWrapperS>
      <Button
        type='submit'
        variant='contained'
        size='large'
        sx={{
          margin: '10% 0 0 0'
        }}
      >
        Войти
      </Button>
    </LoginFormS>
  );
};
