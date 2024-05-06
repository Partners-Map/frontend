import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useCreatePartnerMutation } from '../../__data__/services/partners';
import { setPartner } from '../../__data__/slices/new-place';
import { Button } from '../button';
import { Input } from '../input';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routers';

export const CreatePartner = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, getValues, watch, setValue } = useForm<{ partner: string }>();
  const [createPartner] = useCreatePartnerMutation();

  const handlerCreatePartner = (): void => {
    console.log(watch());

    const clearPartnerName = getValues('partner').trimStart().trimEnd();
    if (clearPartnerName.length < 1) {
      return;
    }
    createPartner({ name: clearPartnerName })
      .unwrap()
      .then(data => {
        dispatch(setPartner(data.id));
        navigate(RoutesList.NewPlace + 'CreatePlace');
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        margin: '2vh 0 0 0'
      }}
    >
      <Input
        type='text'
        title={'Название партнера'}
        placeholder='Название партнера...'
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
        onChange={value => {
          setValue('partner', value);
        }}
        value={getValues('partner')}
      />
      <Button
        title='Создать партнера'
        style={{
          margin: '2vh 0 0 0'
        }}
        onClick={handlerCreatePartner}
      />
    </div>
  );
};
