import { Button, FormControl, TextField } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCreatePartnerMutation } from '../../__data__/services/partners';
import { setPartner as setEditPartner } from '../../__data__/slices/edit-place';
import { setPartner as setNewPartner } from '../../__data__/slices/new-place';
import { PlaceSteps } from '../../configs/place';
import { RoutesList } from '../../routers';

export const CreatePartner: FunctionComponent = (): JSX.Element => {
  const { id } = useParams();
  const isEditing = useLocation().pathname.startsWith(RoutesList.EditPlace);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<string>('');
  const [createPartner] = useCreatePartnerMutation();

  const handlerCreatePartner = (): void => {
    const clearPartnerName = partner.trimStart().trimEnd();

    if (clearPartnerName.length < 1) {
      return;
    }

    createPartner({ name: clearPartnerName })
      .unwrap()
      .then((data): void => {
        if (!isEditing) {
          dispatch(setNewPartner(data.id));
          navigate(RoutesList.NewPlace + Object.keys(PlaceSteps)[2]);
          return;
        }
        dispatch(setEditPartner(data.id));
        navigate(`${RoutesList.EditPlace + id}/${Object.keys(PlaceSteps)[2]}`);
      });
  };

  return (
    <FormControl
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        margin: '2vh 0 0 0'
      }}
    >
      <TextField
        type='text'
        label={'Название партнера'}
        placeholder='Название партнера'
        fullWidth
        onChange={e => {
          setPartner(e.target.value as string);
        }}
        value={partner}
      />
      <Button
        variant='contained'
        onClick={handlerCreatePartner}
        sx={{
          margin: '2vh 0 0 0'
        }}
      >
        Создать партнера
      </Button>
    </FormControl>
  );
};
