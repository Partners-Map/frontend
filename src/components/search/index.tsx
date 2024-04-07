import { CSSProperties, FunctionComponent } from 'react';
import SearchIcon from '/public/icons/search.svg?react';
import { SearchButtonS, SearchContainerS, SearchInputS } from '../../styles/search';

type SearchProps = {
  style: CSSProperties;
};

export const Search: FunctionComponent<SearchProps> = ({ style }): JSX.Element => {
  return (
    <SearchContainerS style={style}>
      <SearchInputS type='text' placeholder='Название или описание...' />
      <SearchButtonS name='найти заведения'>
        <SearchIcon width='15' height='15' />
      </SearchButtonS>
    </SearchContainerS>
  );
};
