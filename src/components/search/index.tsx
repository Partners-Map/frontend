import { FunctionComponent } from 'react';
import SearchIcon from '/public/icons/search.svg?react';
import { SearchButtonS, SearchContainerS, SearchInputS } from '../../styles/search';

export const Search: FunctionComponent = (): JSX.Element => {
  return (
    <SearchContainerS>
      <SearchInputS type='text' placeholder='Название или описание...' />
      <SearchButtonS name='найти заведения'>
        <SearchIcon width='15' height='15' />
      </SearchButtonS>
    </SearchContainerS>
  );
};
