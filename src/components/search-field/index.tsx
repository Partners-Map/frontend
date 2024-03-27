import { FunctionComponent } from 'react';
import { SearchFieldButtonS, SearchFieldContainerS, SearchFieldInputS } from '../../styles/header';
import SearchIcon from '/public/icons/search.svg?react';

export const SearchField: FunctionComponent = (): JSX.Element => {
  return (
    <SearchFieldContainerS>
      <SearchFieldInputS type='text' placeholder='Название или описание...' />
      <SearchFieldButtonS name='найти заведения'>
        <SearchIcon width='15' height='15' />
      </SearchFieldButtonS>
    </SearchFieldContainerS>
  );
};
