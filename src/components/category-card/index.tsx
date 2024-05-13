import { ListItem, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TCategory } from '../../@types/models/category';
import { PlaceCardContainerS } from '../../styles/place-card';

type СategoryCardProps = {
  data: TCategory;
  onClick: (id: string) => void;
};

export const СategoryCard: FunctionComponent<СategoryCardProps> = ({
  data,
  onClick
}): JSX.Element => {
  const navigate = useNavigate();

  const handlerClickPlace = (): void => {
    // navigate(RoutesList.PlacePage);
  };

  return (
    <ListItem onClick={() => onClick(data.id)}>
      <PlaceCardContainerS onClick={handlerClickPlace}>
        <Typography variant='subtitle1' color='primary'>
          {data.title}
        </Typography>
      </PlaceCardContainerS>
    </ListItem>
  );
};
