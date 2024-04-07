import { FunctionComponent } from 'react';
import { TCategory } from '../../@types/models/category';
import { CategoryCloudContainerS, TagS } from '../../styles/tag-cloud';

type CategoryCloudPrps = {
  categories: TCategory[];
};

export const CategoryCloud: FunctionComponent<CategoryCloudPrps> = ({
  categories
}): JSX.Element => {
  return (
    <CategoryCloudContainerS>
      {categories.map((category: TCategory) => (
        <TagS key={category.id} onClick={() => console.log(`Clicked on ${category.title}`)}>
          {category.title}
        </TagS>
      ))}
    </CategoryCloudContainerS>
  );
};
