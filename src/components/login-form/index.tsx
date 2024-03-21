import { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../__data__/services/auth';
import { LoginButtonS, LoginFormS, LoginInputWrapperS } from '../../styles/login-form';
import { AuthIcon } from '../auth-icon';
import { LoginInput } from '../login-input';

type TFormData = {
  email: string;
  password: string;
};

export const LoginForm: FunctionComponent = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TFormData>({
    email: '',
    password: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData(prevState => ({ ...prevState, [event.target.type]: event.target.value }));
  };

  const hendlerSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (formData.email.trim().length > 0 && formData.password.trim().length > 0) {
      await login(formData)
        .unwrap()
        .then(() => {
          navigate('/admin/dashboard');
        })
        .catch();
    }
  };

  return (
    <LoginFormS onSubmit={hendlerSubmit}>
      <AuthIcon />
      <LoginInputWrapperS>
        <LoginInput type='email' name='email' value={formData.email} onChange={handleChange} />
        <LoginInput
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          style={{
            marginTop: '4vh'
          }}
        />
      </LoginInputWrapperS>
      <LoginButtonS type='submit'>Отправить</LoginButtonS>
    </LoginFormS>
  );
};
