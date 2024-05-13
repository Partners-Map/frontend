import { CSSProperties, FunctionComponent } from 'react';
import { TCategory } from '../../@types/models/category';
import { PlaceListContainerS } from '../../styles/place-list';
import { СategoryCard } from '../category-card';

type СategoriesListProps = {
  data: TCategory[];
  style?: CSSProperties;
  onClick: (id: string) => void;
};

export const СategoriesList: FunctionComponent<СategoriesListProps> = ({
  data,
  style,
  onClick
}): JSX.Element => {
  return (
    <PlaceListContainerS style={style}>
      {data.map(category => (
        <СategoryCard key={category.id} data={category} onClick={onClick} />
      ))}
    </PlaceListContainerS>
  );
};
