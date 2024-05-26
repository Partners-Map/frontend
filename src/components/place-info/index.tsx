import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { TPlaceWithFullInfo } from '../../@types/models/place';
import { useGetPlaceByIdWithCategoryQuery } from '../../__data__/services/place';
import { PlaceInfoContainer, PlaceInfoExtraContainer } from '../../styles/place-info';

type PlaceInfoProps = {
  data: TPlaceWithFullInfo;
};

export const PlaceInfo: FunctionComponent<PlaceInfoProps> = ({ data }): JSX.Element => {
  const { data: placeWithCategories } = useGetPlaceByIdWithCategoryQuery(data.id!);

  return (
    <>
      {placeWithCategories ? (
        <PlaceInfoContainer>
          <Typography variant='h3'>{data.title}</Typography>
          <Box
            sx={{
              margin: '2vh 0 0 0'
            }}
          >
            <Typography variant='body2'>{placeWithCategories[0].category.title}</Typography>
            <PlaceInfoExtraContainer>
              <Typography variant='body2'>
                {data.openingTime !== ''
                  ? `Время работы: ${data.openingTime} - ${data.closingTime}`
                  : ''}
              </Typography>
              <Typography variant='body2'>{`Ср. чек: ${data.minAvgPrice?.symbol} ${data.maxAvgPrice ? `- ${data.maxAvgPrice?.symbol}` : ''}`}</Typography>
            </PlaceInfoExtraContainer>
          </Box>

          {data.description && (
            <>
              <Typography variant='subtitle1'>Описание</Typography>
              <Typography variant='body1'>{data.description}</Typography>
            </>
          )}
          <Typography variant='subtitle1'>Условия получения</Typography>
          <ol style={{ margin: '1vh 0 0 4vw' }}>
            {data.discount.conditions.map(condition => (
              <li>
                <Typography variant='body1'>{condition}</Typography>
              </li>
            ))}
          </ol>
          <Typography variant='body2' style={{ margin: '2vh 0 0 0' }}>
            {data.discount.information}
          </Typography>
        </PlaceInfoContainer>
      ) : (
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
          }}
        >
          <CircularProgress disableShrink size={120} />
        </Container>
      )}
    </>
  );
};
