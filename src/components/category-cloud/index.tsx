import { FunctionComponent } from 'react';
import { TCategory } from '../../@types/models/category';
import { useFilter } from '../../hooks/filter';
import { CategoryCloudContainerS, TagS } from '../../styles/tag-cloud';

type CategoryCloudPrps = {
  categories: TCategory[];
};

export const CategoryCloud: FunctionComponent<CategoryCloudPrps> = ({
  categories
}): JSX.Element => {
  const { selectFilter, deleteFilter, findFilterValue } = useFilter();

  const handlerSelect = (category: TCategory): void => {
    if (findFilterValue('category') === category.id) {
      deleteFilter('category');
    } else {
      selectFilter('category', category.id);
    }
  };

  return (
    <CategoryCloudContainerS>
      {categories.map((category: TCategory) => (
        <TagS
          key={category.id}
          onClick={() => handlerSelect(category)}
          selected={findFilterValue('category') === category.id}
        >
          {category.title}
        </TagS>
      ))}
    </CategoryCloudContainerS>
  );
};
