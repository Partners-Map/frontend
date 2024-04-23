import { FunctionComponent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TCategory } from '../../@types/models/category';
import { CategoryCloudContainerS, TagS } from '../../styles/tag-cloud';

type CategoryCloudPrps = {
  categories: TCategory[];
};

export const CategoryCloud: FunctionComponent<CategoryCloudPrps> = ({
  categories
}): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handlerSelectCategory = (category: TCategory): void => {
    const currentParams = Object.fromEntries(searchParams);
    currentParams.category = category.id;
    setSearchParams(currentParams);
    setSelectedCategory(category.id);
  };

  const handlerDeleteCategory = (): void => {
    const currentParams = Object.fromEntries(searchParams);
    delete currentParams.category;
    setSearchParams(currentParams);
    setSelectedCategory('');
  };

  const handlerSelect = (category: TCategory): void => {
    if (Object.fromEntries(searchParams).category) {
      handlerDeleteCategory();
    } else {
      handlerSelectCategory(category);
    }
  };

  return (
    <CategoryCloudContainerS>
      {categories.map((category: TCategory) => (
        <TagS
          key={category.id}
          onClick={() => handlerSelect(category)}
          selected={selectedCategory === category.id}
        >
          {category.title}
        </TagS>
      ))}
    </CategoryCloudContainerS>
  );
};
