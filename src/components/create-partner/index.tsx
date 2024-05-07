import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useCreatePartnerMutation } from '../../__data__/services/partners';
import { setPartner as setNewPartner } from '../../__data__/slices/new-place';
import { Button } from '../button';
import { Input } from '../input';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesList } from '../../routers';
import { FunctionComponent } from 'react';
import { setPartner as setEditPartner } from '../../__data__/slices/edit-place';

type CreatePartnerProps = {
  isEditing?: boolean;
};

export const CreatePartner: FunctionComponent<CreatePartnerProps> = ({
  isEditing = false
}): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getValues, setValue } = useForm<{ partner: string }>();
  const [createPartner] = useCreatePartnerMutation();

  const handlerCreatePartner = (): void => {
    const clearPartnerName = getValues('partner').trimStart().trimEnd();

    if (clearPartnerName.length < 1) {
      return;
    }

    createPartner({ name: clearPartnerName })
      .unwrap()
      .then((data): void => {
        if (!isEditing) {
          dispatch(setNewPartner(data.id));
          navigate(RoutesList.NewPlace + 'CreatePlace');
          return;
        }
        dispatch(setEditPartner(data.id));
        navigate(RoutesList.EditPlace + id + '/CreatePlace');
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
