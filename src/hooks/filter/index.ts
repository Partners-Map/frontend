import { useSearchParams } from 'react-router-dom';

export type TuseFilter = {
  selectFilter: (param: string, value: string | number) => void;
  deleteFilter: (param: string) => void;
  findFilter: (param: string) => string;
};

export const useFilter = (): TuseFilter => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectFilter = (param: string, value: string | number): void => {
    const currentParams = Object.fromEntries(searchParams);
    currentParams[param] = value.toString();
    setSearchParams(currentParams);
  };

  const deleteFilter = (param: string): void => {
    const currentParams = Object.fromEntries(searchParams);
    delete currentParams[param];
    setSearchParams(currentParams);
  };

  const findFilter = (param: string): string => Object.fromEntries(searchParams)[param];

  return {
    selectFilter,
    deleteFilter,
    findFilter
  };
};
